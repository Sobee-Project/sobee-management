import { ColumnType } from "@/_components"

export type AttributeColumnKey = "name" | "description" | "actions"
export const attributeColumns: ColumnType<AttributeColumnKey>[] = [
    {
        label: "Attribute Name",
        key: "name",
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
