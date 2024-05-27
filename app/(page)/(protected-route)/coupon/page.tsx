import { fetchAllCoupons } from "@/_actions"
import React from "react"
import { CouponListData } from "./_components"

const page = async () => {
  const res = await fetchAllCoupons()

  return (
    <div>
      <CouponListData data={res.data!} />
    </div>
  )
}

export default page
