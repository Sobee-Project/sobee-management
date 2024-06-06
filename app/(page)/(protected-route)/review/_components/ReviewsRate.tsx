import ReviewsRateItem from "./ReviewsRateItem"

const getPercentage = (arr: any, value: any) => {
  const total = arr.reduce((acc: any, item: any) => acc + item.count, 0)
  return Math.round((value / total) * 100)
}

type Props = {
  data: { rating: number; count: number }[]
}

const ReviewsRate = ({ data }: Props) => {
  const fillLackDataRating = Array.from({ length: 5 }, (_, index) => {
    const currData = data.find((item) => item.rating === index + 1)
    return currData ? currData : { rating: index + 1, count: 0 }
  })

  console.log({ fillLackDataRating })

  return (
    <div className='col-span-1 flex min-h-[182px] flex-col justify-between rounded-lg bg-background p-3 shadow-medium'>
      {fillLackDataRating.map((item, index) => (
        <ReviewsRateItem key={index} rate={item.rating} value={getPercentage(fillLackDataRating, item.count)} />
      ))}
    </div>
  )
}

export default ReviewsRate
