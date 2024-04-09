import { API_ROUTES } from "@/_constants"
import { CreateRoleRequestDTO, CreateRoleResponseDTO, GetAllRoleResponseDTO, apiClient } from "@/_services"

export const roleApi = {
    getAll: () => {
        return apiClient.get<GetAllRoleResponseDTO>(API_ROUTES.ROLE.GET_ROLES)
    },
    create: (body: CreateRoleRequestDTO) => {
        return apiClient.post<CreateRoleResponseDTO>(API_ROUTES.ROLE.CREATE_ROLE, body)
    },
    update: (body: CreateRoleRequestDTO) => {
        return apiClient.put<CreateRoleResponseDTO>(API_ROUTES.ROLE.UPDATE_ROLE, body)
    },
    delete: (id: string) => {
        return apiClient.delete<CreateRoleResponseDTO>(API_ROUTES.ROLE.DELETE_ROLE.replace(":id", id))
    }
}
