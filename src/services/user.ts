import { http } from '@/services/http'
import { USER_API } from '@/constants/api'
import { AxiosResponse } from 'axios'

class UserService {
    async getCurrentUser(): Promise<AxiosResponse<any>> {
        return await http.get(USER_API.GET_CURRENT_USER)
    }
}

export default new UserService()
