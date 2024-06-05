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
            className='hidden overflow-hidden object-contain md:block'
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
    case "updatedAt":
      return format(new Date(product.updatedAt || ""), "dd/MM/yyyy 'at' HH:mm")
    case "status":
      return product.status
    case "actions":
      return (
        <div className='flex items-center gap-1'>
          <Button
            isIconOnly
            variant='light'
            size='sm'
            color='primary'
            as={Link}
            href={CUSTOMER_ROUTES.PRODUCTS.ID.replace(":id", product?.slug!)}
            target='_blank'
          >
            <Eye size={20} />
          </Button>
          <Button
            isIconOnly
            variant='light'
            size='sm'
            color='primary'
            as={Link}
            href={APP_ROUTES.PRODUCTS.EDIT.replace(":id", product?._id!)}
          >
            <SquarePen size={20} />
          </Button>
          <Popover placement='right' isOpen={showPopover} onOpenChange={setShowPopover} showArrow>
            <PopoverTrigger>
              <Button isIconOnly variant='light' color='danger' size='sm' onClick={() => console.log("delete")}>
                <Trash2 size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className='space-y-2 self-end px-1 py-2'>
                <p className='font-bold'>Delete confirmation</p>
                <p>
                  Are you sure you want to delete <b>{product.name}</b> product?
                </p>
                <div className='flex justify-end space-x-2'>
                  <Button color='danger' onClick={onDelete} size='sm'>
                    {isLoading ? "Deleting..." : "Yes"}
                  </Button>
                  <Button color='default' onClick={() => setShowPopover(false)} size='sm'>
                    No
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )
    default:
      return <>{cellValue}</>
  }
}

export default RenderCellProduct
