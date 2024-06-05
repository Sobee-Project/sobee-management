import { fetchAllOrders } from "@/_actions"
import { CACHE_KEY } from "@/_constants"
import React from "react"
import { PageHeader } from "../_components"
import { OrderListData } from "./_components"

const page = async () => {
  const res = await fetchAllOrders()

  return (
    <div>
      <PageHeader title='All Orders' keyCache={CACHE_KEY.ORDER.GET_ALL} />
      <OrderListData data={res.data!} paginationRes={res} />
    </div>
  )
}

export default page
