import { ColumnType } from "@/_components"

export type CustomerColumnKey =
    | "name"
    | "email"
    | "phoneNumber"
    | "_user.gender"
    | "dateOfBirth"
    | "createdAt"
    | "_user.isActive"
    | "actions"
export const customerColumns: ColumnType<CustomerColumnKey>[] = [
    {
        label: "Name",
        key: "name",
        allowSorting: true
    },
    {
        label: "Email",
        key: "email"
    },
    {
        label: "Phone Number",
        key: "phoneNumber"
    },
    {
        label: "Gender",
        key: "_user.gender"
    },
    {
        label: "Date of Birth",
        key: "dateOfBirth"
    },
    {
        label: "Joined At",
        key: "createdAt",
        allowSorting: true
    },
    {
        label: "Status",
        key: "_user.isActive",
        allowSorting: true
    },
    {
        label: "Actions",
        key: "actions"
    }
]
