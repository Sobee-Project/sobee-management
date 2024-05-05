import { MUTATION_KEY } from "@/_constants"
import { useMutation } from "@tanstack/react-query"
import { ChangeAvatarRequestDTO, UpdateUserInfoRequestDTO, userApi } from "../apis"

export const useChangeUserAvatarMutation = () => {
    return useMutation({
        mutationKey: [MUTATION_KEY.USER.CHANGE_AVATAR],
        mutationFn: (formData: ChangeAvatarRequestDTO) => userApi.changeAvatar(formData)
    })
}

export const useUpdateUserInfoMutation = () => {
    return useMutation({
        mutationKey: [MUTATION_KEY.USER.UPDATE_USER_INFO],
        mutationFn: (body: UpdateUserInfoRequestDTO) => userApi.updateInfo(body)
    })
}
