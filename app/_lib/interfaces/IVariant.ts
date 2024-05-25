import { EProductSize } from "../enums"

export interface IVariant {
    _id?: string
    assets?: string[]
    amount: number
    price: number
    size: EProductSize | string
    color: string
}
