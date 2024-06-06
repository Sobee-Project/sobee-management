import { EProductSize } from "../enums"
import { IOrder } from "./IOrder"
import { IProduct } from "./IProduct"
import { IUser } from "./IUser"

export interface IOrderItem {
  _id?: string
  product: IProduct | string
  size: EProductSize
  color: string
  customer: string | IUser
  amount: number
  price: number
  subTotal: number
}
