import { fetchAllTaxes } from "@/_actions"
import { CACHE_KEY } from "@/_constants"
import { redirect } from "next/navigation"
import React from "react"
import { PageHeader } from "../_components"
import { TaxListData } from "./_components"

const page = async () => {
  const res = await fetchAllTaxes()
  return (
    <div>
      <PageHeader title='Taxes' keyCache={CACHE_KEY.TAX.GET_ALL} />
      <TaxListData data={res.data!} />
    </div>
  )
}

export default page
