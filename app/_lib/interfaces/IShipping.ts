import { EShippingType } from "../enums"

export interface IShipping {
    _id?: string
    name: string
    amount: number
    type?: EShippingType | string
}
