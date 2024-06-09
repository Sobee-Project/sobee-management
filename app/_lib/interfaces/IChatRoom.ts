import { IChatMessage } from "./IChatMessage"
import { IOrder } from "./IOrder"
import { IProduct } from "./IProduct"
import { IUser } from "./IUser"

export interface IChatRoom {
  _id?: string
  messages: IChatMessage[]
  title: string
  order?: string | IOrder
  product?: string | IProduct
  createdBy: string | IUser
  lastMessage?: IChatMessage
  isHaveNew?: boolean
  staff: {
    user: string | IUser
    isDeleted: boolean
  }
  customer: {
    user: string | IUser
    isDeleted: boolean
  }
  createdAt?: string
  updatedAt?: string
}
