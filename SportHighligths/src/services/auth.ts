import { TokenRefreshRequest, applyAuthTokenInterceptor } from 'react-native-axios-jwt'
import axios from 'axios'

export const BASE_URL = 'https://sporthighlighs-api.herokuapp.com'
//export const BASE_URL = 'http://192.168.52.69:8000'

export const http = axios.create({ baseURL: BASE_URL })

const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<string> => {
    // Important! Do NOT use the axios instance that you supplied to applyAuthTokenInterceptor
    // because this will result in an infinite loop when trying to refresh the token.
    // Use the global axios client or a different instance
    const response = await axios.post(`${BASE_URL}/auth/refresh`, { token: refreshToken })
    return response.data.access
}

applyAuthTokenInterceptor(http, { requestRefresh })
