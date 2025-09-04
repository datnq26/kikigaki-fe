import { http } from '@/services/http'
import { USER_API } from '@/constants/api'
import { AxiosResponse } from 'axios'

import {
    UpdateAccountRequest,
    UpdateAccountResponse,
    UpdateAvatarRequest,
    UpdateAvatarResponse,
} from '@/interfaces/user'

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
}

export default new UserService()
