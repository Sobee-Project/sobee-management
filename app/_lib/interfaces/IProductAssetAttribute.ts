import { IAttribute } from "./IAttribute"
import { IProduct } from "./IProduct"

export interface IProductAssetAttribute {
    _id?: string
    product?: string | IProduct
    assets: string[]
    attribute?: string | IAttribute
    value: string
    amount: number
}
