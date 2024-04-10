import { IUser } from "@/_lib/interfaces"
import { AuthResponse, GetMeResponse, RefreshTokenResponse, SucccessResponse } from "@/_lib/types"

export type LoginRequestDTO = {
    emailOrPhone: string
    password: string
}

export type LoginResponseDTO = AuthResponse

export type RefreshTokenResponseDTO = RefreshTokenResponse

export type GetMeResponseDto = GetMeResponse
