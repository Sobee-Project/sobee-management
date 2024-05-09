import { ColumnType } from "@/_components"

export type TaxColumnKey = "name" | "rate" | "country" | "city" | "state" | "zip" | "actions"
export const taxColumns: ColumnType<TaxColumnKey>[] = [
    {
        label: "Tax Name",
        key: "name",
        allowSorting: true
    },
    {
        label: "Rate (%)",
        key: "rate",
        allowSorting: true
    },
    {
        label: "Country",
        key: "country",
        allowSorting: true
    },
    {
        label: "City",
        key: "city"
    },
    {
        label: "State",
        key: "state"
    },
    {
        label: "Zip",
        key: "zip"
    },
    {
        label: "Actions",
        key: "actions"
    }
]
