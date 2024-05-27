import { IAdmin } from "./IAdmin"
import { ICustomer } from "./ICustomer"
import { IStaff } from "./IStaff"

export interface IUser<T = ICustomer | IAdmin | IStaff> {
  _id?: string
  email: string
  phoneNumber: string
  password?: string
  name: string
  avatar: string
  dateOfBirth?: string
  role: string
  _user?: T | string
  createdAt?: string
}
