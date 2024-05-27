import { IOrder } from "./IOrder"
import { IProduct } from "./IProduct"

export interface IOrderItem {
  _id?: string
  product?: IProduct | string
  quantity: number
}
