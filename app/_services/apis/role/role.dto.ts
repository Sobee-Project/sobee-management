import { IRole } from "@/_lib/interfaces"
import { SucccessResponse } from "@/_lib/types"

export type GetAllRoleResponseDTO = SucccessResponse<IRole[]>

export type CreateRoleRequestDTO = Pick<IRole, "role_name" | "role_slug" | "grant_lists">

export type CreateRoleResponseDTO = SucccessResponse<IRole>

export type UpdateRoleRequestDTO = Pick<IRole, "role_name" | "role_slug" | "grant_lists">

export type UpdateRoleResponseDTO = SucccessResponse<IRole>

export type DeleteRoleResponseDTO = SucccessResponse<null>
