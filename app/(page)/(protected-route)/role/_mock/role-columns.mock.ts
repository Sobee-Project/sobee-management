import { ColumnType } from "@/_components"

export type RoleColumnKey = "role_name" | "grant_lists" | "actions"
export const roleColumns: ColumnType<RoleColumnKey>[] = [
  {
    label: "Role Name",
    key: "role_name",
    allowSorting: true
  },
  {
    label: "Grants (Resource, Permissions)",
    key: "grant_lists"
  },
  {
    label: "Actions",
    key: "actions"
  }
]
