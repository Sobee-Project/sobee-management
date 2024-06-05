"use client"
import { createStaff, updateStaff } from "@/_actions"
import { PasswordInput } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { ERole } from "@/_lib/enums"
import {
  CreateStaffFormSchema,
  UpdateStaffFormSchema,
  createStaffFormSchema,
  updateStaffFormSchema
} from "@/_lib/form-schema"
import { IRole, IStaff, IUser } from "@/_lib/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, Input, Select, SelectItem } from "@nextui-org/react"
import { format } from "date-fns"
import { useAction } from "next-safe-action/hooks"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
  staff?: IUser<IStaff>
  roles: IRole[]
  type?: "create" | "edit"
}

const StaffForm = ({ staff, type = "create", roles }: Props) => {
  const isEdit = type === "edit"
  const staffUser = staff?._user as IStaff
  const staffRole = staffUser?.staffRole as IRole
  const {
    watch,
    formState: { errors, dirtyFields, isValid },
    register,
    handleSubmit,
    setValue
  } = useForm<CreateStaffFormSchema | UpdateStaffFormSchema>({
    resolver: zodResolver(isEdit ? updateStaffFormSchema : createStaffFormSchema),
    defaultValues: {
      role: ERole.STAFF,
      avatar: "https://avatar.iran.liara.run/username",
      ...staff,
      identityCard: staffUser?.identityCard ?? "",
      staffRole: staffRole?._id ?? "",
      dateOfBirth: format(staff?.dateOfBirth || new Date(), "yyyy-MM-dd") ?? ""
    }
  })

  const router = useRouter()
  const params = useParams()

  const { execute, status } = useAction(isEdit ? updateStaff : createStaff, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message)
        router.push(APP_ROUTES.STAFF.INDEX)
      } else {
        toast.error(data.message)
      }
    }
  })

  const isLoading = status === "executing"

  const onSubmit = (data: CreateStaffFormSchema | UpdateStaffFormSchema) => {
    if (!data.dateOfBirth) {
      return toast.error("Date of birth is required")
    }

    if (!data.staffRole) {
      return toast.error("Role is required")
    }

    const body = {
      ...data,
      avatar: `https://avatar.iran.liara.run/username?username=${encodeURIComponent(data.name)}`
    }

    const _data = isEdit ? ({ ...body, _id: params.id } as UpdateStaffFormSchema) : (body as CreateStaffFormSchema)

    execute(_data)
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='space-y-1'>
        <h3 className='font-semibold'>Information</h3>
        <p className='text-sm text-slate-500'>{isEdit ? "Update" : "Add"} staff from here</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-1 flex-col gap-6 rounded-md border bg-background p-8 shadow-lg'
      >
        <div className='flex flex-col gap-4 md:flex-row'>
          <div className='flex flex-1 flex-col gap-6'>
            <h3>Basic information</h3>
            <Input
              {...register("name")}
              label='Staff name'
              labelPlacement='outside'
              placeholder='Le Van Duy'
              variant='bordered'
              errorMessage={errors.name?.message}
              isInvalid={!!errors.name}
            />
            <Input
              {...register("email")}
              label='Email'
              labelPlacement='outside'
              placeholder='example@host.com'
              variant='bordered'
              errorMessage={errors.email?.message}
              isInvalid={!!errors.email}
            />
            <Input
              {...register("phoneNumber")}
              label='Phone number'
              labelPlacement='outside'
              placeholder='0123456789'
              variant='bordered'
              errorMessage={errors.phoneNumber?.message}
              isInvalid={!!errors.phoneNumber}
            />

            <Input
              {...register("identityCard")}
              label='Identity Card'
              labelPlacement='outside'
              placeholder='XXXXXXXXX'
              variant='bordered'
              errorMessage={errors.identityCard?.message}
              isInvalid={!!errors.identityCard}
            />

            <Input
              {...register("dateOfBirth")}
              label='Date of birth'
              labelPlacement='outside'
              variant='bordered'
              errorMessage={errors.dateOfBirth?.message}
              isInvalid={!!errors.dateOfBirth}
              type='date'
            />

            <Select
              selectionMode='single'
              disallowEmptySelection
              variant='bordered'
              {...register("staffRole")}
              errorMessage={errors.staffRole?.message}
              isInvalid={!!errors.staffRole}
              label='Role'
              labelPlacement='outside'
              placeholder='Select a role'
              onSelectionChange={(e) => {
                setValue("staffRole", Array.from(e)[0].toString())
              }}
            >
              {roles.map((role) => (
                <SelectItem key={role._id!} value={role._id}>
                  {role.role_name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className='flex flex-1 flex-col gap-6'>
            <h3>Account</h3>
            <Input
              label='Email'
              labelPlacement='outside'
              placeholder='example@host.com'
              variant='bordered'
              isReadOnly
              value={watch("email")}
              isDisabled
            />
            <Input
              label='Phone number'
              labelPlacement='outside'
              placeholder='0123456789'
              variant='bordered'
              isReadOnly
              value={watch("phoneNumber")}
              isDisabled
            />
            {isEdit && <h3>Change password</h3>}
            {!isEdit ? (
              <PasswordInput
                {...register("password")}
                label='Password'
                labelPlacement='outside'
                placeholder='********'
                variant='bordered'
                errorMessage={errors.password?.message}
                isInvalid={!!errors.password}
              />
            ) : (
              <>
                <PasswordInput
                  {...register("oldPassword")}
                  label='Old password'
                  labelPlacement='outside'
                  placeholder='********'
                  variant='bordered'
                  //@ts-ignore
                  errorMessage={errors.oldPassword?.message}
                  //@ts-ignore
                  isInvalid={!!errors.oldPassword}
                />
                <PasswordInput
                  {...register("newPassword")}
                  label='New password'
                  labelPlacement='outside'
                  placeholder='********'
                  variant='bordered'
                  //@ts-ignore
                  errorMessage={errors.newPassword?.message}
                  //@ts-ignore
                  isInvalid={!!errors.newPassword}
                />
                <PasswordInput
                  {...register("confirmPassword")}
                  label='Confirm password'
                  labelPlacement='outside'
                  placeholder='********'
                  variant='bordered'
                  //@ts-ignore
                  errorMessage={errors.confirmPassword?.message}
                  //@ts-ignore
                  isInvalid={!!errors.confirmPassword}
                />
              </>
            )}
          </div>
        </div>
        <Divider />
        <div className='flex justify-end gap-2'>
          <Button isLoading={isLoading} isDisabled={isLoading} color='primary' type='submit'>
            {isLoading ? "Saving" : "Save"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default StaffForm
