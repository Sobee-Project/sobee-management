import { ColumnType } from "@/_components"

export type OrderColumnKey =
  | "trackingNumber"
  | "customer"
  | "products"
  | "orderDate"
  | "shippingFee"
  | "total"
  | "status"
  | "actions"
export const orderColumns: ColumnType<OrderColumnKey>[] = [
  {
    label: "Tracking Number",
    key: "trackingNumber",
    allowSorting: true
  },
  {
    label: "Customer",
    key: "customer"
  },
  {
    label: "Products",
    key: "products",
    allowSorting: true
  },
  {
    label: "Order Date",
    key: "orderDate",
    allowSorting: true
  },
  {
    label: "Shipping Fee",
    key: "shippingFee"
  },
  {
    label: "Total",
    key: "total",
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
