import { IUser } from "./IUser"

export interface IFaq {
    _id?: string
    title: string
    description: string
    slug?: string
    type: string
    issued_by?: string | IUser
    createdAt?: string
    updatedAt?: string
}
