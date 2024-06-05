"use client"
import { createCoupon, updateCoupon } from "@/_actions"
import { ScreenLoader } from "@/_components"
import { APP_ROUTES, DEFAULT_COUPON_IMAGE } from "@/_constants"
import { ECouponApplyType, ECouponType } from "@/_lib/enums"
import {
  CreateCouponFormSchema,
  UpdateCouponFormSchema,
  createCouponFormSchema,
  updateCouponFormSchema
} from "@/_lib/form-schema"
import { ICoupon } from "@/_lib/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, Input, Radio, RadioGroup } from "@nextui-org/react"
import { format } from "date-fns"
import { useAction } from "next-safe-action/hooks"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
const CloudinaryPlugin = dynamic(() => import("@/_plugins").then((r) => r.CloudinaryPlugin), {
  ssr: false,
  loading: () => <ScreenLoader />
})

type Props = {
  type?: "new" | "edit"
  data?: ICoupon
}

const CouponForm = ({ type = "new", data }: Props) => {
  const isEdit = type === "edit"
  const [showPlugin, setShowPlugin] = useState(false)
  const router = useRouter()
  const params = useParams()

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateCouponFormSchema | UpdateCouponFormSchema>({
    resolver: zodResolver(isEdit ? updateCouponFormSchema : createCouponFormSchema),
    defaultValues: isEdit
      ? {
          ...data,
          applyTo: data?.applyTo as ECouponApplyType,
          type: data?.type as ECouponType,
          productApply: data?.productApply as string[],
          startDate: format(new Date(data?.startDate as string), "yyyy-MM-dd"),
          endDate: format(new Date(data?.endDate as string), "yyyy-MM-dd")
        }
      : {
          image: DEFAULT_COUPON_IMAGE,
          type: ECouponType.FIXED,
          applyTo: ECouponApplyType.ALL,
          startDate: format(new Date(), "yyyy-MM-dd"),
          endDate: format(new Date(), "yyyy-MM-dd")
        }
  })

  const { execute, status } = useAction(isEdit ? updateCoupon : createCoupon, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message)
        router.push(APP_ROUTES.COUPONS.INDEX)
      } else {
        toast.error(data.message)
      }
    }
  })

  const isLoading = status === "executing"

  const onSubmit = (data: CreateCouponFormSchema | UpdateCouponFormSchema) => {
    const _data = isEdit ? ({ ...data, _id: params.id } as UpdateCouponFormSchema) : (data as CreateCouponFormSchema)
    execute(_data)
  }

  return (
    <div className='flex flex-wrap gap-8'>
      <div className='space-y-1'>
        <h3 className='font-semibold'>Information</h3>
        <p className='text-sm text-slate-500'>{isEdit ? "Update" : "Add"} coupon information from here</p>
      </div>
      <div className='flex-1 rounded-md border bg-background p-8 shadow-lg'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <div className='flex'>
            <div className='w-1/3'>
              <p className='mb-2 text-sm'>Image</p>
              <Button color='primary' variant='bordered' onClick={() => setShowPlugin(true)}>
                Choose Image
              </Button>
            </div>
            <div className='ml-4 w-2/3 '>
              <div className='size-fit border border-dashed p-4'>
                <div className='relative '>
                  <Image src={watch("image") as string} alt='coupon' objectFit='contain' width={400} height={300} />
                </div>
              </div>
            </div>
            {showPlugin && (
              <CloudinaryPlugin
                visible={showPlugin}
                onClose={() => setShowPlugin(false)}
                onUploadSuccess={({ urls }) => setValue("image", urls[0])}
                assetType='image'
                multiple={false}
                folder='/image/coupon'
              />
            )}
          </div>
          <Input
            {...register("code")}
            label='Code'
            labelPlacement='outside'
            placeholder='COUPON-CODE'
            variant='bordered'
            errorMessage={errors.code?.message}
            isInvalid={!!errors.code}
            isDisabled={isLoading}
          />
          <RadioGroup
            {...(register("type"),
            {
              value: watch("type"),
              onValueChange: (value) => setValue("type", value)
            })}
            label='Select coupon type'
            errorMessage={errors.type?.message}
            isDisabled={isLoading}
          >
            {Object.values(ECouponType).map((type) => (
              <Radio key={type} value={type}>
                {type}
              </Radio>
            ))}
          </RadioGroup>
          <Input
            {...register("discountValue", { valueAsNumber: true })}
            label='Discount Value'
            labelPlacement='outside'
            placeholder='0'
            type='number'
            variant='bordered'
            errorMessage={errors.discountValue?.message}
            isInvalid={!!errors.discountValue}
            isDisabled={isLoading}
          />
          <Input
            {...register("minOrderValue", { valueAsNumber: true })}
            label='Min Order Value'
            labelPlacement='outside'
            placeholder='0'
            type='number'
            variant='bordered'
            errorMessage={errors.minOrderValue?.message}
            isInvalid={!!errors.minOrderValue}
            isDisabled={isLoading}
          />
          <Input
            {...register("usageLimit", { valueAsNumber: true })}
            label='Usage Limit'
            labelPlacement='outside'
            placeholder='0'
            type='number'
            variant='bordered'
            errorMessage={errors.minOrderValue?.message}
            isInvalid={!!errors.minOrderValue}
            isDisabled={isLoading}
          />
          <div className='flex gap-8'>
            <Input
              {...register("startDate")}
              label='Start Date'
              labelPlacement='outside'
              type='date'
              variant='bordered'
              errorMessage={errors.startDate?.message}
              isInvalid={!!errors.startDate}
              isDisabled={isLoading}
            />
            <Input
              {...register("endDate")}
              label='End Date'
              labelPlacement='outside'
              type='date'
              variant='bordered'
              errorMessage={errors.endDate?.message}
              isInvalid={!!errors.endDate}
              isDisabled={isLoading}
            />
          </div>
          <RadioGroup
            label='Select coupon apply type'
            {...(register("applyTo"),
            {
              value: watch("applyTo"),
              onValueChange: (value) => setValue("applyTo", value)
            })}
            errorMessage={errors.type?.message}
            isDisabled={isLoading}
          >
            {Object.values(ECouponApplyType).map((type) => (
              <Radio key={type} value={type}>
                {type}
              </Radio>
            ))}
          </RadioGroup>

          <Divider />
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
export default CouponForm
