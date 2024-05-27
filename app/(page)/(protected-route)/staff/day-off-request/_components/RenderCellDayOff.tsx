"use client"
import { deleteDayOff } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { colorizeDayOffStatus } from "@/_lib/colorize"
import { IDayOff, IUser } from "@/_lib/interfaces"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { format } from "date-fns"
import { Trash2 } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import Link from "next/link"
import { Key, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { DayOffColumnKey } from "../_mock"

type Props = {
  dayOff: IDayOff
  columnKey: Key
}

const RenderCellDayOff = ({ dayOff, columnKey }: Props) => {
  const cellValue = dayOff[columnKey as keyof IDayOff]
  const staff = dayOff.staff as IUser
  const [showPopover, setShowPopover] = useState(false)

  const { execute, status } = useAction(deleteDayOff, {
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
    execute(dayOff._id!)
  }

  const colorizeStatus = useMemo(() => colorizeDayOffStatus(dayOff.status!), [dayOff.status])

  switch (columnKey as DayOffColumnKey) {
    case "staff.name":
      return <Link href={APP_ROUTES.STAFF.ID.replace(":id", staff._id!)}>{staff.name}</Link>
    case "reason":
      return dayOff.reason
    case "startDate":
      return format(new Date(dayOff.startDate), "dd/MM/yyyy 'at' HH:mm")
    case "endDate":
      return format(new Date(dayOff.endDate), "dd/MM/yyyy 'at' HH:mm")
    case "createdAt":
      return format(new Date(dayOff.createdAt || new Date()), "dd/MM/yyyy 'at' HH:mm")
    case "status":
      return <span className={colorizeStatus}>{dayOff.status}</span>
    case "actions":
      return (
        <div className='flex items-center gap-1'>
          <Popover placement='right' isOpen={showPopover} onOpenChange={setShowPopover} showArrow>
            <PopoverTrigger>
              <Button isIconOnly variant='light' color='danger' size='sm'>
                <Trash2 size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className='space-y-2 self-end px-1 py-2'>
                <p className='font-bold'>Delete confirmation</p>
                <p>Are you sure you want to delete this?</p>
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

export default RenderCellDayOff
