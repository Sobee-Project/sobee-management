import { API_ROUTES, ENV_CONFIG } from "@/_constants"
import { AuthResponse, ErrorResponse, RefreshTokenResponse } from "@/_lib/types"
import { clearCredentialsFromCookie, getCredentialsFromCookie, setCredentialsToCookie } from "@/_utils/storage"
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios"

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
    }
}

const apiClient = new ApiClient().instance
export { apiClient }
