"use client"
import { deleteTax } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { ITax } from "@/_lib/interfaces"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { SquarePen, Trash2 } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import Link from "next/link"
import { Key, useState } from "react"
import toast from "react-hot-toast"
import { TaxColumnKey } from "../_mock"

type Props = {
  tax: ITax
  columnKey: Key
}

const RenderCellTax = ({ tax, columnKey }: Props) => {
  const cellValue = tax[columnKey as keyof ITax]
  const [showPopover, setShowPopover] = useState(false)

  const { execute, status } = useAction(deleteTax, {
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
    execute(tax._id!)
  }

  switch (columnKey as TaxColumnKey) {
    case "name":
      return tax.name
    case "rate":
      return tax.rate
    case "country":
      return tax.country
    case "city":
      return tax.city
    case "state":
      return tax.state
    case "zip":
      return tax.zip
    case "actions":
      return (
        <div className='flex items-center gap-1'>
          <Button
            isIconOnly
            variant='light'
            size='sm'
            color='primary'
            as={Link}
            href={APP_ROUTES.TAXES.EDIT.replace(":id", tax?._id!)}
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
                  Are you sure you want to delete <b>{tax.name}</b> tax?
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

export default RenderCellTax
