"use client"
import { CustomTable } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { IBrand } from "@/_lib/interfaces"
import { useRouter } from "next/navigation"
import { brandColumns } from "../_mock"
import RenderCellBrand from "./RenderCellBrand"

type Props = {
  data: IBrand[]
}

const BrandListData = ({ data: brandList }: Props) => {
  const router = useRouter()

  const onClickCreate = () => {
    router.push(APP_ROUTES.BRANDS.NEW)
  }
  return (
    <CustomTable
      dataSource={brandList || []}
      columns={brandColumns}
      RenderCell={(brand, columnKey) => <RenderCellBrand brand={brand} columnKey={columnKey} />}
      searchKeys={["name"]}
      searchPlaceholder='Search brands...'
      bodyProps={{
        emptyContent: "No data found"
      }}
      csvData={brandList}
      onClickCreate={onClickCreate}
      createText='Create new brand'
    />
  )
}
export default BrandListData
