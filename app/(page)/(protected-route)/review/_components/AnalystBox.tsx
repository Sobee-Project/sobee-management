"use client"
import { StarIcon } from "lucide-react"
import InfoBox from "./InfoBox"
import ReviewsRate from "./ReviewsRate"

const AnalystBox = () => {
    return (
        <div className='mb-4 grid grid-cols-1 gap-y-5 md:gap-y-[26px] xl:grid-cols-6 xl:gap-x-[26px]'>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-1 xl:col-span-4'>
                <InfoBox Icon={StarIcon} value={121} label='Total Reviews' />
            </div>
            <ReviewsRate />
        </div>
    )
}
export default AnalystBox
