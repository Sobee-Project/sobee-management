import { fetchAllReviews } from "@/_actions"
import { CACHE_KEY } from "@/_constants"
import { Metadata } from "next"
import PageHeader from "../_components/PageHeader"
import AnalystBox from "./_components/AnalystBox"
import ReviewListData from "./_components/ReviewListData"

export const metadata: Metadata = {
  title: "Reviews Panel",
  description: "Sobee Admin Panel"
}
const page = async () => {
  const res = await fetchAllReviews()
  return (
    <div>
      <PageHeader title='Reviews' keyCache={CACHE_KEY.REVIEW.GET_ALL} />
      <AnalystBox />
      <ReviewListData data={res.data!} />
    </div>
  )
}

export default page
