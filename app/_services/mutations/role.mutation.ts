import { useMutation } from "@tanstack/react-query"
import { CreateRoleRequestDTO, UpdateRoleRequestDTO, roleApi } from "../apis"

export const useCreateRoleMutation = () => {
    return useMutation({
        mutationKey: ["createRole"],
        mutationFn: (body: CreateRoleRequestDTO) => roleApi.create(body)
    })
}

export const useUpdateRoleMutation = () => {
    return useMutation({
        mutationKey: ["updateRole"],
        mutationFn: (body: UpdateRoleRequestDTO) => roleApi.update(body)
    })
}

export const useDeleteRoleMutation = () => {
    return useMutation({
        mutationKey: ["deleteRole"],
        mutationFn: (id: string) => roleApi.delete(id)
    })
}
