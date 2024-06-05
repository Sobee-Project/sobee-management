import { EProductType } from "../enums"

export interface IRefundPolicy {
  _id?: string
  title: string
  description: string
  appliedOn?: EProductType | string
  createdAt?: string
  updatedAt?: string
}
