export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    message: string
    refresh_token: string
    access_token: string
}
