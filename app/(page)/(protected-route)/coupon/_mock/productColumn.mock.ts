import { ColumnType } from "@/_components"

export type ProductColumnKey = "name" | "type" | "price" | "quantity"
export const productColumns: ColumnType<ProductColumnKey>[] = [
  {
    label: "Product",
    key: "name",
    allowSorting: true
  },
  {
    label: "Type",
    key: "type",
    allowSorting: true
  },
  {
    label: "Price",
    key: "price",
    allowSorting: true
  },
  {
    label: "Quantity",
    key: "quantity",
    allowSorting: true
  }
]
