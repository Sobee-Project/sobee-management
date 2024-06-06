import { fetchAllReviews, getReviewAnalytics } from "@/_actions"
import { CACHE_KEY } from "@/_constants"
import { Spinner } from "@nextui-org/react"
import { Metadata } from "next"
import dynamic from "next/dynamic"
import { PageHeader } from "../_components"
import AnalystBox from "./_components/AnalystBox"

const ReviewListData = dynamic(() => import("./_components/ReviewListData"), {
  ssr: false,
  loading: () => <Spinner />
})

export const metadata: Metadata = {
  title: "Reviews Panel",
  description: "Sobee Admin Panel"
}
const page = async () => {
  const data = await getReviewAnalytics()

  if (!data.success) {
    return <div>{data.message}</div>
  }

  return (
    <div>
      <PageHeader title='Reviews' keyCache={CACHE_KEY.REVIEW.GET_ALL} />
      <AnalystBox analytics={data.data!} />
      <ReviewListData />
    </div>
  )
}

export default page
