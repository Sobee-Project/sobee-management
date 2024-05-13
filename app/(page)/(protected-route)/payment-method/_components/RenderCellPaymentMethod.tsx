"use client"
import { deletePaymentMethod } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { IPaymentMethod } from "@/_lib/interfaces"
import { Avatar, Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { SquarePen, Trash2 } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import Image from "next/image"
import Link from "next/link"
import { Key, useState } from "react"
import toast from "react-hot-toast"
import { PaymentMethodColumnKey } from "../_mock"

type Props = {
    paymentMethod: IPaymentMethod
    columnKey: Key
}

const RenderCellPaymentMethod = ({ paymentMethod, columnKey }: Props) => {
    const cellValue = paymentMethod[columnKey as keyof IPaymentMethod]
    const [showPopover, setShowPopover] = useState(false)

    const { execute, status } = useAction(deletePaymentMethod, {
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
        execute(paymentMethod._id!)
    }

    switch (columnKey as PaymentMethodColumnKey) {
        case "name":
            return paymentMethod.name
        case "image":
            return (
                <Image
                    src={paymentMethod.image || "/logo.svg"}
                    alt={paymentMethod.name}
                    width={50}
                    height={50}
                    className='rounded-full'
                />
            )
        case "actions":
            return (
                <div className='flex items-center gap-1'>
                    <Button
                        isIconOnly
                        variant='light'
                        size='sm'
                        color='primary'
                        as={Link}
                        href={APP_ROUTES.PAYMENT_METHODS.EDIT.replace(":id", paymentMethod?._id!)}
                    >
                        <SquarePen size={20} />
                    </Button>
                    <Popover placement='right' isOpen={showPopover} onOpenChange={setShowPopover} showArrow>
                        <PopoverTrigger>
                            <Button
                                isIconOnly
                                variant='light'
                                color='danger'
                                size='sm'
                                onClick={() => console.log("delete")}
                            >
                                <Trash2 size={20} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className='space-y-2 self-end px-1 py-2'>
                                <p className='font-bold'>Delete confirmation</p>
                                <p>
                                    Are you sure you want to delete <b>{paymentMethod.name}</b> paymentMethod?
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
            return <>{cellValue ?? ""}</>
    }
}

export default RenderCellPaymentMethod
