import { API_ROUTES } from "@/_constants"
import { apiClient } from "../.."
import { AuthResponseDTO, GetMeResponseDto } from "./auth.dto"

export const authApi = {
    login(body: { emailOrPhone: string; password: string }) {
        return apiClient.post<AuthResponseDTO>(API_ROUTES.AUTH.LOGIN, body)
    },
    refreshToken(body: { refreshToken: string }) {
        return apiClient.post(API_ROUTES.AUTH.REFRESH_TOKEN, body)
    },
    getMe() {
        return apiClient.get<GetMeResponseDto>(API_ROUTES.AUTH.GET_ME)
    },
    logout() {
        return apiClient.post(API_ROUTES.AUTH.LOGOUT)
    }
}
