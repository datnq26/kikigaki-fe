import { http } from '@/services/http'
import { USER_API } from '@/constants/api'
import { AxiosResponse } from 'axios'

import {
    UpdateAccountRequest
} from '@/interfaces/user'

class UserService {
    async getCurrentUser(): Promise<AxiosResponse<any>> {
        return await http.get(USER_API.GET_CURRENT_USER)
    }

    async updateAccount(payload: UpdateAccountRequest): Promise<AxiosResponse<any>> {
        return await http.patch(USER_API.UPDATE_ACCOUNT(payload.username, payload.first_name, payload.last_name), payload)
    }

    async updateAvatar(avatarFile?: File): Promise<AxiosResponse<any>> {
        const formData = new FormData()
        if (avatarFile) {
            formData.append('avatar', avatarFile)
            return await http.patch(USER_API.UPDATE_AVATAR, formData)
        }
        return await http.patch(USER_API.UPDATE_AVATAR)
    }
}

export default new UserService()
