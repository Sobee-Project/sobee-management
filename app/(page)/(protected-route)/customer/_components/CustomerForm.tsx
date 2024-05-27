"use client"
import { createCustomer, updateCustomer } from "@/_actions"
import { PasswordInput } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { ERole } from "@/_lib/enums"
import {
  CreateCustomerFormSchema,
  UpdateCustomerFormSchema,
  createCustomerFormSchema,
  updateCustomerFormSchema
} from "@/_lib/form-schema"
import { ICustomer, IRole, IUser } from "@/_lib/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, Input, Select, SelectItem } from "@nextui-org/react"
import { format } from "date-fns"
import { useAction } from "next-safe-action/hooks"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
  customer?: IUser<ICustomer>
  type?: "create" | "edit"
}

const CustomerForm = ({ customer, type = "create" }: Props) => {
  const isEdit = type === "edit"
  const customerUser = customer?._user as ICustomer

  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<CreateCustomerFormSchema | UpdateCustomerFormSchema>({
    resolver: zodResolver(isEdit ? updateCustomerFormSchema : createCustomerFormSchema),
    defaultValues: isEdit
      ? {
          ...customer,
          role: ERole.CUSTOMER,
          avatar: customer?.avatar,
          dateOfBirth: format(customer?.dateOfBirth || new Date(), "yyyy-MM-dd") ?? "",
          _user: {
            ...customerUser
          }
        }
      : {
          role: ERole.CUSTOMER,
          avatar: "https://avatar.iran.liara.run/username",
          name: "",
          email: "",
          phoneNumber: "",
          dateOfBirth: format(customer?.dateOfBirth || new Date(), "yyyy-MM-dd") ?? "",
          _user: {
            gender: "male",
            isActive: true
          }
        }
  })
  useEffect(() => {
    console.log(errors)
  }, [errors])

  const router = useRouter()
  const params = useParams()

  const { execute, status } = useAction(isEdit ? updateCustomer : createCustomer, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message)
        router.push(APP_ROUTES.CUSTOMERS.INDEX)
      } else {
        toast.error(data.message)
      }
    }
  })

  const isLoading = status === "executing"

  const onSubmit = (data: CreateCustomerFormSchema | UpdateCustomerFormSchema) => {
    console.log("call api")
    if (!data.dateOfBirth) {
      return toast.error("Date of birth is required")
    }

    const body = {
      ...data,
      avatar: `https://avatar.iran.liara.run/username?username=${encodeURIComponent(data.name)}`
    }

    const _data = isEdit
      ? ({ ...body, _id: params.id } as UpdateCustomerFormSchema)
      : (body as CreateCustomerFormSchema)

    execute(_data)
  }

  return (
    <div className='flex flex-wrap gap-8'>
      <div className='space-y-1'>
        <h3 className='font-semibold'>Information</h3>
        <p className='text-sm text-slate-500'>{isEdit ? "Update" : "Add"} customer from here</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-1 flex-col gap-6 rounded-md border bg-white p-8 shadow-lg'
      >
        <Input
          {...register("name")}
          label='Customer name'
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
          {...register("dateOfBirth")}
          label='Date of birth'
          labelPlacement='outside'
          variant='bordered'
          errorMessage={errors.dateOfBirth?.message}
          isInvalid={!!errors.dateOfBirth}
          type='date'
        />

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

export default CustomerForm
