import { fetchAllBrands } from "@/_actions"
import { CACHE_KEY } from "@/_constants"
import { Spinner } from "@nextui-org/react"
import dynamic from "next/dynamic"
import React from "react"
import { PageHeader } from "../_components"

const BrandListData = dynamic(() => import("./_components/BrandListData"), {
  ssr: false,
  loading: () => <Spinner />
})

const page = async () => {
  return (
    <div>
      <PageHeader title='All Brands' keyCache={CACHE_KEY.BRAND.GET_ALL} />
      <BrandListData />
    </div>
  )
}

export default page
