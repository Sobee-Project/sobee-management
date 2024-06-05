"use client"
import { CustomTable, ScreenLoader } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { IShipping } from "@/_lib/interfaces"
import { Spinner } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { shippingColumns } from "../_mock"
import RenderCellShipping from "./RenderCellShipping"

type Props = {
  data: IShipping[]
}

const ShippingListData = ({ data: shippingList }: Props) => {
  const router = useRouter()

  const onClickCreate = () => {
    router.push(APP_ROUTES.SHIPPINGS.NEW)
  }

  return (
    <div>
      <CustomTable
        dataSource={shippingList || []}
        columns={shippingColumns}
        RenderCell={(shipping, columnKey) => <RenderCellShipping shipping={shipping} columnKey={columnKey} />}
        searchKeys={["name", "country", "city", "state", "zip"]}
        searchPlaceholder='Search shippinges...'
        bodyProps={{
          emptyContent: "No shippinges found"
        }}
        onClickCreate={onClickCreate}
        createText='Create new shipping'
        showPagination={false}
      />
    </div>
  )
}

export default ShippingListData
