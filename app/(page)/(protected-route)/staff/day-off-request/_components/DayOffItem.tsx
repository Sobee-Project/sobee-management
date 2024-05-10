"use client"
import { deleteDayOff, updateDayOffStatus } from "@/_actions"
import { colorizeDayOffStatus } from "@/_lib/colorize"
import { EDayOffStatus } from "@/_lib/enums"
import { IDayOff, IUser } from "@/_lib/interfaces"
import { cn } from "@/_lib/utils"
import { Avatar, Button, Divider, Popover, PopoverContent, PopoverTrigger, Select, SelectItem } from "@nextui-org/react"
import { format } from "date-fns"
import { CircleHelp, Clock, Trash2Icon } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { Key, useMemo, useState } from "react"
import { Event } from "react-big-calendar"
import toast from "react-hot-toast"

type Props = {
    event: Event
}

const DayOffItem = ({ event }: Props) => {
    const dayOff = event.resource as IDayOff
    const staff = dayOff?.staff as IUser

    const [showPopover, setShowPopover] = useState(false)

    const { execute, status } = useAction(updateDayOffStatus, {
        onSuccess: ({ data }) => {
            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        }
    })

    const { execute: executeDelete, status: deleteStatus } = useAction(deleteDayOff, {
        onSuccess: ({ data }) => {
            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        }
    })

    const isLoading = status === "executing"
    const isDeleteLoading = deleteStatus === "executing"

    const onSelectionChange = (selectedKeys: Iterable<Key>) => {
        const status = Array.from(selectedKeys)[0] as EDayOffStatus
        execute({ _id: dayOff._id!, status })
    }

    const onDelete = () => {
        executeDelete(dayOff._id!)
    }

    const statusColor = useMemo(() => colorizeDayOffStatus(dayOff.status as EDayOffStatus, "bg"), [dayOff.status])

    const statuses = useMemo(() => Object.values(EDayOffStatus), [])

    return (
        <Popover>
            <PopoverTrigger>
                <div className={cn("cursor-pointer p-2", statusColor)}>
                    <div className='text-sm font-semibold text-white'>{staff?.name}</div>
                    <div className='line-clamp-1 text-xs text-gray-200'>{dayOff?.reason}</div>
                </div>
            </PopoverTrigger>
            <PopoverContent className='px-0'>
                <div className='flex flex-col gap-2 p-4'>
                    <div className='flex items-center gap-2'>
                        <Avatar src={staff?.avatar} size='sm' />
                        <div className='text-sm font-semibold'>{staff?.name}</div>
                    </div>
                    <div className='ml-2 flex items-center gap-2'>
                        <Clock size={12} />
                        <p className='text-sm text-slate-500'>
                            {format(new Date(dayOff.startDate), "HH:mm dd/MM/yyyy")} -{" "}
                            {format(new Date(dayOff.endDate), "HH:mm dd/MM/yyyy")}
                        </p>
                    </div>
                    <div className='ml-2 flex items-center gap-2'>
                        <CircleHelp size={12} />
                        <p className='text-sm text-slate-500'>{dayOff?.reason}</p>
                    </div>
                </div>
                <Divider />
                <div className='flex w-full gap-2 p-4'>
                    <Select
                        isLoading={isLoading}
                        className='flex-1'
                        size='sm'
                        placeholder='Change status'
                        defaultSelectedKeys={[dayOff.status || EDayOffStatus.PENDING]}
                        onSelectionChange={onSelectionChange}
                        isDisabled={isLoading || isDeleteLoading}
                    >
                        {statuses.map((status) => (
                            <SelectItem key={status} value={status}>
                                {status}
                            </SelectItem>
                        ))}
                    </Select>
                    <Popover isOpen={showPopover} onOpenChange={setShowPopover} placement='right' showArrow>
                        <PopoverTrigger>
                            <Button
                                size='sm'
                                color='danger'
                                isIconOnly
                                isDisabled={isLoading || isDeleteLoading}
                                isLoading={isDeleteLoading}
                            >
                                <Trash2Icon size={16} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className='space-y-2 self-end px-1 py-2'>
                                <p className='font-bold'>Delete confirmation</p>
                                <p>Are you sure you want to delete this?</p>
                                <div className='flex justify-end space-x-2'>
                                    <Button
                                        color='danger'
                                        onClick={onDelete}
                                        size='sm'
                                        isLoading={isDeleteLoading}
                                        isDisabled={isDeleteLoading}
                                    >
                                        {isDeleteLoading ? "Deleting..." : "Confirm"}
                                    </Button>
                                    <Button color='default' onClick={() => setShowPopover(false)} size='sm'>
                                        No
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default DayOffItem
