export interface UserDailyActivityResponse {
    id: number
    user: number
    date: string
    completed_lessons: number
    study_time_minutes: number
}

export interface UserDailyActivityRequest {
    year: string | number
}

export interface CreateUserDailyActivityRequest {
    user: number
    date: string
    completed_lessons: number
    study_time_minutes: number
}

export interface UpdateUserDailyActivityRequest {
    user: number
    date: string
    completed_lessons: number
    study_time_minutes: number
}

export interface UserDailyActivitySummaryResponse {
    total_completed_lessons: number
    total_study_time_minutes: number
}
