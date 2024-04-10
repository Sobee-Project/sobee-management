import { MUTATION_KEY } from "@/_constants"
import { useMutation } from "@tanstack/react-query"
import { CreateRoleRequestDTO, UpdateRoleRequestDTO, roleApi } from "../apis"

export const useCreateRoleMutation = () => {
    return useMutation({
        mutationKey: [MUTATION_KEY.ROLE.CREATE_ROLE],
        mutationFn: (body: CreateRoleRequestDTO) => roleApi.create(body)
    })
}

export const useUpdateRoleMutation = () => {
    return useMutation({
        mutationKey: [MUTATION_KEY.ROLE.UPDATE_ROLE],
        mutationFn: (body: UpdateRoleRequestDTO) => roleApi.update(body)
    })
}

export const useDeleteRoleMutation = () => {
    return useMutation({
        mutationKey: [MUTATION_KEY.ROLE.DELETE_ROLE],
        mutationFn: (id: string) => roleApi.delete(id)
    })
}
