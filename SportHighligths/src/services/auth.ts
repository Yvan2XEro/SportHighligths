import { TokenRefreshRequest, applyAuthTokenInterceptor } from 'react-native-axios-jwt'
import axios from 'axios'

// export const BASE_URL = 'http://127.0.0.1:8000'
export const BASE_URL = 'http://192.168.121.70:8000'

// 1. Create an axios instance that you wish to apply the interceptor to
export const http = axios.create({ baseURL: BASE_URL })

// 2. Define token refresh function.
const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<string> => {

    // Important! Do NOT use the axios instance that you supplied to applyAuthTokenInterceptor
    // because this will result in an infinite loop when trying to refresh the token.
    // Use the global axios client or a different instance
    const response = await axios.post(`${BASE_URL}/auth/refresh`, { token: refreshToken })

    return response.data.access
}

// 3. Add interceptor to your axios instance
applyAuthTokenInterceptor(http, { requestRefresh })