import { fetchAllCustomer } from "@/_actions"
import { CACHE_KEY } from "@/_constants"
import React from "react"
import { PageHeader } from "../_components"
import { CustomerListData } from "./_components"

const page = async () => {
  const res = await fetchAllCustomer()

  const data = res.data!
  return (
    <div>
      <PageHeader title='All Customers' keyCache={CACHE_KEY.CUSTOMER.GET_ALL} />
      <CustomerListData data={data} />
    </div>
  )
}

export default page
