import { Progress } from "@nextui-org/react"
import SpringsNumber from "../../_components/animation/SpringsNumber"

const ReviewsRateItem = ({ rate = 0, value = 0 }) => {
    return (
        <div className='flex items-center gap-2.5'>
            <span className='label-text flex w-[30px] items-center gap-1 leading-none'>
                {rate} <i className='icon-star-solid text-yellow' />
            </span>
            <div className='flex-1'>
                <Progress value={value} color='warning' />
            </div>
            {/* <span className='!text-header label-text w-[42px] text-right'>{value}%</span> */}
            <SpringsNumber to={value} className='w-[42px] text-right !text-base' suffix='%' />
        </div>
    )
}

export default ReviewsRateItem
