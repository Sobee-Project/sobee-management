import { ColumnType } from "@/_components"

export type FaqColumnKey = "title" | "description" | "type" | "issued_by.name" | "createdAt" | "actions"
export const faqColumns: ColumnType<FaqColumnKey>[] = [
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
    key: "createdAt",
    label: "Created At"
  },
  {
    key: "actions",
    label: "Actions"
  }
]
