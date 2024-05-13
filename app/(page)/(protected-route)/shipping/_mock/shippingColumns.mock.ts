import { ColumnType } from "@/_components"

export type ShippingColumnKey = "name" | "amount" | "type" | "actions"
export const shippingColumns: ColumnType<ShippingColumnKey>[] = [
    {
        label: "Shipping Name",
        key: "name",
        allowSorting: true
    },
    {
        label: "Amount",
        key: "amount",
        allowSorting: true
    },
    {
        label: "Type",
        key: "type",
        allowSorting: true
    },
    {
        label: "Actions",
        key: "actions"
    }
]
