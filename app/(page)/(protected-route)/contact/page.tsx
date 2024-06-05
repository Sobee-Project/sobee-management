import { CACHE_KEY } from "@/_constants"
import React from "react"
import { PageHeader } from "../_components"

const page = () => {
  return (
    <div>
      <PageHeader title='Order Contact' keyCache={CACHE_KEY.ORDER.GET_ALL} />
    </div>
  )
}

export default page
