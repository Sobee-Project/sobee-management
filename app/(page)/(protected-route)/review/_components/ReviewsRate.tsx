import ReviewsRateItem from "./ReviewsRateItem"

const data = [
  { rate: 5, value: 2568 },
  { rate: 4, value: 3568 },
  { rate: 3, value: 1568 },
  { rate: 2, value: 0 },
  { rate: 1, value: 568 }
]
const getPercentage = (arr: any, value: any) => {
  const total = arr.reduce((acc: any, item: any) => acc + item.value, 0)
  return Math.round((value / total) * 100)
}

const ReviewsRate = () => {
  return (
    <div className='col-span-2 flex min-h-[182px] flex-col justify-between rounded-lg bg-background p-3 shadow-medium'>
      {data.map((item, index) => (
        <ReviewsRateItem key={index} rate={item.rate} value={getPercentage(data, item.value)} />
      ))}
    </div>
  )
}

export default ReviewsRate
