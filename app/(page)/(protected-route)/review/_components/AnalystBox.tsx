"use client"
import { IReview } from "@/_lib/interfaces"
import { ReviewAnalytics } from "@/_lib/types"
import { StarIcon } from "lucide-react"
import InfoBox from "./InfoBox"
import ReviewsRate from "./ReviewsRate"

type AnalystBoxProps = {
  analytics: ReviewAnalytics
}

const AnalystBox = ({ analytics }: AnalystBoxProps) => {
  const { averageRating, byRating, lastWeekReview, totalRating } = analytics
  return (
    <div className='mb-4 grid gap-y-5 md:grid-cols-2 md:gap-x-[26px]'>
      <InfoBox Icon={StarIcon} value={totalRating} label='Total Reviews' />
      <ReviewsRate data={byRating} />
    </div>
  )
}
export default AnalystBox
