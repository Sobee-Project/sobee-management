import { ECouponStatus } from "@/_lib/enums"
import { ICustomer } from "./ICustomer"

export interface ICoupon {
    _id?: string
    code: string
    discountValue: number
    startDate?: Date | string
    endDate?: Date | string
    usageLimit: number
    usageCount: number
    customerUsed?: string[] | ICustomer[]
    status: ECouponStatus
}
