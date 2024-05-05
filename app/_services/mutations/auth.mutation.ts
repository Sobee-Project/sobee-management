import { MUTATION_KEY } from "@/_constants"
import { useMutation } from "@tanstack/react-query"
import { LoginRequestDTO, authApi } from "../apis"

export const useLoginMutation = () => {
    return useMutation({
        mutationKey: [MUTATION_KEY.AUTH.LOGIN],
        mutationFn: (body: LoginRequestDTO) => authApi.login(body)
    })
}

export const useLogoutMutation = () => {
    return useMutation({
        mutationKey: [MUTATION_KEY.AUTH.LOGOUT],
        mutationFn: authApi.logout
    })
}

export const useChangePasswordMutation = () => {
    return useMutation({
        mutationKey: [MUTATION_KEY.AUTH.CHANGE_PASSWORD],
        mutationFn: authApi.changePassword
    })
}
