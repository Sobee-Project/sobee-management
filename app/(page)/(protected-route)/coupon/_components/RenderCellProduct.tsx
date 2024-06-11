"use client"
import { deleteProduct } from "@/_actions"
import { APP_ROUTES, CUSTOMER_ROUTES, DEFAULT_IMAGE } from "@/_constants"
import { commaFormatter } from "@/_lib/_utils"
import { ICategory, IProduct } from "@/_lib/interfaces"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { format } from "date-fns"
import { Eye, SquarePen, Trash2 } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import Image from "next/image"
import Link from "next/link"
import { Key, useState } from "react"
import toast from "react-hot-toast"
import { ProductColumnKey } from "../_mock"

type Props = {
  product: IProduct
  columnKey: Key
}

const RenderCellProduct = ({ product, columnKey }: Props) => {
  const cellValue = product[columnKey as keyof IProduct]
  const [showPopover, setShowPopover] = useState(false)

  const { execute, status } = useAction(deleteProduct, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    }
  })
  const isLoading = status === "executing"

  const onDelete = () => {
    execute(product._id!)
  }

  const category = product.category as ICategory

  switch (columnKey as ProductColumnKey) {
    case "name":
      return (
        <div className='flex gap-2'>
          <Image
            src={product.thumbnail || DEFAULT_IMAGE}
            alt={product.name}
            width={50}
            height={50}
            className='hidden overflow-hidden bg-white object-contain md:block'
          />
          <div>
            <p className='line-clamp-1'>{product.name}</p>
            <p className='line-clamp-1 text-sm text-slate-500'>{category.name}</p>
          </div>
        </div>
      )
    case "price":
      return commaFormatter(product.displayPrice)
    case "type":
      return product.type
    case "quantity":
      return product.quantity
    default:
      return <>{cellValue}</>
  }
}

export default RenderCellProduct
