import { SucccessResponse } from "."
import { IUser } from "../interfaces/IUser"

export type AuthResponse = SucccessResponse<{
    accessToken: string
    refreshToken: string
    user: IUser
}>

export type RefreshTokenResponse = SucccessResponse<{
    accessToken: string
    refreshToken: string
}>

export type GetMeResponse = SucccessResponse<{ user: IUser }>
