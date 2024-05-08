import { IAddress } from "./IAdrress"

export interface IUser<T = ICustomer | IAdmin | IStaff> {
    _id?: string
    email: string
    phoneNumber: string
    password?: string
    name: string
    avatar: string
    dateOfBirth: Date | string
    role: string
    _user?: T | string
    createdAt?: Date | string
}

export interface ICustomer {
    isPhoneNumberVerified?: boolean
    phoneNumberVerifiedAt?: Date
    isEmailVerified?: boolean
    emailVerifiedAt?: Date
    addresses: string[] | IAddress[]
}

export interface IAdmin {}

export interface IStaff {
    identityCard: string
    staffRole: string
}
