import { fetchAllOrders } from "@/_actions"
import { CACHE_KEY } from "@/_constants"
import { Spinner } from "@nextui-org/react"
import dynamic from "next/dynamic"
import React from "react"
import { PageHeader } from "../_components"

const OrderListData = dynamic(() => import("./_components/OrderListData"), {
  ssr: false,
  loading: () => <Spinner />
})

const page = async () => {
  return (
    <div>
      <PageHeader title='All Orders' keyCache={CACHE_KEY.ORDER.GET_ALL} />
      <OrderListData />
    </div>
  )
}

export default page
