"use client"
import { createFaq, updateFaq } from "@/_actions/faq-action"
import { APP_ROUTES } from "@/_constants"
import { CreateFaqFormSchema, UpdateFaqFormSchema, createFaqFormSchema, updateFaqFormSchema } from "@/_lib/form-schema"
import { IFaq } from "@/_lib/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Textarea } from "@nextui-org/react"
import { useAction } from "next-safe-action/hooks"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
  type?: "new" | "edit"
  data?: IFaq
}

const FaqForm = ({ type = "new", data }: Props) => {
  const isEdit = type === "edit"
  const router = useRouter()
  const params = useParams()

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateFaqFormSchema | UpdateFaqFormSchema>({
    resolver: zodResolver(isEdit ? updateFaqFormSchema : createFaqFormSchema),
    defaultValues: isEdit ? data : { title: "", description: "", type: "" }
  })

  const { execute, status } = useAction(isEdit ? updateFaq : createFaq, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message)
        router.push(APP_ROUTES.FAQS.INDEX)
      } else {
        toast.error(data.message)
      }
    }
  })

  const isLoading = status === "executing"

  const onSubmit = (data: CreateFaqFormSchema | UpdateFaqFormSchema) => {
    const _data = isEdit ? ({ ...data, _id: params.id } as UpdateFaqFormSchema) : (data as CreateFaqFormSchema)
    execute(_data)
  }

  return (
    <div className='flex flex-wrap gap-8'>
      <div className='space-y-1'>
        <h3 className='font-semibold'>Information</h3>
        <p className='text-sm text-slate-500'>{isEdit ? "Update" : "Add"} your FaQ information from here</p>
      </div>
      <div className='flex-1 rounded-md border bg-white p-8 shadow-lg'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <Input
            {...register("title")}
            label='Name'
            labelPlacement='outside'
            placeholder='FaQ title'
            variant='bordered'
            errorMessage={errors.title?.message}
            isInvalid={!!errors.title}
            isDisabled={isLoading}
          />
          <Textarea
            {...register("description")}
            label='Description'
            labelPlacement='outside'
            placeholder='FaQ description'
            variant='bordered'
            errorMessage={errors.description?.message}
            isInvalid={!!errors.description}
            isDisabled={isLoading}
          />
          <Input
            {...register("type")}
            label='Type'
            labelPlacement='outside'
            placeholder='FaQ type'
            variant='bordered'
            errorMessage={errors.type?.message}
            isInvalid={!!errors.type}
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
export default FaqForm
