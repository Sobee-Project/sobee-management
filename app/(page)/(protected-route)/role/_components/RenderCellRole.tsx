"use client"
import { deleteRole } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { IRole } from "@/_lib/interfaces"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { Eye, SquarePen, Trash2 } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import Link from "next/link"
import { Key, useState } from "react"
import toast from "react-hot-toast"
import { RoleColumnKey } from "../_mock"

type Props = {
  role: IRole
  columnKey: Key
}

const RenderCellRole = ({ role, columnKey }: Props) => {
  const cellValue = role[columnKey as keyof IRole]
  const [showPopover, setShowPopover] = useState(false)

  const { execute, status } = useAction(deleteRole, {
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
    execute(role._id!)
  }

  switch (columnKey as RoleColumnKey) {
    case "role_name":
      return role.role_name
    case "grant_lists":
      return (
        <ul className='list-disc'>
          {role.grant_lists.map((grant) => (
            <li key={grant._id}>
              <p>
                {grant.resource} ({grant.actions.join(", ")})
              </p>
            </li>
          ))}
        </ul>
      )
    case "actions":
      return (
        <div className='flex items-center gap-1'>
          <Button
            isIconOnly
            variant='light'
            size='sm'
            color='success'
            as={Link}
            href={APP_ROUTES.ROLES.ID.replace(":id", role._id!)}
          >
            <Eye size={20} />
          </Button>

          <Button
            isIconOnly
            variant='light'
            size='sm'
            color='primary'
            as={Link}
            href={APP_ROUTES.ROLES.EDIT.replace(":id", role._id!)}
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
                  Are you sure you want to delete <b>{role.role_name}</b> role?
                </p>
                <div className='flex justify-end space-x-2'>
                  <Button color='danger' onClick={onDelete} size='sm' isLoading={isLoading} isDisabled={isLoading}>
                    {isLoading ? "Deleting role..." : "Confirm"}
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

export default RenderCellRole
