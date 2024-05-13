import { ColumnType } from "@/_components"

export type BrandColumnKey = "name" | "logo" | "isActive" | "website" | "products" | "createdAt" | "actions"
export const brandColumns: ColumnType<BrandColumnKey>[] = [
    {
        label: "Brand Name",
        key: "name",
        allowSorting: true
    },
    {
        label: "Logo",
        key: "logo"
    },
    {
        label: "Active",
        key: "isActive",
        allowSorting: true
    },
    {
        label: "Website",
        key: "website"
    },
    {
        label: "Products",
        key: "products"
    },
    {
        label: "Day Created",
        key: "createdAt"
    },
    {
        label: "Actions",
        key: "actions"
    }
]
