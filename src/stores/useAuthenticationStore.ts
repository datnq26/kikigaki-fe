import { defineStore } from 'pinia'
import AuthService from '@/services/auth'
import {
    getLocalStorage,
    putLocalStorage,
    removeLocalStorage,
} from '@/utils/storage'
import { CREDENTIALS } from '@/constants/storage'

export const useAuthenticationStore = defineStore('authentication', {
    state: () => ({
        accessToken: getLocalStorage(CREDENTIALS.AUTHENTICATION_TOKEN) || null,
        userInfo: null as any,
    }),
    getters: {
        authenticated: (state) => !!state.accessToken,
    },
    actions: {
        async login(credentials: any) {
            const res = await AuthService.login(credentials)
            this.accessToken = res.data.access
            putLocalStorage(CREDENTIALS.AUTHENTICATION_TOKEN, res.data.access)
            await this.loadFromServer()
            return res
        },
        async loadFromServer() {
            try {
                const resUser = await AuthService.getCurrentUser()
                this.userInfo = resUser.data
            } catch (e: any) {
                this.userInfo = null
            }
        },
        async refreshAccessToken() {
            try {
                const res = await AuthService.refreshToken()
                this.accessToken = res.data.access
                putLocalStorage(
                    CREDENTIALS.AUTHENTICATION_TOKEN,
                    res.data.access
                )
                return res.data.access
            } catch (e) {
                await this.logout()
                throw e
            }
        },
        async logout() {
            try {
                await AuthService.logout()
            } catch (_) {}
            this.userInfo = null
            this.accessToken = null
            removeLocalStorage(CREDENTIALS.AUTHENTICATION_TOKEN)
        },
    },
})
