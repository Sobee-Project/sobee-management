"use client"
import { deleteTerm } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { ITerm, IUser } from "@/_lib/interfaces"
import { Button, Chip, Link, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { format } from "date-fns"
import { CheckIcon, Eye, SquarePen, Trash2, X } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { Key, useState } from "react"
import toast from "react-hot-toast"
import { TermColumnKey } from "../_mock"
import ViewTermModal from "./ViewTermModal"

type Props = {
    term: ITerm
    columnKey: Key
}

const RenderCellTerm = ({ term, columnKey }: Props) => {
    const cellValue = term[columnKey as keyof ITerm]
    const [showPopover, setShowPopover] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const { execute, status } = useAction(deleteTerm, {
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
        execute(term._id!)
        setShowPopover(false)
    }

    switch (columnKey as TermColumnKey) {
        case "title":
            return <p>{term.title}</p>
        case "description":
            return <p className='line-clamp-2 max-w-80'>{term.description}</p>
        case "type":
            return <p>{term.type}</p>
        case "issued_by.name":
            return (
                <p>
                    <span>By </span>
                    <span className='font-semibold'>{(term.issued_by as IUser).name}</span>
                </p>
            )
        case "isApproved":
            return term.isApproved ? (
                <Chip color='success' variant='bordered' startContent={<CheckIcon size={18} />}>
                    Approved
                </Chip>
            ) : (
                <Chip color='warning' variant='bordered' startContent={<X size={18} />}>
                    Waiting for approval
                </Chip>
            )
        case "createdAt":
            return (
                <div className='flex flex-col gap-0.5'>
                    <p className='text-sm font-semibold'>{`${format(new Date(term.createdAt as string), "dd/MM/yyyy ")}`}</p>
                    <p className='text-sm '>{`${format(new Date(term.createdAt as string), "'At' h:mm a")}`}</p>
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
                        <ViewTermModal
                            term={term}
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
                        href={APP_ROUTES.TERMS_AND_CONDITIONS.EDIT.replace(":id", term?._id!)}
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
export default RenderCellTerm
