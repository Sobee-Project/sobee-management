import { IUser } from "@/_lib/interfaces"
import { SucccessResponse } from "@/_lib/types"

export type ChangeAvatarRequestDTO = FormData
export type ChangeAvatarResponseDTO = SucccessResponse<IUser>

export type UpdateUserInfoRequestDTO = Pick<IUser, "email" | "phoneNumber" | "dateOfBirth" | "name">
export type UpdateUserInfoResponseDTO = SucccessResponse<IUser>
