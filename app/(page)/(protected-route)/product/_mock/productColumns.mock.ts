import { ColumnType } from "@/_components"

export type ProductColumnKey = "actions" | "name" | "type" | "price" | "quantity" | "updatedAt" | "status"
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
    },
    {
        label: "Last Updated",
        key: "updatedAt",
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
