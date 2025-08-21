// Login API
export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    message: string
    refresh: string
    access: string
}

// Register API
export interface RegisterRequest {
    email: string
    password: string
    confirm_password: string
}

export interface RegisterResponse {
    message: string
    refresh: string
    access: string
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
