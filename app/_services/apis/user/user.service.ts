import { API_ROUTES } from "@/_constants"
import { ChangeAvatarResponseDTO, UpdateUserInfoRequestDTO, UpdateUserInfoResponseDTO, apiClient } from "@/_services"

export const userApi = {
    changeAvatar: (body: FormData) => {
        return apiClient.put<ChangeAvatarResponseDTO>(API_ROUTES.USER.CHANGE_AVATAR, body, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    updateInfo: (body: UpdateUserInfoRequestDTO) => {
        return apiClient.put<UpdateUserInfoResponseDTO>(API_ROUTES.USER.UPDATE, body)
    }
}
