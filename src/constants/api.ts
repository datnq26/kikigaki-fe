export const AUTH_API = {
    LOGIN: '/login',
    LOGOUT: '/logout',
    REGISTER: '/register',
    REFRESH_TOKEN: '/token/refresh',
    VERIFY_TOKEN: '/token/verify',
}

export const USER_API = {
    GET_CURRENT_USER: '/user/me',
    ALL_USERS: '/user',
    LIST_USERS: (page: any) => `/user?page=${page}`,
    EDIT_USER: (userId: any) => `/user/${userId}`,
    DELETE_USER: (userId: any) => `/user/${userId}`,
    CREATE_USER: '/user',
    USER_BY_ID: (userId: any) => `/user/${userId}`,
    CHANGE_PASSWORD: (userId: any) => `/user/change-password/${userId}`,
}

export const LESSON_API = {
    ALL_LESSONS: '/lessons',
    LESSON_BY_ID: (lessonId: number) => `/lessons/${lessonId}`,
}
