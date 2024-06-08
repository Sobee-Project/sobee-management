import { fetchBestSellerProducts, fetchPopularProducts, fetchSummaryAnalytics } from "@/_actions"
import { Spinner } from "@nextui-org/react"
import dynamic from "next/dynamic"
import React from "react"
import { BestSellerProducts, PopularProducts, SummaryWidget } from "./_components"
import OrderAnalytics from "./_components/OrderAnalytics"

const SectionOrderStatus = dynamic(() => import("./_components/SectionOrderStatus"), {
  ssr: false,
  loading: () => <Spinner />
})

const page = async () => {
  const summaryData = await fetchSummaryAnalytics()
  const popularProductsData = await fetchPopularProducts()
  const bestSellerProductsData = await fetchBestSellerProducts()

  return (
    <div className='mb-10 grid gap-7 md:gap-8 lg:grid-cols-2 2xl:grid-cols-12'>
      <SummaryWidget data={summaryData.data!} />
      <SectionOrderStatus />
      <div className='lg:col-span-full 2xl:col-span-8'>
        <OrderAnalytics />
      </div>

      <BestSellerProducts products={bestSellerProductsData.data!} />
      <PopularProducts products={popularProductsData.data!} />
    </div>
  )
}

export default page
