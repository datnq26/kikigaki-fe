export const AUTH_API = {
    LOGIN: '/login',
    LOGOUT: '/logout',
    REGISTER: '/register',
    REFRESH_TOKEN: '/token/refresh',
    VERIFY_TOKEN: '/token/verify',
    ME: '/user/me',
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
    UPDATE_ACCOUNT: '/user/update-account',
    UPDATE_AVATAR: '/user/update-avatar',
    TOP_USERS: (params: any) => {
        const query = Object.keys(params)
            .filter(
                (key) =>
                    params[key] !== undefined &&
                    params[key] !== null &&
                    params[key] !== 0 &&
                    params[key] !== ''
            )
            .map((key) => `${key}=${params[key]}`)
            .join('&')
        return `/user/top-users?${query}`
    },
    LEADERBOARD: (params: any) => {
        const query = Object.keys(params)
            .filter(
                (key) =>
                    params[key] !== undefined &&
                    params[key] !== null &&
                    params[key] !== 0 &&
                    params[key] !== ''
            )
            .map((key) => `${key}=${params[key]}`)
            .join('&')
        return query ? `/user/leaderboard?${query}` : '/user/leaderboard'
    },
}

export const LESSON_API = {
    ALL_LESSONS: (courseId: number | null = null) => {
        if (courseId) {
            return `/lessons?course=${courseId}`
        }
        return `/lessons`
    },
    LESSON_BY_ID: (lessonId: number | string) => `/lessons/${lessonId}`,
    RANDOM_LESSON: '/lessons/random',
}

export const COURSE_API = {
    ALL_COURSES: (params: any) => {
        const query = Object.keys(params)
            .filter(
                (key) =>
                    params[key] !== undefined &&
                    params[key] !== null &&
                    params[key] !== 0 &&
                    params[key] !== ''
            )
            .map((key) => `${key}=${params[key]}`)
            .join('&')
        return `/courses?${query}`
    },
    COURSE_BY_ID: (courseId: number | string) => `/courses/${courseId}`,
    TOP_BY_CATEGORIES: (params: any) => {
        const query = Object.keys(params)
            .filter(
                (key) =>
                    params[key] !== undefined &&
                    params[key] !== null &&
                    params[key] !== 0 &&
                    params[key] !== ''
            )
            .map((key) => `${key}=${params[key]}`)
            .join('&')
        return `/courses/top-by-categories?${query}`
    },
}

export const USER_DAILY_ACTIVITY_API = {
    ALL_USER_DAILY_ACTIVITIES: (params: any) => {
        const query = Object.keys(params)
            .filter(
                (key) =>
                    params[key] !== undefined &&
                    params[key] !== null &&
                    params[key] !== 0 &&
                    params[key] !== ''
            )
            .map((key) => `${key}=${params[key]}`)
            .join('&')
        return `/user-daily-activities?${query}`
    },
    CREATE_USER_DAILY_ACTIVITY: '/user-daily-activities',
    UPDATE_USER_DAILY_ACTIVITY: (userId: number | string) =>
        `/user-daily-activities/${userId}`,
    USER_DAILY_ACTIVITY_SUMMARY: '/user-daily-activities/summary',
}
