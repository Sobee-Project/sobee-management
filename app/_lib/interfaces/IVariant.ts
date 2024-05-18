import { IAttribute } from "./IAttribute"
import { IProduct } from "./IProduct"

export interface IVariant {
    assets?: string[]
    amount: number
    price: number
    attributeList: IAttributeWithValue[]
}

export interface IAttributeWithValue {
    attribute: string | IAttribute
    value: string
}
