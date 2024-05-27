import { ColumnType } from "@/_components"

export type CouponColumnKey =
  | "image"
  | "code"
  | "type"
  | "discountValue"
  | "minOrderValue"
  | "startDate"
  | "endDate"
  | "status"
  | "actions"
export const couponColumns: ColumnType<CouponColumnKey>[] = [
  {
    label: "Banner",
    key: "image"
  },
  {
    label: "Code",
    key: "code",
    allowSorting: true
  },
  {
    label: "Type",
    key: "type",
    allowSorting: true
  },
  {
    label: "Discount Value",
    key: "discountValue"
  },
  {
    label: "Min Order Value",
    key: "minOrderValue"
  },
  {
    label: "Active",
    key: "startDate",
    allowSorting: true
  },
  {
    label: "Expired",
    key: "endDate",
    allowSorting: true
  },
  {
    label: "Status",
    key: "status",
    allowSorting: true
  },
  {
    label: "Actions",
    key: "actions"
  }
]
