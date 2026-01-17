import { AxiosResponse } from 'axios'
import { http } from '@/services/http'
import { USER_DAILY_ACTIVITY_API } from '@/constants/api'
import {
    CreateUserDailyActivityRequest,
    UpdateUserDailyActivityRequest,
    UserDailyActivityRequest,
    UserDailyActivityResponse,
    UserDailyActivitySummaryResponse,
} from '@/interfaces/daily'

class UserDailyActivityService {
    async getAllUserDailyActivities(
        params: UserDailyActivityRequest
    ): Promise<AxiosResponse<UserDailyActivityResponse[]>> {
        return http.get(
            USER_DAILY_ACTIVITY_API.ALL_USER_DAILY_ACTIVITIES(params)
        )
    }

    async createUserDailyActivity(
        payload: CreateUserDailyActivityRequest
    ): Promise<AxiosResponse<UserDailyActivityResponse>> {
        return http.post(
            USER_DAILY_ACTIVITY_API.CREATE_USER_DAILY_ACTIVITY,
            payload
        )
    }

    async updateUserDailyActivity(
        id: number | string,
        payload: UpdateUserDailyActivityRequest
    ): Promise<AxiosResponse<UserDailyActivityResponse>> {
        return http.put(
            USER_DAILY_ACTIVITY_API.UPDATE_USER_DAILY_ACTIVITY(id),
            payload
        )
    }

    async getUserDailySummary(): Promise<
        AxiosResponse<UserDailyActivitySummaryResponse>
    > {
        return http.get(USER_DAILY_ACTIVITY_API.USER_DAILY_ACTIVITY_SUMMARY)
    }
}

export default new UserDailyActivityService()
