import { ColumnType } from "@/_components"

export type StaffColumnKey =
    | "avatar"
    | "name"
    | "email"
    | "phoneNumber"
    | "identityCard"
    | "dateOfBirth"
    | "role"
    | "createdAt"
    | "actions"
export const staffColumns: ColumnType<StaffColumnKey>[] = [
    {
        label: "Avatar",
        key: "avatar"
    },
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
        label: "Identity Card",
        key: "identityCard",
        allowSorting: true
    },
    {
        label: "Date of Birth",
        key: "dateOfBirth"
    },
    {
        label: "Role",
        key: "role"
    },
    {
        label: "Joined At",
        key: "createdAt",
        allowSorting: true
    },
    {
        label: "Actions",
        key: "actions"
    }
]
