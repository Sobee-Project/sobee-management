import { API_ROUTES } from "@/_constants"
import { apiClient } from "../.."
import {
    ChangePasswordRequestDTO,
    ChangePasswordResponseDTO,
    GetMeResponseDto,
    LoginRequestDTO,
    LoginResponseDTO
} from "./auth.dto"

export const authApi = {
    login(body: LoginRequestDTO) {
        return apiClient.post<LoginResponseDTO>(API_ROUTES.AUTH.LOGIN, body)
    },
    refreshToken(body: { refreshToken: string }) {
        return apiClient.post(API_ROUTES.AUTH.REFRESH_TOKEN, body)
    },
    getMe() {
        return apiClient.get<GetMeResponseDto>(API_ROUTES.AUTH.GET_ME)
    },
    logout() {
        return apiClient.post(API_ROUTES.AUTH.LOGOUT)
    },
    changePassword: (body: ChangePasswordRequestDTO) => {
        return apiClient.put<ChangePasswordResponseDTO>(API_ROUTES.AUTH.CHANGE_PASSWORD, body)
    }
}
