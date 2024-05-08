import { ICustomer } from "./ICustomer"
import { IOrderItem } from "./IOrderItem"

export interface ICart {
    _id?: string
    customer?: string | ICustomer
    cartItems?: string[] | IOrderItem[]
}
