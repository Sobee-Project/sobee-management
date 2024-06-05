import { fetchPublishedProducts } from "@/_actions"
import { CACHE_KEY } from "@/_constants"
import { IProduct } from "@/_lib/interfaces"
import React from "react"
import { PageHeader } from "../_components"
import { ProductListData } from "./_components"

const page = async () => {
  let products = [] as IProduct[]
  const res = await fetchPublishedProducts()
  if (res.success) {
    products = res.data!
  }
  return (
    <div>
      <PageHeader title='Published Products' keyCache={CACHE_KEY.PRODUCT.GET_ALL} />
      <ProductListData data={products} paginationRes={res} />
    </div>
  )
}

export default page
