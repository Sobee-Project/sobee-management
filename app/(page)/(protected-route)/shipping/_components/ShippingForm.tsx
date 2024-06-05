"use client"
import { createShipping, updateShipping } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { EShippingType } from "@/_lib/enums"
import {
  CreateShippingFormSchema,
  UpdateShippingFormSchema,
  createShippingFormSchema,
  updateShippingFormSchema
} from "@/_lib/form-schema"
import { IShipping } from "@/_lib/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Radio, RadioGroup, Select } from "@nextui-org/react"
import { useAction } from "next-safe-action/hooks"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
  type?: "new" | "edit"
  data?: IShipping
}

const ShippingForm = ({ type = "new", data }: Props) => {
  const isEdit = type === "edit"
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<CreateShippingFormSchema | UpdateShippingFormSchema>({
    resolver: zodResolver(isEdit ? updateShippingFormSchema : createShippingFormSchema),
    defaultValues: isEdit ? data : undefined
  })

  console.log(errors)

  const router = useRouter()
  const params = useParams()

  const { execute, status } = useAction(isEdit ? updateShipping : createShipping, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message)
        router.push(APP_ROUTES.SHIPPINGS.INDEX)
      } else {
        toast.error(data.message)
      }
    }
  })

  const isLoading = status === "executing"

  const onSubmit = (data: CreateShippingFormSchema | UpdateShippingFormSchema) => {
    const _data = isEdit
      ? ({ ...data, _id: params.id } as UpdateShippingFormSchema)
      : (data as CreateShippingFormSchema)
    execute(_data)
  }

  return (
    <div className='flex flex-wrap gap-8'>
      <div className='space-y-1'>
        <h3 className='font-semibold'>Information</h3>
        <p className='text-sm text-slate-500'>{isEdit ? "Update" : "Add"} your shipping information from here</p>
      </div>
      <div className='flex-1 rounded-md border bg-background p-8 shadow-lg'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <Input
            {...register("name")}
            label='Name'
            labelPlacement='outside'
            placeholder='Global'
            variant='bordered'
            errorMessage={errors.name?.message}
            isInvalid={!!errors.name}
            isDisabled={isLoading}
          />
          <RadioGroup
            {...(register("type"),
            {
              onValueChange: (value) => {
                setValue("type", value)
              },
              value: watch("type") ?? EShippingType.FIXED
            })}
          >
            {Object.values(EShippingType).map((type) => (
              <Radio value={type} key={type}>
                {type}
              </Radio>
            ))}
          </RadioGroup>

          <Input
            {...register("amount", {
              valueAsNumber: true
            })}
            label='Amount'
            labelPlacement='outside'
            placeholder='0'
            type='number'
            min={0}
            variant='bordered'
            errorMessage={errors.amount?.message}
            isInvalid={!!errors.amount}
            isDisabled={isLoading}
          />

          <div className='flex flex-wrap gap-2'>
            <Button type='submit' variant='solid' color='primary' isDisabled={isLoading} isLoading={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ShippingForm
