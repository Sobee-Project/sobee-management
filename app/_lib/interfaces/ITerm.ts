import { IUser } from "./IUser"

export interface ITerm {
  _id?: string
  title: string
  description: string
  slug?: string
  type: string
  isApproved: boolean
  issued_by?: string | IUser
  createdAt?: string
  updatedAt?: string
}
