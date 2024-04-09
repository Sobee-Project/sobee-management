import { EResourcePermissions, ERolePermissions } from "@/_lib/enums"
import { IGrantListItem, IRole } from "@/_lib/interfaces"
import { CreateRoleRequestDTO, useCreateRoleMutation, useUpdateRoleMutation } from "@/_services"
import { useRoleStore } from "@/_store"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Button,
    Checkbox,
    CheckboxGroup,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalProps,
    Select,
    SelectItem
} from "@nextui-org/react"
import { PlusIcon, Trash2Icon } from "lucide-react"
import React, { useCallback, useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

const formSchema = z.object({
    role_name: z
        .string()
        .min(3, "Role name must be at least 3 characters")
        .max(40, "Role name must be at most 40 characters"),
    role_slug: z
        .string()
        .optional()
        .transform((v) => v?.trim().toLowerCase().replace(/\s/g, "-"))
})

type FormSchema = z.infer<typeof formSchema>

type Props = {
    role?: IRole
    type?: "create" | "view" | "edit"
    modalProps: Omit<ModalProps, "children">
}

const CreateNewRoleModal = ({
    role,
    type = "create",
    modalProps: { onClose: _onClose = () => {}, ...props }
}: Props) => {
    const {
        watch,
        formState: { errors },
        register,
        handleSubmit,
        setValue,
        getValues
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema)
        // defaultValues: {
        //     role_name: role?.role_name || "",
        //     role_slug: role?.role_slug || ""
        // }
    })

    useEffect(() => {
        setValue("role_name", role?.role_name || "")
        setValue("role_slug", role?.role_slug || "")
    }, [role, setValue])

    const createNewRoleMutation = useCreateRoleMutation()
    const updateRoleMutation = useUpdateRoleMutation()
    const { addRole, updateRole } = useRoleStore()

    const rolePermissions = useMemo(() => Object.values(ERolePermissions), [])
    const resourcePermissions = useMemo(() => Object.values(EResourcePermissions), [])

    const [grantList, setGrantList] = React.useState<IGrantListItem[]>([
        {
            actions: [],
            resource: "" as EResourcePermissions,
            attributes: "*"
        }
    ])

    useEffect(() => {
        if (role) {
            setGrantList(role.grant_lists)
        }
    }, [role])

    const onResourceSelectionChange = (index: number, value: EResourcePermissions) => {
        setGrantList((prev) => {
            const newList = [...prev]
            newList[index].resource = value
            return newList
        })
    }

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

    const onAddNewGrantItem = () => {
        setGrantList((prev) => [
            ...prev,
            {
                actions: [],
                resource: "" as EResourcePermissions,
                attributes: "*"
            }
        ])
    }

    const onSubmit = (data: FormSchema) => {
        if (grantList.length === 0 || grantList.some((grant) => !grant.resource || grant.actions.length === 0)) {
            return toast.error("Please fill in all grant list")
        }
        const body: CreateRoleRequestDTO = {
            ...data,
            role_slug: data.role_slug!,
            grant_lists: grantList
        }

        switch (type) {
            case "create":
                return createNewRoleMutation.mutate(body, {
                    onSuccess: (response) => {
                        addRole(response.data.data)
                        toast.success("Create role successfully!")
                        _onClose()
                    },
                    onError: (error: any) => {
                        toast.error(error?.response?.data?.message || "Create role failed!")
                    }
                })
            case "edit":
                return updateRoleMutation.mutate(body, {
                    onSuccess: (response) => {
                        updateRole(response.data.data)
                        toast.success("Update role successfully!")
                        _onClose()
                    },
                    onError: (error: any) => {
                        toast.error(error?.response?.data?.message || "Update role failed!")
                    }
                })
            default:
                return
        }
    }

    const renderGrantList = useCallback(() => {
        switch (type) {
            case "create":
            case "edit":
                return (
                    <>
                        {grantList.map((grant, index) => (
                            <div key={grant.resource || index} className='flex items-center gap-2'>
                                <div className='grid flex-1 grid-cols-2 gap-2'>
                                    <Select
                                        label='Select a resource'
                                        selectedKeys={grant.resource ? [grant.resource] : []}
                                        disabledKeys={grantList.map((gr) => gr.resource)}
                                        onSelectionChange={(v) =>
                                            onResourceSelectionChange(index, Array.from(v)[0] as EResourcePermissions)
                                        }
                                    >
                                        {resourcePermissions.map((resource) => (
                                            <SelectItem key={resource} value={resource}>
                                                {resource}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Select
                                        label='Select permissions'
                                        selectedKeys={grant.actions}
                                        onSelectionChange={(v) =>
                                            onActionsSelectionChange(index, Array.from(v) as ERolePermissions[])
                                        }
                                        selectionMode='multiple'
                                    >
                                        {rolePermissions.map((permission) => (
                                            <SelectItem key={permission} value={permission}>
                                                {permission}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                                <Button
                                    isIconOnly
                                    color='danger'
                                    variant='light'
                                    onClick={() => onDeleteGrantItem(index)}
                                >
                                    <Trash2Icon size={20} />
                                </Button>
                            </div>
                        ))}
                        <Button
                            startContent={<PlusIcon size={16} />}
                            color='secondary'
                            size='sm'
                            onClick={onAddNewGrantItem}
                        >
                            Add grant
                        </Button>
                    </>
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

    const renderModalTitle = useCallback(() => {
        switch (type) {
            case "create":
                return "Create new role"
            case "edit":
                return "Edit role"
            case "view":
                return `View ${role?.role_name} role`
        }
    }, [role?.role_name, type])

    const renderSubmitButton = useCallback(() => {
        switch (type) {
            case "create":
                return "Create"
            case "edit":
                return "Update"
            case "view":
                return "Close"
        }
    }, [type])

    return (
        <Modal {...props} onClose={_onClose} size='2xl' isDismissable={type === "view"}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className='flex flex-col gap-1'>{renderModalTitle()}</ModalHeader>
                        <ModalBody>
                            <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                                <Input
                                    {...register("role_name")}
                                    label='Role name'
                                    placeholder='eg. manager, product staff,...'
                                    variant='bordered'
                                    errorMessage={errors.role_name?.message}
                                    isInvalid={!!errors.role_name}
                                    autoFocus={type !== "view"}
                                    onValueChange={(v) => {
                                        setValue("role_slug", v)
                                    }}
                                    isReadOnly={type !== "create"}
                                    value={type === "view" ? role?.role_name : watch("role_name")}
                                />
                                <Input
                                    {...register("role_slug")}
                                    label='Role slug (auto generated)'
                                    variant='bordered'
                                    isDisabled
                                    errorMessage={errors.role_slug?.message}
                                    isInvalid={!!errors.role_slug}
                                    value={watch("role_slug")}
                                    isReadOnly={type === "view"}
                                />
                                <div className='space-y-2'>
                                    <p>Grant list</p>
                                    {renderGrantList()}
                                </div>
                                <div className='flex justify-end gap-2'>
                                    <Button
                                        color={type === "view" ? "primary" : "danger"}
                                        variant={type === "view" ? "solid" : "light"}
                                        type='button'
                                        onPress={onClose}
                                    >
                                        Close
                                    </Button>
                                    {type !== "view" && (
                                        <Button
                                            isLoading={createNewRoleMutation.isPending}
                                            isDisabled={createNewRoleMutation.isPending}
                                            color='primary'
                                            type='submit'
                                        >
                                            {renderSubmitButton()}
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default CreateNewRoleModal
