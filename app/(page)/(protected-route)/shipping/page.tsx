import { fetchAllShippings } from "@/_actions"
import { CACHE_KEY } from "@/_constants"
import { redirect } from "next/navigation"
import React from "react"
import { PageHeader } from "../_components"
import { ShippingListData } from "./_components"

const page = async () => {
  const res = await fetchAllShippings()
  return (
    <div>
      <PageHeader title='Shippings' keyCache={CACHE_KEY.SHIPPING.GET_ALL} />
      <ShippingListData data={res.data!} />
    </div>
  )
}

export default page
