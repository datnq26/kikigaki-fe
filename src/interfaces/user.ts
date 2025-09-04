export interface UserResponse {
    username: string
    first_name: string
    last_name: string
    name: string
    email: string
    access_level: string
    avatar: string
    last_login: string
    is_active: boolean
    is_staff: boolean
}

export interface UpdateAccountRequest {
    username: string
    first_name: string
    last_name: string
}

export interface UpdateAccountResponse {
    username: string
    first_name: string
    last_name: string
}

export interface UpdateAvatarRequest {
    avatar?: File
}

export interface UpdateAvatarResponse {
    avatar: string
}
