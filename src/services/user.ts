import { http } from '@/services/http'
import { USER_API } from '@/constants/api'
import { AxiosResponse } from 'axios'

import {
    UpdateAccountRequest,
    UpdateAccountResponse,
    UpdateAvatarRequest,
    UpdateAvatarResponse,
    LeaderboardUser,
} from '@/interfaces/user'
import { PaginationResponse } from '@/interfaces/commons'

class UserService {
    async getCurrentUser(): Promise<AxiosResponse<any>> {
        return await http.get(USER_API.GET_CURRENT_USER)
    }

    async updateAccount(
        payload: UpdateAccountRequest
    ): Promise<AxiosResponse<UpdateAccountResponse>> {
        return await http.patch(USER_API.UPDATE_ACCOUNT, payload)
    }

    async updateAvatar(
        payload: UpdateAvatarRequest
    ): Promise<AxiosResponse<UpdateAvatarResponse>> {
        const formData = new FormData()
        if (payload.avatar) {
            formData.append('avatar', payload.avatar)
            return await http.patch(USER_API.UPDATE_AVATAR, formData)
        }
        return await http.patch(USER_API.UPDATE_AVATAR)
    }

    async getTopUsers(
        params?: any
    ): Promise<AxiosResponse<LeaderboardUser[]>> {
        return await http.get(USER_API.TOP_USERS(params || {}))
    }

    async getLeaderboard(
        params?: any
    ): Promise<AxiosResponse<PaginationResponse<LeaderboardUser>>> {
        return await http.get(USER_API.LEADERBOARD(params || {}))
    }
}

export default new UserService()
