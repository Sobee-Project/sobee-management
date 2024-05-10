"use client"
import { deleteStaff } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { IRole, IStaff, IUser } from "@/_lib/interfaces"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { format } from "date-fns"
import { Eye, SquarePen, Trash2 } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import Image from "next/image"
import Link from "next/link"
import { Key, useState } from "react"
import toast from "react-hot-toast"
import { StaffColumnKey } from "../_mock"

type Props = {
    staff: IUser<IStaff>
    columnKey: Key
}

const RenderCellStaff = ({ staff, columnKey }: Props) => {
    const cellValue = staff[columnKey as keyof IUser]
    const [showPopover, setShowPopover] = useState(false)

    const { execute, status } = useAction(deleteStaff, {
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
        execute(staff._id!)
    }

    switch (columnKey as StaffColumnKey) {
        case "avatar":
            return (
                <Image
                    src={staff.avatar}
                    alt={staff.name}
                    width={50}
                    height={50}
                    className='rounded-full object-contain'
                />
            )
        case "email":
        case "name":
        case "phoneNumber":
            return staff[columnKey as keyof IUser] as string
        case "role":
            return ((staff._user as IStaff)?.staffRole as IRole)?.role_name ?? "N/A"
        case "identityCard":
            return (staff._user as IStaff)?.identityCard ?? "N/A"
        case "createdAt":
            return format(new Date(staff.createdAt!), "dd/MM/yyyy")
        case "dateOfBirth":
            return format(new Date(staff.dateOfBirth!), "dd/MM/yyyy")
        case "actions":
            return (
                <div className='flex items-center gap-1'>
                    <Button
                        isIconOnly
                        variant='light'
                        size='sm'
                        color='success'
                        as={Link}
                        href={APP_ROUTES.STAFF.ID.replace(":id", staff._id!)}
                    >
                        <Eye size={20} />
                    </Button>

                    <Button
                        isIconOnly
                        variant='light'
                        size='sm'
                        color='primary'
                        as={Link}
                        href={APP_ROUTES.STAFF.EDIT.replace(":id", staff._id!)}
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
                                    Are you sure you want to delete <b>{staff.name}</b> staff?
                                </p>
                                <div className='flex justify-end space-x-2'>
                                    <Button
                                        color='danger'
                                        onClick={onDelete}
                                        size='sm'
                                        isLoading={isLoading}
                                        isDisabled={isLoading}
                                    >
                                        {isLoading ? "Deleting staff..." : "Confirm"}
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

export default RenderCellStaff
