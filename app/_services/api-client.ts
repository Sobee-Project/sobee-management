import { AuthResponse, ErrorResponse, RefreshTokenResponse } from "@/_lib/types"
import { clearCredentialsFromCookie, getCredentialsFromCookie, setCredentialsToCookie } from "@/_utils/storage"
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios"
import toast from "react-hot-toast"
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from "./apis/auth.service"

class ApiClient {
    instance: AxiosInstance
    private accessToken: string
    private refreshToken: string
    private userId: string
    private refreshTokenRequest: Promise<string> | null = null

    constructor() {
        this.instance = axios.create({
            baseURL: "http://localhost:8000/api",
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
                const { url } = response.config

                if (url === URL_LOGIN || url === URL_REGISTER) {
                    const { data } = response.data as AuthResponse
                    const { accessToken, refreshToken } = data
                    const { user } = data
                    this.accessToken = accessToken
                    this.refreshToken = refreshToken
                    this.userId = user._id || ""
                    setCredentialsToCookie({ accessToken, refreshToken, user_id: user?._id || "" })
                } else if (url === URL_LOGOUT) {
                    this.accessToken = ""
                    this.refreshToken = ""
                    this.userId = ""
                    clearCredentialsFromCookie()
                }

                return response
            },
            async (error: AxiosError<ErrorResponse>) => {
                if (error.response?.status === 401) {
                    const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
                    const { url } = config

                    const TOKEN_EXPIRED_MESSAGE = "Token has expired"

                    if (error.response?.data?.message === TOKEN_EXPIRED_MESSAGE && url) {
                        this.refreshTokenRequest = this.refreshTokenRequest
                            ? this.refreshTokenRequest
                            : this.handleRefreshToken().finally(() => {
                                  this.refreshTokenRequest = null
                              })

                        return this.refreshTokenRequest.then((accessToken) => {
                            return this.instance({
                                ...config,
                                headers: {
                                    ...config.headers,
                                    Authorization: `Bearer ${accessToken}`
                                }
                            })
                        })
                    }

                    clearCredentialsFromCookie()
                }
                return Promise.reject(error)
            }
        )
    }
    private handleRefreshToken = async () => {
        return this.instance
            .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, { refreshToken: this.refreshToken })
            .then((response) => {
                const { accessToken, refreshToken } = response.data.data
                this.accessToken = accessToken
                this.refreshToken = refreshToken
                setCredentialsToCookie({ accessToken, refreshToken, user_id: this.userId })
                return accessToken
            })
            .catch((error) => {
                clearCredentialsFromCookie()
                return Promise.reject(error)
            })
    }
}

const apiClient = new ApiClient().instance
export { apiClient }
