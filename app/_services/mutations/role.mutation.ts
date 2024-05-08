import { MUTATION_KEY, QUERY_KEY } from "@/_constants"
import { IRole } from "@/_lib/interfaces"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateRoleRequestDTO, UpdateRoleRequestDTO, roleApi } from "../apis"

export const useCreateRoleMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: [MUTATION_KEY.ROLE.CREATE_ROLE],
        mutationFn: (body: CreateRoleRequestDTO) => roleApi.create(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ROLE.GET_ROLE_LIST], exact: true })
        }
    })
}

export const useUpdateRoleMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: [MUTATION_KEY.ROLE.UPDATE_ROLE],
        mutationFn: async (body: UpdateRoleRequestDTO) => roleApi.update(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ROLE.GET_ROLE_LIST], exact: true })
        }
    })
}

export const useDeleteRoleMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: [MUTATION_KEY.ROLE.DELETE_ROLE],
        mutationFn: (id: string) => roleApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ROLE.GET_ROLE_LIST], exact: true })
        }
    })
}
