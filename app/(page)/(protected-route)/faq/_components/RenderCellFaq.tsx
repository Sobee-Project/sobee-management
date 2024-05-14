"use client"
import { deleteFaq } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { IFaq, IUser } from "@/_lib/interfaces"
import { Button, Link, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { format } from "date-fns"
import { Eye, SquarePen, Trash2 } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { Key, useState } from "react"
import toast from "react-hot-toast"
import { FaqColumnKey } from "../_mock"
import ViewFaqModal from "./ViewFaqModal"

type Props = {
    faq: IFaq
    columnKey: Key
}

const RenderCellFaq = ({ faq, columnKey }: Props) => {
    const cellValue = faq[columnKey as keyof IFaq]
    const [showPopover, setShowPopover] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const { execute, status } = useAction(deleteFaq, {
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
        execute(faq._id!)
        setShowPopover(false)
    }

    switch (columnKey as FaqColumnKey) {
        case "title":
            return <p>{faq.title}</p>
        case "description":
            return <p className='line-clamp-2 max-w-80'>{faq.description}</p>
        case "type":
            return <p>{faq.type}</p>
        case "issued_by.name":
            return (
                <p>
                    <span>By </span>
                    <span className='font-semibold'>{(faq.issued_by as IUser).name}</span>
                </p>
            )
        case "createdAt":
            return (
                <div className='flex flex-col gap-0.5'>
                    <p className='text-sm font-semibold'>{`${format(new Date(faq.createdAt as string), "dd/MM/yyyy ")}`}</p>
                    <p className='text-sm '>{`${format(new Date(faq.createdAt as string), "'At' h:mm a")}`}</p>
                </div>
            )
        case "actions":
            return (
                <div className='flex items-center gap-1'>
                    <Button
                        isIconOnly
                        variant='light'
                        size='sm'
                        color='success'
                        onClick={() => {
                            setShowModal(true)
                        }}
                    >
                        <Eye size={20} />
                    </Button>
                    {showModal && (
                        <ViewFaqModal
                            faq={faq}
                            modalProps={{
                                onClose: () => setShowModal(false),
                                isOpen: showModal
                            }}
                        />
                    )}
                    <Button
                        isIconOnly
                        variant='light'
                        size='sm'
                        color='primary'
                        as={Link}
                        href={APP_ROUTES.FAQS.EDIT.replace(":id", faq?._id!)}
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
                                    Are you sure you want to delete <b>this review</b> role?
                                </p>
                                <div className='flex justify-end space-x-2'>
                                    <Button
                                        color='danger'
                                        onClick={onDelete}
                                        size='sm'
                                        isLoading={isLoading}
                                        isDisabled={isLoading}
                                    >
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
export default RenderCellFaq
