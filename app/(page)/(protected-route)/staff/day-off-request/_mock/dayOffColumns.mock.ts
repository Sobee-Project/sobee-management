import { ColumnType } from "@/_components"

export type DayOffColumnKey = "staff.name" | "reason" | "status" | "createdAt" | "actions" | "startDate" | "endDate"
export const dayOffColumns: ColumnType<DayOffColumnKey>[] = [
    {
        label: "Staff",
        key: "staff.name",
        allowSorting: true
    },
    {
        label: "Reason",
        key: "reason"
    },
    {
        label: "Start Date",
        key: "startDate"
    },
    {
        label: "End Date",
        key: "endDate"
    },
    {
        label: "Submitted At",
        key: "createdAt"
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
