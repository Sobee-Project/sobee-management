import { IChatMessage } from "./IChatMessage"
import { IUser } from "./IUser"

export interface IChatRoom {
  _id?: string
  messages?: string[] | IChatMessage[]
  title: string
  createdBy?: string | IUser
  users?: string[] | IUser[]
  createdAt?: Date | string
  updatedAt?: Date | string
}
