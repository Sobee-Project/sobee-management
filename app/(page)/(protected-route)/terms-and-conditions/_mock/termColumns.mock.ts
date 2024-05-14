import { ColumnType } from "@/_components"

export type TermColumnKey = "title" | "description" | "type" | "issued_by.name" | "isApproved" | "createdAt" | "actions"
export const termColumns: ColumnType<TermColumnKey>[] = [
    {
        key: "title",
        label: "Title",
        allowSorting: true
    },
    {
        key: "description",
        label: "Description"
    },
    {
        key: "type",
        label: "Type",
        allowSorting: true
    },
    {
        key: "issued_by.name",
        label: "Issued By",
        allowSorting: true
    },
    {
        key: "isApproved",
        label: "Approved",
        allowSorting: true
    },
    {
        key: "createdAt",
        label: "Created At"
    },
    {
        key: "actions",
        label: "Actions"
    }
]
