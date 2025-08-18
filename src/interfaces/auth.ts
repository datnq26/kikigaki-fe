// Login API
export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    message: string
    refresh_token: string
    access_token: string
}

// Register API
export interface RegisterRequest {
    email: string
    password: string
}

export interface RegisterResponse {
    message: string
    refresh_token: string
    access_token: string
}

// Logout API
export interface LogoutResponse {
    message: string
}

// Refresh Token API
export interface RefreshTokenResponse {
    access: string
}

// Verify Token API
export interface VerifyTokenRequest {
    token: string
}
