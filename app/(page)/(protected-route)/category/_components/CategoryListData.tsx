"use client"
import { CustomTable, ScreenLoader } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { ICategory } from "@/_lib/interfaces"
import { Spinner } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { categoryColumns } from "../_mock"
import RenderCellCategory from "./RenderCellCategory"

type Props = {
  data: ICategory[]
}

const CategoryListData = ({ data: categoryList }: Props) => {
  const router = useRouter()

  const onClickCreate = () => {
    router.push(APP_ROUTES.CATEGORIES.NEW)
  }

  return (
    <div>
      <CustomTable
        dataSource={categoryList || []}
        columns={categoryColumns}
        RenderCell={(category, columnKey) => <RenderCellCategory category={category} columnKey={columnKey} />}
        searchKeys={["name", "slug"] as (keyof ICategory)[]}
        searchPlaceholder='Search categoryes...'
        bodyProps={{
          emptyContent: "No categoryes found"
        }}
        onClickCreate={onClickCreate}
        createText='Create new category'
      />
    </div>
  )
}

export default CategoryListData
