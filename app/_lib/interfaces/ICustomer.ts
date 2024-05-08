import { IAddress } from "./IAddress"

export interface ICustomer {
    _id?: string
    isPhoneNumberVerified?: boolean
    phoneNumberVerifiedAt?: Date | string
    isEmailVerified?: boolean
    emailVerifiedAt?: Date | string
    addresses?: string[] | IAddress[]
}
