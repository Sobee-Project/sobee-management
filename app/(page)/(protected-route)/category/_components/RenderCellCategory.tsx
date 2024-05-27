"use client"
import { deleteCategory } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { ICategory } from "@/_lib/interfaces"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { SquarePen, Trash2 } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import Link from "next/link"
import { Key, useState } from "react"
import toast from "react-hot-toast"
import { CategoryColumnKey } from "../_mock"

type Props = {
  category: ICategory
  columnKey: Key
}

const RenderCellCategory = ({ category, columnKey }: Props) => {
  const cellValue = category[columnKey as keyof ICategory]
  const [showPopover, setShowPopover] = useState(false)

  const { execute, status } = useAction(deleteCategory, {
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
    execute(category._id!)
  }

  switch (columnKey as CategoryColumnKey) {
    case "name":
      return category.name
    case "slug":
      return category.slug
    case "description":
      return category.description || "N/A"
    case "actions":
      return (
        <div className='flex items-center gap-1'>
          <Button
            isIconOnly
            variant='light'
            size='sm'
            color='primary'
            as={Link}
            href={APP_ROUTES.CATEGORIES.EDIT.replace(":id", category?._id!)}
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
                  Are you sure you want to delete <b>{category.name}</b> category?
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

export default RenderCellCategory
