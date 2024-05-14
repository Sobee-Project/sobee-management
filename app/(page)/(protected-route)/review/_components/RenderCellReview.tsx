"use client"
import { deleteReview } from "@/_actions"
import { IProduct, IReview, IUser } from "@/_lib/interfaces"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { format } from "date-fns"
import { StarIcon, Trash2 } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { Key, useState } from "react"
import toast from "react-hot-toast"
import { ReviewColumnKey } from "../_mock"

type Props = {
    review: IReview
    columnKey: Key
}

const RenderCellReview = ({ columnKey, review }: Props) => {
    const [showPopover, setShowPopover] = useState(false)

    const { execute, status } = useAction(deleteReview, {
        onSuccess: () => {
            toast.success("Review deleted successfully")
        }
    })

    const isLoading = status === "executing"

    const cellValue = review[columnKey as keyof IReview]
    switch (columnKey as ReviewColumnKey) {
        case "title":
            return review.title
        case "content":
            return review.content
        case "rating":
            return (
                <div className='inline-flex shrink-0 items-center rounded-full border border-yellow-500 px-3 py-0.5 text-base text-yellow-500'>
                    {review.rating}
                    <StarIcon className='ms-1 size-3' />
                </div>
            )
        case "customer.name":
            return (
                <p>
                    <span>By </span>
                    <span className='font-semibold'>{(review.customer as IUser).name}</span>
                </p>
            )
        case "product.name":
            return (review.product as IProduct).name
        case "assets":
            return review.assets.length + " images"
        case "createdAt":
            return (
                <div className='flex flex-col gap-0.5'>
                    <p className='text-sm font-semibold'>{`${format(new Date(review.createdAt as string), "dd/MM/yyyy ")}`}</p>
                    <p className='text-sm '>{`${format(new Date(review.createdAt as string), "'At' h:mm a")}`}</p>
                </div>
            )
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
                                <p>
                                    Are you sure you want to delete <b>this review</b> role?
                                </p>
                                <div className='flex justify-end space-x-2'>
                                    <Button
                                        color='danger'
                                        onClick={() => {
                                            execute(review._id!)
                                            setShowPopover(false)
                                        }}
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
export default RenderCellReview
