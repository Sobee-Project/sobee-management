import { ColumnType } from "@/_components"

export type CategoryColumnKey = "image" | "name" | "parent" | "slug" | "description" | "actions"
export const categoryColumns: ColumnType<CategoryColumnKey>[] = [
  {
    label: "Image",
    key: "image"
  },
  {
    label: "Category Name",
    key: "name",
    allowSorting: true
  },
  {
    label: "Parent Category",
    key: "parent"
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
