"use client"
import { CustomTable } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { ICoupon } from "@/_lib/interfaces"
import { useRouter } from "next/navigation"
import { couponColumns } from "../_mock"
import RenderCellCoupon from "./RenderCellCoupon"

type Props = {
  data: ICoupon[]
}

const CouponListData = ({ data: couponList }: Props) => {
  const router = useRouter()

  const onClickCreate = () => {
    router.push(APP_ROUTES.COUPONS.NEW)
  }
  return (
    <CustomTable
      dataSource={couponList || []}
      columns={couponColumns}
      RenderCell={(coupon, columnKey) => <RenderCellCoupon coupon={coupon} columnKey={columnKey} />}
      searchKeys={["code"]}
      searchPlaceholder='Search coupons...'
      bodyProps={{
        emptyContent: "No data found"
      }}
      csvData={couponList}
      onClickCreate={onClickCreate}
      createText='Create new coupon'
    />
  )
}
export default CouponListData
