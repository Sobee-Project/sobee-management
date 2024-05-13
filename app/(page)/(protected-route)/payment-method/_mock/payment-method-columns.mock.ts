import { ColumnType } from "@/_components"

export type PaymentMethodColumnKey = "name" | "image" | "actions"
export const paymentMethodColumns: ColumnType<PaymentMethodColumnKey>[] = [
    {
        label: "Logo",
        key: "image"
    },
    {
        label: "Name",
        key: "name",
        allowSorting: true
    },
    {
        label: "Actions",
        key: "actions"
    }
]
