import { ICustomer } from "./ICustomer"
import { IProduct } from "./IProduct"

export interface IFavorite {
  _id?: string
  customer?: string | ICustomer
  products?: string[] | IProduct[]
}
