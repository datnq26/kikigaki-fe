import { http, httpFile } from '@/services/http'
import { USER_API } from '@/constants/api'

export const getCurrentUser = async () => {
    return (await http.get(USER_API.GET_CURRENT_USER)).data
}

export const getAllUsers = async (page: any) => {
    return (await http.get(USER_API.LIST_USERS(page))).data
}

export const createUser = async (payload: any) => {
    await http.post(USER_API.CREATE_USER, payload)
}

export const deleteUser = async (userId: any) => {
    await http.delete(USER_API.DELETE_USER(userId))
}

export const editUser = async (userId: any, payload: any) => {
    await httpFile.put(USER_API.EDIT_USER(userId), payload)
}

export const changePassword = async (userId: any, payload: any) => {
    await http.put(USER_API.CHANGE_PASSWORD(userId), payload)
}
