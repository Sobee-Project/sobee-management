"use client"
import { createCategory, updateCategory } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import {
    CreateCategoryFormSchema,
    UpdateCategoryFormSchema,
    createCategoryFormSchema,
    updateCategoryFormSchema
} from "@/_lib/form-schema"
import { ICategory } from "@/_lib/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Textarea } from "@nextui-org/react"
import { useAction } from "next-safe-action/hooks"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
    type?: "new" | "edit"
    data?: ICategory
}

const CategoryForm = ({ type = "new", data }: Props) => {
    const isEdit = type === "edit"
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CreateCategoryFormSchema | UpdateCategoryFormSchema>({
        resolver: zodResolver(isEdit ? updateCategoryFormSchema : createCategoryFormSchema),
        defaultValues: isEdit ? data : undefined
    })

    const router = useRouter()
    const params = useParams()

    const { execute, status } = useAction(isEdit ? updateCategory : createCategory, {
        onSuccess: ({ data }) => {
            if (data.success) {
                toast.success(data.message)
                router.push(APP_ROUTES.CATEGORIES.INDEX)
            } else {
                toast.error(data.message)
            }
        }
    })

    const isLoading = status === "executing"

    const onSubmit = (data: CreateCategoryFormSchema | UpdateCategoryFormSchema) => {
        const _data = isEdit
            ? ({ ...data, _id: params.id } as UpdateCategoryFormSchema)
            : (data as CreateCategoryFormSchema)
        execute(_data)
    }

    return (
        <div className='flex flex-wrap gap-8'>
            <div className='space-y-1'>
                <h3 className='font-semibold'>Information</h3>
                <p className='text-sm text-slate-500'>
                    {isEdit ? "Update" : "Add"} your category information from here
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
                    <Input
                        {...register("slug")}
                        label='Slug'
                        labelPlacement='outside'
                        placeholder='global'
                        variant='bordered'
                        errorMessage={errors.slug?.message}
                        isInvalid={!!errors.slug}
                        isDisabled={isLoading}
                    />
                    <Textarea
                        {...register("description")}
                        label='Description'
                        labelPlacement='outside'
                        placeholder='Description of the category'
                        variant='bordered'
                        errorMessage={errors.description?.message}
                        isInvalid={!!errors.description}
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

export default CategoryForm
