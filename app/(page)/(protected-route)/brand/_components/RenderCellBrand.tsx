"use client"

import { deleteBrand } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { IBrand } from "@/_lib/interfaces"
import { Button, Chip, Link, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { format } from "date-fns"
import { CheckIcon, SquarePen, Trash2, X } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import Image from "next/image"
import NextLink from "next/link"
import { Key, useState } from "react"
import toast from "react-hot-toast"
import { BrandColumnKey } from "../_mock"

type Props = {
  brand: IBrand
  columnKey: Key
}

const RenderCellBrand = ({ brand, columnKey }: Props) => {
  const cellValue = brand[columnKey as keyof IBrand]
  const [showPopover, setShowPopover] = useState(false)

  const { execute, status } = useAction(deleteBrand, {
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
    execute(brand._id!)
    setShowPopover(false)
  }

  switch (columnKey as BrandColumnKey) {
    case "name":
      return <p>{brand.name}</p>
    case "logo":
      return (
        <Image
          src={brand.logo}
          alt={brand.name}
          width={72}
          height={72}
          objectFit='cover'
          onError={(e) => {
            e.currentTarget.src =
              "https://res.cloudinary.com/dtfkou1of/image/upload/v1715627220/sobee-storage/image/default_image.jpg"
          }}
          className='inline-flex rounded-md bg-gray-200'
        />
      )
    case "isActive":
      return brand.isActive ? (
        <Chip color='success' variant='bordered' startContent={<CheckIcon size={18} />}>
          Active
        </Chip>
      ) : (
        <Chip color='warning' variant='bordered' startContent={<X size={18} />}>
          Inactive
        </Chip>
      )
    case "website":
      return (
        <Link href={brand.website} isExternal showAnchorIcon color='primary' className='text-sm'>
          Visit Website
        </Link>
      )
    case "products":
      return brand.productCount || 0
    case "createdAt":
      return (
        <div className='flex flex-col gap-0.5'>
          <p className='text-sm font-semibold'>{`${format(new Date(brand.createdAt as string), "dd/MM/yyyy ")}`}</p>
          <p className='text-sm '>{`${format(new Date(brand.createdAt as string), "'At' h:mm a")}`}</p>
        </div>
      )
    case "actions":
      return (
        <div className='flex items-center gap-1'>
          <Button
            isIconOnly
            variant='light'
            size='sm'
            color='primary'
            as={NextLink}
            href={APP_ROUTES.BRANDS.EDIT.replace(":id", brand?._id!)}
          >
            <SquarePen size={20} />
          </Button>
          <Popover placement='right' isOpen={showPopover} onOpenChange={setShowPopover} showArrow>
            <PopoverTrigger>
              <Button isIconOnly variant='light' color='danger' size='sm'>
                <Trash2 size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className='space-y-2 self-end px-1 py-2'>
                <p className='font-bold'>Delete confirmation</p>
                <p>
                  Are you sure you want to delete <b>{brand.name}</b> brand?
                </p>
                <div className='flex justify-end space-x-2'>
                  <Button color='danger' onClick={onDelete} size='sm' isLoading={isLoading} isDisabled={isLoading}>
                    {isLoading ? "Deleting review..." : "Confirm"}
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
export default RenderCellBrand
