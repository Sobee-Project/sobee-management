"use client"
import { createPaymentMethod, updatePaymentMethod } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import {
    CreatePaymentMethodFormSchema,
    UpdatePaymentMethodFormSchema,
    createPaymentMethodFormSchema,
    updatePaymentMethodFormSchema
} from "@/_lib/form-schema"
import { IPaymentMethod } from "@/_lib/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input } from "@nextui-org/react"
import { useAction } from "next-safe-action/hooks"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
    type?: "new" | "edit"
    data?: IPaymentMethod
}

const PaymentMethodForm = ({ type = "new", data }: Props) => {
    const isEdit = type === "edit"
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm<CreatePaymentMethodFormSchema | UpdatePaymentMethodFormSchema>({
        resolver: zodResolver(isEdit ? updatePaymentMethodFormSchema : createPaymentMethodFormSchema),
        defaultValues: isEdit ? data : undefined
    })

    console.log(errors)

    const router = useRouter()
    const params = useParams()

    const { execute, status } = useAction(isEdit ? updatePaymentMethod : createPaymentMethod, {
        onSuccess: ({ data }) => {
            if (data.success) {
                toast.success(data.message)
                router.push(APP_ROUTES.PAYMENT_METHODS.INDEX)
            } else {
                toast.error(data.message)
            }
        }
    })

    const isLoading = status === "executing"

    const onSubmit = (data: CreatePaymentMethodFormSchema | UpdatePaymentMethodFormSchema) => {
        const _data = isEdit
            ? ({ ...data, _id: params.id } as UpdatePaymentMethodFormSchema)
            : (data as CreatePaymentMethodFormSchema)
        execute(_data)
    }

    return (
        <div className='flex flex-wrap gap-8'>
            <div className='space-y-1'>
                <h3 className='font-semibold'>Information</h3>
                <p className='text-sm text-slate-500'>
                    {isEdit ? "Update" : "Add"} your paymentMethod information from here
                </p>
            </div>
            <div className='flex-1 rounded-md border bg-white p-8 shadow-lg'>
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

                    <div className='flex flex-wrap gap-2'>
                        <Button
                            type='submit'
                            variant='solid'
                            color='primary'
                            isDisabled={isLoading}
                            isLoading={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PaymentMethodForm
