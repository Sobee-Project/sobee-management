import { IUser } from "@/_lib/interfaces/IUser"
import { AuthResponse, SucccessResponse } from "@/_lib/types"
import { AxiosResponse } from "axios"
import { apiClient } from ".."

export const URL_LOGIN = "/auth/login"
export const URL_REGISTER = "/auth/register"
export const URL_REFRESH_TOKEN = "/auth/refresh-token"
export const URL_LOGOUT = "/auth/logout"
export const URL_GET_ME = "/auth/me"

const authApi = {
    login(body: { emailOrPhone: string; password: string }) {
        return apiClient.post<AuthResponse>(URL_LOGIN, body)
    },
    refreshToken(body: { refreshToken: string }) {
        return apiClient.post(URL_REFRESH_TOKEN, body)
    },
    getMe() {
        return apiClient.get<SucccessResponse<{ user: IUser }>>(URL_GET_ME)
    },
    logout() {
        return apiClient.post(URL_LOGOUT)
    }
}

export default authApi
