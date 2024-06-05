import { fetchAllCategories, fetchAllTaxes } from "@/_actions"
import { CACHE_KEY } from "@/_constants"
import { redirect } from "next/navigation"
import React from "react"
import { PageHeader } from "../_components"
import { CategoryListData } from "./_components"

const page = async () => {
  const res = await fetchAllCategories()
  return (
    <div>
      <PageHeader title='All Categories' keyCache={CACHE_KEY.CATEGORY.GET_ALL} />
      <CategoryListData data={res.data!} paginationRes={res} />
    </div>
  )
}

export default page
