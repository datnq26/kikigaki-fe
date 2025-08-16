import axios from 'axios'

import { REQUEST_HEADERS } from '@/constants/header'
import { CREDENTIALS } from '@/constants/storage'
import { getLocalStorage } from '@/utils/storage'

const http = axios.create({
    withCredentials: true,
    // @ts-ignore
    baseURL: import.meta.env.VITE_APP_ROOT_API,
    transformRequest: [
        function (data: any, headers: any) {
            headers[REQUEST_HEADERS.TOKEN] = getLocalStorage(
                CREDENTIALS.AUTHENTICATION_TOKEN
            )
            return JSON.stringify(data)
        },
    ],
    headers: {
        'Content-Type': 'application/json',
    },
})

const httpFile = axios.create({
    withCredentials: true,
    // @ts-ignore
    baseURL: import.meta.env.VITE_APP_ROOT_API,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})

http.interceptors.response.use(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    null,
    (error: any) => {
        if ([401, 403].includes(error.response.status)) {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            // logout().then((r) => {console.log(r)})
        }
        return Promise.reject(error)
    }
)

httpFile.interceptors.response.use(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    null,
    (error: any) => {
        if ([401, 403].includes(error.response.status)) {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            // logout().then((r) => {console.log(r)})
        }
        return Promise.reject(error)
    }
)

export { http, httpFile }
