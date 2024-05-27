import { ColumnType } from "@/_components"

export type QuestionColumnKey = "actions" | "product" | "customer" | "question_and_answer" | "createdAt"
export const questionColumns: ColumnType<QuestionColumnKey>[] = [
  {
    label: "Product",
    key: "product"
  },
  {
    label: "Customer",
    key: "customer"
  },
  {
    label: "Question and Answer",
    key: "question_and_answer"
  },
  {
    label: "Created At",
    key: "createdAt",
    allowSorting: true
  },
  {
    label: "Actions",
    key: "actions"
  }
]
