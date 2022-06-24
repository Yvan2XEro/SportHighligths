import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as React from 'react';
import {
  setAuthTokens,
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  applyAuthTokenInterceptor,
} from 'react-native-axios-jwt';
import {BASE_URL, http} from '../services';
import {RegisterUser} from '../types';
import SplashScreen from 'react-native-splash-screen';

export const AuthContext = React.createContext({
  isLoggedIn: false,
  user: null as any,
  login: async (email: string, password: string) => new Promise(() => {}),
  register: async (data: RegisterUser) => new Promise(() => {}),
  logout: async () => {},
  getAccessToken,
  refreshing: false,
  getRefreshToken,
  setUser: (u: any) => {},
});
const AuthContextProvider = ({children}: any) => {
  const [user, setUser] = React.useState(null as any);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(true);

  const login = React.useCallback(async (email: string, password: string) => {
    const response = axios.post(`${BASE_URL}/auth/login`, {email, password});
    const {tokens} = (await response).data;
    if ((await response).status === 200) {
      await setAuthTokens({
        accessToken: tokens.access,
        refreshToken: tokens.refresh,
      });
      setIsLoggedIn(true);
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  }, []);

  const logout = React.useCallback(async () => {
    await clearAuthTokens();
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  const refresh = React.useCallback(async (refreshToken: string) => {
    console.log('refresh');
    try {
      const response = await axios.post(`${BASE_URL}/auth/refresh`, {
        refresh: refreshToken,
      });
      if (response.status === 200) {
        setIsLoggedIn(true);
        return response.data.access;
      } else {
        logout();
      }
    } catch (error: any) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      )
        await logout();
      console.warn(error);
    } finally {
      SplashScreen.hide();
    }
  }, []);

  const register = React.useCallback(async (data: RegisterUser) => {
    const response = axios.post(`${BASE_URL}/auth/register`, data);
    if ((await response).status === 201 || (await response).status === 200) {
      await login(data.email, data.password);
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  }, []);

  const fetchUser = React.useCallback(async () => {
    console.log('get user');
    const response = await http.get(`${BASE_URL}/auth/me`);
    if (response.status === 200) {
      setUser(response.data);
    } else {
      logout();
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    (async () => {
      const refreshToken = await getRefreshToken();
      if (refreshToken) {
        setRefreshing(true);
        await refresh(refreshToken);
        setRefreshing(false);
      } else {
        SplashScreen.hide();
      }
    })();
  }, []);

  React.useEffect(() => {
    applyAuthTokenInterceptor(http, {requestRefresh: refresh});
    (async () => {
      const accessToken = await getAccessToken();
      const refreshToken = await getRefreshToken();
      if (accessToken && refreshToken) {
        const {exp} = jwtDecode<{exp: number}>(accessToken);
        if (exp * 1000 > Date.now()) setIsLoggedIn(true);
        else {
          const {exp} = jwtDecode<{exp: number}>(refreshToken);
          if (exp * 1000 > Date.now()) {
            refresh(refreshToken);
          } else {
            logout();
          }
        }
      } else setIsLoggedIn(false);
    })();
  }, []);

  React.useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn === true) {
      fetchUser();
    } else {
      if (!refreshing) logout();
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        user,
        refreshing,
        isLoggedIn,
        login,
        logout,
        setUser,
        register,
        getAccessToken,
        getRefreshToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
