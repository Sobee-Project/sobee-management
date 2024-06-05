import { ColumnType } from "@/_components"

export type CategoryColumnKey = "image" | "name" | "slug" | "actions" | "productCount" | "isParent"
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
    label: "Product Count",
    key: "productCount",
    allowSorting: true
  },
  {
    label: "Is Parent",
    key: "isParent",
    allowSorting: true
  },
  {
    label: "Slug",
    key: "slug",
    allowSorting: true
  },
  {
    label: "Actions",
    key: "actions"
  }
]
