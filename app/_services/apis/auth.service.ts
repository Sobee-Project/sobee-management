import { API_ROUTES } from "@/_constants"
import { IUser } from "@/_lib/interfaces/IUser"
import { AuthResponse, SucccessResponse } from "@/_lib/types"
import { apiClient } from ".."

export const authApi = {
    login(body: { emailOrPhone: string; password: string }) {
        return apiClient.post<AuthResponse>(API_ROUTES.AUTH.LOGIN, body)
    },
    refreshToken(body: { refreshToken: string }) {
        return apiClient.post(API_ROUTES.AUTH.REFRESH_TOKEN, body)
    },
    getMe() {
        return apiClient.get<SucccessResponse<{ user: IUser }>>(API_ROUTES.AUTH.GET_ME)
    },
    logout() {
        return apiClient.post(API_ROUTES.AUTH.LOGOUT)
    }
}
