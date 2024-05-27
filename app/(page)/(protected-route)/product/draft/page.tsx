import { fetchDraftProducts } from "@/_actions"
import { CACHE_KEY } from "@/_constants"
import { IProduct } from "@/_lib/interfaces"
import { PageHeader } from "../../_components"
import { ProductListData } from "../_components"

const page = async () => {
  let products = [] as IProduct[]
  const res = await fetchDraftProducts()
  if (res.success) {
    products = res.data!
  }
  return (
    <div>
      <PageHeader title='Draft Products' keyCache={CACHE_KEY.PRODUCT.GET_ALL} />
      <ProductListData data={products} />
    </div>
  )
}

export default page
