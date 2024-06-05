import { fetchAllCoupons } from "@/_actions"
import { CACHE_KEY } from "@/_constants"
import React from "react"
import { PageHeader } from "../_components"
import { CouponListData } from "./_components"

const page = async () => {
  const res = await fetchAllCoupons()

  return (
    <div>
      <PageHeader title='All Coupons' keyCache={CACHE_KEY.COUPON.GET_ALL} />
      <CouponListData data={res.data!} />
    </div>
  )
}

export default page
