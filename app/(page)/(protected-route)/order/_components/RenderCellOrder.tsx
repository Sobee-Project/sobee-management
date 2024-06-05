"use client"

import { APP_ROUTES } from "@/_constants"
import { formatCurrency } from "@/_lib/_utils"
import { IOrder, IUser } from "@/_lib/interfaces"
import { Avatar, Button } from "@nextui-org/react"
import { format } from "date-fns"
import { Eye } from "lucide-react"
import NextLink from "next/link"
import { Key } from "react"
import { OrderColumnKey } from "../_mock"

type Props = {
  order: IOrder
  columnKey: Key
}

const RenderCellOrder = ({ order, columnKey }: Props) => {
  const cellValue = order[columnKey as keyof IOrder]

  const customer = order.customer as IUser

  switch (columnKey as OrderColumnKey) {
    case "trackingNumber":
      return <p>{order.orderGeneratedId}</p>
    case "orderDate":
      return (
        <div className='flex flex-col gap-0.5'>
          <p className='text-sm font-semibold'>{`${format(new Date(order.createdAt as string), "dd/MM/yyyy ")}`}</p>
          <p className='text-sm '>{`${format(new Date(order.createdAt as string), "'At' h:mm a")}`}</p>
        </div>
      )
    case "customer":
      return (
        <div className='flex items-center gap-2'>
          <Avatar src={customer.avatar} name={customer.name} size='sm' radius='full' showFallback />
          <div className='flex flex-col'>
            <span>{customer.name}</span>
            <span className='text-sm text-foreground-500'>{order.phoneNumber}</span>
          </div>
        </div>
      )
    case "products":
      return order.orderItems.length
    case "total":
      return formatCurrency(order.total)
    case "shippingFee":
      return formatCurrency(order.shippingFee)
    case "actions":
      return (
        <div className='flex items-center gap-1'>
          <Button
            isIconOnly
            variant='light'
            size='sm'
            color='primary'
            as={NextLink}
            href={APP_ROUTES.ORDERS.ID.replace(":id", order?._id!)}
          >
            <Eye size={20} />
          </Button>
        </div>
      )
    default:
      return <>{cellValue}</>
  }
}
export default RenderCellOrder
