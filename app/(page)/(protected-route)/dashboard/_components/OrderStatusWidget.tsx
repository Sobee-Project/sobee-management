import { EOrderStatus } from "@/_lib/enums"
import { ITotalOrderByStatus } from "@/_lib/interfaces"
import { Clock } from "lucide-react"
import { Fragment } from "react"
import StickerCard from "./StickerCard"
import { CancelIcon, OrderProcessedIcon } from "./icons"
import { DeliverIcon } from "./icons/DeliverIcon"

type Props = {
  data: ITotalOrderByStatus
}

const OrderStatusWidget = ({ data }: Props) => {
  const widgetContents = [
    {
      key: EOrderStatus.PENDING,
      title: "Pending Orders",
      icon: <Clock className='size-8' />,
      color: "#FFA500",
      value: data?.pending || 0,
      isSpring: true
    },
    {
      key: EOrderStatus.DELIVERING,
      title: "Processing Orders",
      icon: <DeliverIcon className='size-8' />,
      color: "#ACE6F6",
      value: data?.delivering + data.pickingUp || 0,
      isSpring: true
    },
    {
      key: EOrderStatus.COMPLETED,
      title: "Completed Orders",
      icon: <OrderProcessedIcon className='size-8' />,
      color: "#A1DD70",
      value: data?.completed + data.delivered || 0,
      isSpring: true
    },
    {
      key: EOrderStatus.CANCELED,
      title: "Cancelled Orders",
      icon: <CancelIcon className='size-8' />,
      color: "#EE4E4E",
      value: data?.canceled || 0,
      isSpring: true
    }
  ]
  return (
    <Fragment>
      <div className='mt-5 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4'>
        {widgetContents && widgetContents.length > 0
          ? widgetContents.map((content) => {
              return (
                <div className='w-full' key={content?.key}>
                  <StickerCard
                    title={content?.title}
                    icon={content?.icon}
                    color={content?.color}
                    value={content?.value}
                    isSpring={content?.isSpring}
                  />
                </div>
              )
            })
          : ""}
      </div>
    </Fragment>
  )
}
export default OrderStatusWidget
