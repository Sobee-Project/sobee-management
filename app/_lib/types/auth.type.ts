import { SucccessResponse } from "."
import { IUser } from "../interfaces/IUser"

export type AuthResponse = {
    accessToken: string
    refreshToken: string
    user: IUser
}

export type RefreshTokenResponse = {
    accessToken: string
    refreshToken: string
}
