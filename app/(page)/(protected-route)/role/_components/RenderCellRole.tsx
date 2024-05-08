"use client"
import { IRole } from "@/_lib/interfaces"
import { useDeleteRoleMutation } from "@/_services"
import { Button, Popover, PopoverContent, PopoverTrigger, Spinner } from "@nextui-org/react"
import { Eye, SquarePen, Trash2 } from "lucide-react"
import dynamic from "next/dynamic"
import { Key, useState } from "react"
import toast from "react-hot-toast"
import { RoleColumnKey } from "../_mock"

const ViewRoleModal = dynamic(() => import("./RoleModal"), {
    ssr: false,
    loading: () => <Spinner size='sm' />
})

type Props = {
    role: IRole
    columnKey: Key
}

const RenderCellRole = ({ role, columnKey }: Props) => {
    const cellValue = role[columnKey as keyof IRole]
    const deleteRoleMutation = useDeleteRoleMutation()
    const [showPopover, setShowPopover] = useState(false)
    const [showModal, setShowModal] = useState<"edit" | "view" | null>(null)

    const onDelete = () => {
        deleteRoleMutation.mutate(role._id!, {
            onSuccess: (response) => {
                setShowPopover(false)
                toast.success(response.data.message)
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Failed to delete role")
            }
        })
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
                    <Button isIconOnly variant='light' size='sm' color='success' onClick={() => setShowModal("view")}>
                        <Eye size={20} />
                    </Button>
                    {showModal && (
                        <ViewRoleModal
                            type={showModal}
                            role={role}
                            modalProps={{
                                isOpen: !!showModal,
                                onClose: () => setShowModal(null)
                            }}
                        />
                    )}
                    <Button isIconOnly variant='light' size='sm' color='primary' onClick={() => setShowModal("edit")}>
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
                                    Are you sure you want to delete <b>{role.role_name}</b> role?
                                </p>
                                <div className='flex justify-end space-x-2'>
                                    <Button
                                        color='danger'
                                        onClick={onDelete}
                                        size='sm'
                                        isLoading={deleteRoleMutation.isPending}
                                        isDisabled={deleteRoleMutation.isPending}
                                    >
                                        {deleteRoleMutation.isPending ? "Deleting role..." : "Confirm"}
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
