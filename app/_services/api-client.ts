import { APP_ROUTES, ENV_CONFIG } from "@/_constants"
import { ErrorResponse } from "@/_lib/types"
import { clearCredentialsFromCookie, getCredentialsFromCookie } from "@/_utils/storage"
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from "axios"

class ApiClient {
    instance: AxiosInstance
    private accessToken: string
    private refreshToken: string
    private userId: string

    constructor() {
        this.instance = axios.create({
            baseURL: ENV_CONFIG.BASE_API_URL,
            responseType: "json",
            withCredentials: true,
            timeout: 60000,
            headers: {
                "Content-Type": "application/json"
            }
        })

        const { accessToken, refreshToken, user_id } = getCredentialsFromCookie()
        this.accessToken = accessToken || ""
        this.refreshToken = refreshToken || ""
        this.userId = user_id || ""

        this.instance.interceptors.request.use(
            (config) => {
                if (this.accessToken && this.userId && config.headers) {
                    config.headers["Authorization"] = `Bearer ${this.accessToken}`
                    config.headers["x-client-id"] = this.userId
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        this.instance.interceptors.response.use(
            (response) => {
                return response
            },
            (error: AxiosError<ErrorResponse>) => {
                if (error.response?.status === HttpStatusCode.Unauthorized) {
                    clearCredentialsFromCookie()
                    location.href = APP_ROUTES.LOGIN
                }
                return Promise.reject(error)
            }
        )
    }
}

const apiClient = new ApiClient().instance
export { apiClient }
