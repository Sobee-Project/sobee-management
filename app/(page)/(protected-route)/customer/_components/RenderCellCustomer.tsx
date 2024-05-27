"use client"
import { deleteCustomer } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { ICustomer, IRole, IUser } from "@/_lib/interfaces"
import { Avatar, Button, Chip, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { format } from "date-fns"
import { CheckIcon, Eye, SquarePen, Trash2, X } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import Image from "next/image"
import Link from "next/link"
import { Key, useState } from "react"
import toast from "react-hot-toast"
import { CustomerColumnKey } from "../_mock"
import BanCustomerModal from "./BanCustomerModal"

type Props = {
  customer: IUser<ICustomer>
  columnKey: Key
}

const RenderCellCustomer = ({ customer, columnKey }: Props) => {
  const cellValue = customer[columnKey as keyof IUser]
  const [showPopover, setShowPopover] = useState(false)

  const { execute, status } = useAction(deleteCustomer, {
    onSuccess: ({ data }) => {
      if (data.success) {
        setShowPopover(false)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    }
  })

  const isLoading = status === "executing"

  const onDelete = () => {
    execute(customer._id!)
  }

  switch (columnKey as CustomerColumnKey) {
    case "name":
      return (
        <div className='flex items-center gap-2'>
          <Avatar src={customer.avatar} name={customer.name} size='sm' radius='full' />
          <span>{customer.name}</span>
        </div>
      )
    case "email":
    case "phoneNumber":
      return customer[columnKey as keyof IUser] as string
    case "_user.gender":
      return (customer._user as ICustomer).gender
    case "createdAt":
      return format(new Date(customer.createdAt!), "dd/MM/yyyy")
    case "dateOfBirth":
      return format(new Date(customer.dateOfBirth!), "dd/MM/yyyy")
    case "_user.isActive":
      return (customer._user as ICustomer).isActive ? (
        <Chip color='success' variant='bordered' startContent={<CheckIcon size={18} />}>
          Active
        </Chip>
      ) : (
        <Chip color='warning' variant='bordered' startContent={<X size={18} />}>
          Inactive
        </Chip>
      )
    case "actions":
      return (
        <div className='flex items-center gap-1'>
          <BanCustomerModal customer={customer} />

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
                  Are you sure you want to delete <b>{customer.name}</b> customer?
                </p>
                <div className='flex justify-end space-x-2'>
                  <Button color='danger' onClick={onDelete} size='sm' isLoading={isLoading} isDisabled={isLoading}>
                    {isLoading ? "Deleting customer..." : "Confirm"}
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
      return null
  }
}

export default RenderCellCustomer
