import { http } from '@/services/http'
import { AUTH_API } from '@/constants/api'
import { AxiosResponse } from 'axios'
import { LoginRequest, LoginResponse } from '@/interfaces/auth'

class AuthService {
    async login(payload: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
        return await http.post(AUTH_API.LOGIN, payload)
    }

    async register(payload: any): Promise<AxiosResponse<LoginResponse>> {
        return await http.post(AUTH_API.REGISTER, payload)
    }

    async logout(): Promise<AxiosResponse<LoginResponse>> {
        return await http.post(AUTH_API.LOGOUT)
    }
}

export default new AuthService()
