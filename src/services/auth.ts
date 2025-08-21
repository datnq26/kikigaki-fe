import { http } from '@/services/http'
import { AUTH_API } from '@/constants/api'
import { AxiosResponse } from 'axios'
import {
    LoginRequest,
    LoginResponse,
    LogoutResponse,
    RefreshTokenResponse,
    RegisterRequest,
    RegisterResponse,
    VerifyTokenRequest,
} from '@/interfaces/auth'
import { UserResponse } from '@/interfaces/user'

class AuthService {
    async login(payload: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
        return await http.post(AUTH_API.LOGIN, payload)
    }

    async register(
        payload: RegisterRequest
    ): Promise<AxiosResponse<RegisterResponse>> {
        return await http.post(AUTH_API.REGISTER, payload)
    }

    async logout(): Promise<AxiosResponse<LogoutResponse>> {
        return await http.post(AUTH_API.LOGOUT)
    }

    async refreshToken(): Promise<AxiosResponse<RefreshTokenResponse>> {
        return await http.post(AUTH_API.REFRESH_TOKEN)
    }

    async verifyToken(
        payload: VerifyTokenRequest
    ): Promise<AxiosResponse<any>> {
        return await http.post(AUTH_API.VERIFY_TOKEN, payload)
    }

    async getCurrentUser(): Promise<AxiosResponse<UserResponse>> {
        return await http.get(AUTH_API.ME)
    }
}

export default new AuthService()
