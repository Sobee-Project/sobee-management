import { IProduct } from "./IProduct"
import { IUser } from "./IUser"

export interface IReview {
    _id?: string
    product?: string | IProduct
    customer?: string | IUser
    rating: number
    title: string
    content: string
    assets: string[]
    createdAt?: string
    updatedAt?: string
}
