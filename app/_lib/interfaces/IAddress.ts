import { IUser } from "./IUser"

export interface IAddress {
    country: string
    postalCode: string
    city: string
    district: string
    ward: string
    street: string
    specificAddress: string
    isDefault: boolean
    customer?: string | IUser
    createdAt?: Date | string
    updatedAt?: Date | string
}
