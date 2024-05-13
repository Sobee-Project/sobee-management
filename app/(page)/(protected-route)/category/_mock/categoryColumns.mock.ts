import { ColumnType } from "@/_components"

export type CategoryColumnKey = "name" | "slug" | "description" | "actions"
export const categoryColumns: ColumnType<CategoryColumnKey>[] = [
    {
        label: "Category Name",
        key: "name",
        allowSorting: true
    },
    {
        label: "Slug",
        key: "slug",
        allowSorting: true
    },
    {
        label: "Description",
        key: "description"
    },
    {
        label: "Actions",
        key: "actions"
    }
]
