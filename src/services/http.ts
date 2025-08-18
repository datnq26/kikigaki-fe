import axios from 'axios'

import { REQUEST_HEADERS } from '@/constants/header'
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'
import { PATHS } from '@/router/paths'

const http = axios.create({
    withCredentials: true,
    // @ts-ignore
    baseURL: import.meta.env.VITE_APP_ROOT_API,
})

http.interceptors.request.use(async (config) => {
    const store = useAuthenticationStore()

    if (store.accessToken) {
        config.headers[REQUEST_HEADERS.TOKEN] = `Bearer ${store.accessToken}`
    }

    if (config.data instanceof FormData) {
        delete config.headers['Content-Type']
    } else {
        config.headers['Content-Type'] = 'application/json'
    }

    return config
})

http.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        const store = useAuthenticationStore()

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/token/refresh')
        ) {
            originalRequest._retry = true
            try {
                const newAccessToken = await store.refreshAccessToken()
                originalRequest.headers[REQUEST_HEADERS.TOKEN] =
                    `Bearer ${newAccessToken}`
                return http(originalRequest)
            } catch (e) {
                await store.logout()
                window.location.href = PATHS.LOGIN
            }
        }
        return Promise.reject(error)
    }
)

export { http }
