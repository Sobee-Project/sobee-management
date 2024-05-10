import { ColumnType } from "@/_components"

export type ReviewColumnKey =
    | "product"
    | "customer"
    | "rating"
    | "title"
    | "content"
    | "assets"
    | "createdAt"
    | "actions"
export const reviewColumn: ColumnType<ReviewColumnKey>[] = [
    {
        label: "Title",
        key: "title",
        allowSorting: true
    },
    {
        label: "Content",
        key: "content"
    },
    {
        label: "Rating",
        key: "rating",
        allowSorting: true
    },
    {
        label: "Customer",
        key: "customer",
        allowSorting: true
    },
    {
        label: "Product",
        key: "product",
        allowSorting: true
    },
    {
        label: "Date",
        key: "createdAt",
        allowSorting: true
    },
    {
        label: "Assets",
        key: "assets"
    },
    {
        label: "Actions",
        key: "actions"
    }
]
