import { IProduct } from "./IProduct"

export interface IBrand {
  _id?: string
  name: string
  logo: string
  isActive: boolean
  website: string
  products?: string[] | IProduct[]
  createdAt?: Date | string
  updatedAt?: Date | string
}
