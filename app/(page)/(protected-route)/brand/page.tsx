import { fetchAllBrands } from "@/_actions"
import { CACHE_KEY } from "@/_constants"
import React from "react"
import { PageHeader } from "../_components"
import { BrandListData } from "./_components"

const page = async () => {
  const res = await fetchAllBrands()

  return (
    <div>
      <PageHeader title='All Brands' keyCache={CACHE_KEY.BRAND.GET_ALL} />
      <BrandListData data={res.data!} paginationRes={res} />
    </div>
  )
}

export default page
