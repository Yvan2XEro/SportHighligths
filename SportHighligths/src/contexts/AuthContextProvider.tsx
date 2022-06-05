import {View, Text} from 'react-native';
import * as React from 'react';

export const AuthContext = React.createContext({
  isLoggedIn: false,
  user: null as any,
});
const AuthContextProvider = ({childen}: any) => {
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: true,
        user: {
          id: 1,
          name: 'John Doe',
          email: 'j',
        },
      }}>
      {childen}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
