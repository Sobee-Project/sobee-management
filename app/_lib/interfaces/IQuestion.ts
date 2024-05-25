import { IProduct } from "./IProduct"
import { IReply } from "./IReply"
import { IUser } from "./IUser"

export interface IQuestion {
    _id?: string
    content: string
    answer?: IReply
    product: string | IProduct
    customer: string | IUser
    likes?: string[]
    createdAt?: string
}
