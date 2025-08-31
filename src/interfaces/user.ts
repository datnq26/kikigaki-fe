export interface UserResponse {
    username: string
    name: string
    email: string
    last_login: string
    is_active: boolean
    is_staff: boolean
}

export interface UpdateAccountRequest {
    username: string
    first_name: string
    last_name: string
}