import { fetchAllStaff } from "@/_actions"
import { CACHE_KEY } from "@/_constants"
import React from "react"
import { PageHeader } from "../_components"
import { StaffListData } from "./_components"

const page = async () => {
  const res = await fetchAllStaff()

  const data = res.data!
  return (
    <div>
      <PageHeader title='Staff' keyCache={CACHE_KEY.STAFF.GET_ALL} />
      <StaffListData data={data} />
    </div>
  )
}

export default page
