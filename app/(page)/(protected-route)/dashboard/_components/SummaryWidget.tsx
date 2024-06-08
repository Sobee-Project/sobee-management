import { numFormatter } from "@/_lib/_utils"
import { ISummaryAnalytics } from "@/_lib/interfaces"
import StickerCard from "./StickerCard"
import { ChecklistIcon, CustomersIcon, EaringIcon, ProductsIcon } from "./icons"

type Props = {
  data: ISummaryAnalytics
}

const SummaryWidget = ({ data }: Props) => {
  return (
    <div className=' col-span-full rounded-lg border border-foreground-300 md:p-7'>
      <div className='mb-5 flex items-center justify-between md:mb-7'>
        <h3 className='relative mt-1 text-lg font-semibold text-gray-800 before:absolute before:-left-6 before:-top-px before:h-7 before:w-1 before:rounded-r-md before:bg-primary-500 before:content-[""] dark:text-gray-200 dark:before:bg-primary-600 md:before:-left-6 md:before:-top-0.5 lg:before:h-8'>
          Summary
        </h3>
      </div>

      <div className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4'>
        <StickerCard
          title='Total Earnings'
          icon={<EaringIcon className='size-8' />}
          color='#1EAE98'
          value={numFormatter(data.totalRevenue, 2, "$", "")}
        />
        <StickerCard
          title='Total Orders'
          icon={<ChecklistIcon className='size-8' />}
          color='#865DFF'
          value={numFormatter(data.totalOrders, 2)}
        />
        <StickerCard
          title='Total Customers'
          icon={<CustomersIcon className='size-8' />}
          color='#D74EFF'
          value={data.totalCustomers}
          isSpring={true}
        />
        <StickerCard
          title='Total Products'
          icon={<ProductsIcon className='size-8' />}
          color='#E157A0'
          value={data.totalProducts}
          isSpring={true}
        />
      </div>
    </div>
  )
}
export default SummaryWidget
