"use client"
import { createBrand, updateBrand } from "@/_actions/brand-action"
import { APP_ROUTES } from "@/_constants"
import {
    CreateBrandFormSchema,
    UpdateBrandFormSchema,
    createBrandFormSchema,
    updateBrandFormSchema
} from "@/_lib/form-schema/brand-form"
import { IBrand } from "@/_lib/interfaces/IBrand"
import { cn } from "@/_lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Switch } from "@nextui-org/react"
import { useAction } from "next-safe-action/hooks"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
    type?: "new" | "edit"
    data?: IBrand
}

const BrandForm = ({ type = "new", data }: Props) => {
    const isEdit = type === "edit"
    const router = useRouter()
    const params = useParams()

    const {
        setValue,
        watch,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CreateBrandFormSchema | UpdateBrandFormSchema>({
        resolver: zodResolver(isEdit ? updateBrandFormSchema : createBrandFormSchema),
        defaultValues: isEdit ? data : { isActive: true }
    })

    const { execute, status } = useAction(isEdit ? updateBrand : createBrand, {
        onSuccess: ({ data }) => {
            if (data.success) {
                toast.success(data.message)
                router.push(APP_ROUTES.BRANDS.INDEX)
            } else {
                toast.error(data.message)
            }
        }
    })

    const isLoading = status === "executing"

    const onSubmit = (data: CreateBrandFormSchema | UpdateBrandFormSchema) => {
        const _data = isEdit ? ({ ...data, _id: params.id } as UpdateBrandFormSchema) : (data as CreateBrandFormSchema)
        execute(_data)
    }

    return (
        <div className='flex flex-wrap gap-8'>
            <div className='space-y-1'>
                <h3 className='font-semibold'>Information</h3>
                <p className='text-sm text-slate-500'>{isEdit ? "Update" : "Add"} your brand information from here</p>
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
                    <Input
                        {...register("website")}
                        label='Website'
                        labelPlacement='outside'
                        placeholder='https://example.com'
                        variant='bordered'
                        errorMessage={errors.website?.message}
                        isInvalid={!!errors.website}
                        isDisabled={isLoading}
                    />
                    <Input
                        {...register("logo")}
                        label='Logo'
                        labelPlacement='outside'
                        placeholder='https://example.com/logo.png'
                        variant='bordered'
                        errorMessage={errors.logo?.message}
                        isInvalid={!!errors.logo}
                        isDisabled={isLoading}
                    />
                    <Switch
                        {...(register("isActive"),
                        {
                            isSelected: watch("isActive"),
                            onValueChange: (value) => {
                                setValue("isActive", value)
                            }
                        })}
                        classNames={{
                            base: cn(
                                "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                                "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent"
                                // "data-[selected=true]:border-primary"
                            ),
                            wrapper: "p-0 h-4 overflow-visible",
                            thumb: cn(
                                "w-6 h-6 border-2 shadow-lg",
                                "group-data-[hover=true]:border-primary",
                                //selected
                                "group-data-[selected=true]:ml-6",
                                // pressed
                                "group-data-[pressed=true]:w-7",
                                "group-data-[selected]:group-data-[pressed]:ml-4"
                            )
                        }}
                    >
                        <div className='flex flex-col gap-1'>
                            <p className='text-medium'>Active brand</p>
                            <p className='text-tiny text-default-400'>
                                {errors.isActive?.message || "Toggle to activate or deactivate the brand"}
                            </p>
                        </div>
                    </Switch>

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
export default BrandForm
