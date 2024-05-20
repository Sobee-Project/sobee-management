import { EProductSize } from "../enums"

export interface IVariant {
    assets?: string[]
    amount: number
    price: number
    size: EProductSize | string
    color: string
}
