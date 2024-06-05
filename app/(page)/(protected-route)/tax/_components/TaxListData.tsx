"use client"
import { CustomTable, ScreenLoader } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { ITax } from "@/_lib/interfaces"
import { Spinner } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { taxColumns } from "../_mock"
import RenderCellTax from "./RenderCellTax"

type Props = {
  data: ITax[]
}

const TaxListData = ({ data: taxList }: Props) => {
  const router = useRouter()

  const onClickCreate = () => {
    router.push(APP_ROUTES.TAXES.NEW)
  }

  return (
    <div>
      <CustomTable
        dataSource={taxList || []}
        columns={taxColumns}
        RenderCell={(tax, columnKey) => <RenderCellTax tax={tax} columnKey={columnKey} />}
        searchKeys={["name", "country", "city", "state", "zip"]}
        searchPlaceholder='Search taxes...'
        bodyProps={{
          emptyContent: "No taxes found"
        }}
        onClickCreate={onClickCreate}
        createText='Create new tax'
        showPagination={false}
      />
    </div>
  )
}

export default TaxListData
