"use client"
import { createRole, updateRole } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { EResourcePermissions, ERolePermissions } from "@/_lib/enums"
import {
    CreateRoleFormSchema,
    UpdateRoleFormSchema,
    createRoleFormSchema,
    updateRoleFormSchema
} from "@/_lib/form-schema"
import { IGrantListItem, IRole } from "@/_lib/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Accordion,
    AccordionItem,
    Button,
    Checkbox,
    CheckboxGroup,
    Divider,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input
} from "@nextui-org/react"
import { PlusIcon, Trash2Icon } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
    role?: IRole
    type?: "create" | "view" | "edit"
}

const RoleForm = ({ role, type = "create" }: Props) => {
    const isEdit = type === "edit"

    const {
        watch,
        formState: { errors },
        register,
        handleSubmit,
        setValue
    } = useForm<CreateRoleFormSchema | UpdateRoleFormSchema>({
        resolver: zodResolver(
            isEdit ? updateRoleFormSchema.omit({ grant_lists: true }) : createRoleFormSchema.omit({ grant_lists: true })
        ),
        defaultValues: isEdit ? role : undefined
    })

    const router = useRouter()
    const params = useParams()

    const { execute, status } = useAction(isEdit ? updateRole : createRole, {
        onSuccess: ({ data }) => {
            if (data.success) {
                toast.success(data.message)
                router.push(APP_ROUTES.ROLES.INDEX)
            } else {
                toast.error(data.message)
            }
        }
    })

    const isLoading = status === "executing"

    const rolePermissions = useMemo(() => Object.values(ERolePermissions), [])
    const resourcePermissions = useMemo(() => Object.values(EResourcePermissions), [])

    const [grantList, setGrantList] = useState<IGrantListItem[]>([])

    useEffect(() => {
        if (role) {
            setGrantList(role.grant_lists)
        }
    }, [role])

    const onActionsSelectionChange = (index: number, value: ERolePermissions[]) => {
        setGrantList((prev) => {
            const newList = [...prev]
            newList[index].actions = value
            return newList
        })
    }

    const onDeleteGrantItem = (index: number) => {
        setGrantList((prev) => {
            const newList = [...prev]
            newList.splice(index, 1)
            return newList
        })
    }

    const onAddNewGrantItem = (resource: EResourcePermissions) => {
        setGrantList((prev) => [
            ...prev,
            {
                actions: [],
                resource: resource as EResourcePermissions,
                attributes: "*"
            }
        ])
    }

    const onSubmit = (data: CreateRoleFormSchema | UpdateRoleFormSchema) => {
        if (grantList.length === 0 || grantList.some((grant) => !grant.resource || grant.actions.length === 0)) {
            return toast.error("Please fill in all grant list")
        }
        const body = {
            ...data,
            grant_lists: grantList
        }

        const _data = isEdit ? ({ ...body, _id: params.id } as UpdateRoleFormSchema) : (body as CreateRoleFormSchema)

        execute(_data)
    }

    const renderGrantList = useCallback(() => {
        switch (type) {
            case "create":
            case "edit":
                return (
                    <div className='space-y-4'>
                        <Accordion className='p-0' variant='splitted' isCompact>
                            {grantList.map((grant, index) => (
                                <AccordionItem
                                    aria-label={grant.resource}
                                    key={grant.resource || index}
                                    title={<p className='text-sm'>{grant.resource.replace(/_/g, " ")}</p>}
                                    startContent={
                                        <Button
                                            isIconOnly
                                            color='danger'
                                            variant='light'
                                            onClick={() => onDeleteGrantItem(index)}
                                        >
                                            <Trash2Icon size={20} />
                                        </Button>
                                    }
                                >
                                    <div key={grant.resource || index} className='flex gap-2 pb-4'>
                                        <div className='flex-1 gap-2'>
                                            <CheckboxGroup
                                                label='Select permissions'
                                                value={grant.actions}
                                                onValueChange={(v) =>
                                                    onActionsSelectionChange(index, Array.from(v) as ERolePermissions[])
                                                }
                                            >
                                                <div className='grid grid-cols-2 gap-2'>
                                                    {rolePermissions.map((permission) => (
                                                        <Checkbox key={permission} value={permission}>
                                                            {permission}
                                                        </Checkbox>
                                                    ))}
                                                </div>
                                            </CheckboxGroup>
                                        </div>
                                    </div>
                                </AccordionItem>
                            ))}
                        </Accordion>
                        <Dropdown placement='bottom'>
                            <DropdownTrigger>
                                <Button startContent={<PlusIcon size={16} />} color='default' variant='flat' size='sm'>
                                    Add grant
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disabledKeys={grantList.map((grant) => grant.resource)}
                                onAction={(resource) => onAddNewGrantItem(resource as EResourcePermissions)}
                            >
                                {resourcePermissions.map((resource, index) => (
                                    <DropdownItem key={resource} value={resource}>
                                        {resource.replace(/_/g, " ")}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                )
            case "view":
                return (
                    <div className='grid grid-cols-2 gap-2'>
                        {grantList.map((grant, index) => (
                            <CheckboxGroup label={grant.resource} value={grant.actions} isReadOnly key={grant.resource}>
                                {grant.actions.map((action) => (
                                    <Checkbox value={action} key={action}>
                                        {action}
                                    </Checkbox>
                                ))}
                            </CheckboxGroup>
                        ))}
                    </div>
                )
            default:
                return null
        }
    }, [grantList, resourcePermissions, rolePermissions, type])

    return (
        <div className='flex flex-col gap-8'>
            {type !== "view" && (
                <div className='space-y-1'>
                    <h3 className='font-semibold'>Information</h3>
                    <p className='text-sm text-slate-500'>{isEdit ? "Update" : "Add"} role from here</p>
                </div>
            )}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex-1 space-y-4 rounded-md border bg-white p-8 shadow-lg'
            >
                <Input
                    {...register("role_name")}
                    label='Role name'
                    labelPlacement='outside'
                    placeholder='eg. manager, product staff,...'
                    variant='bordered'
                    errorMessage={errors.role_name?.message}
                    isInvalid={!!errors.role_name}
                    autoFocus={type !== "view"}
                    isReadOnly={type !== "create"}
                />

                <div className='space-y-2'>
                    <p className='text-sm'>Grant list</p>
                    {renderGrantList()}
                </div>
                <Divider />
                <div className='flex gap-2'>
                    {type !== "view" && (
                        <Button isLoading={isLoading} isDisabled={isLoading} color='primary' type='submit'>
                            {isLoading ? "Saving" : "Save"}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default RoleForm
