"use client"
import { createTerm, updateTerm } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import {
  CreateTermFormSchema,
  UpdateTermFormSchema,
  createTermFormSchema,
  updateTermFormSchema
} from "@/_lib/form-schema"
import { ITerm } from "@/_lib/interfaces"
import { cn } from "@/_lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Switch, Textarea } from "@nextui-org/react"
import { useAction } from "next-safe-action/hooks"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type Props = {
  type?: "new" | "edit"
  data?: ITerm
}

const TermForm = ({ type = "new", data }: Props) => {
  const isEdit = type === "edit"
  const router = useRouter()
  const params = useParams()

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateTermFormSchema | UpdateTermFormSchema>({
    resolver: zodResolver(isEdit ? updateTermFormSchema : createTermFormSchema),
    defaultValues: isEdit ? data : { title: "", description: "", type: "" }
  })

  const { execute, status } = useAction(isEdit ? updateTerm : createTerm, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message)
        router.push(APP_ROUTES.TERMS_AND_CONDITIONS.INDEX)
      } else {
        toast.error(data.message)
      }
    }
  })

  const isLoading = status === "executing"

  const onSubmit = (data: CreateTermFormSchema | UpdateTermFormSchema) => {
    const _data = isEdit ? ({ ...data, _id: params.id } as UpdateTermFormSchema) : (data as CreateTermFormSchema)
    execute(_data)
  }

  return (
    <div className='flex flex-wrap gap-8'>
      <div className='space-y-1'>
        <h3 className='font-semibold'>Information</h3>
        <p className='text-sm text-slate-500'>{isEdit ? "Update" : "Add"} your Term information from here</p>
      </div>
      <div className='flex-1 rounded-md border bg-white p-8 shadow-lg'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <Input
            {...register("title")}
            label='Name'
            labelPlacement='outside'
            placeholder='Term title'
            variant='bordered'
            errorMessage={errors.title?.message}
            isInvalid={!!errors.title}
            isDisabled={isLoading}
          />
          <Textarea
            {...register("description")}
            label='Description'
            labelPlacement='outside'
            placeholder='Term description'
            variant='bordered'
            errorMessage={errors.description?.message}
            isInvalid={!!errors.description}
            isDisabled={isLoading}
          />
          <Input
            {...register("type")}
            label='Type'
            labelPlacement='outside'
            placeholder='Term type'
            variant='bordered'
            errorMessage={errors.type?.message}
            isInvalid={!!errors.type}
            isDisabled={isLoading}
          />
          <Switch
            {...(register("isApproved"),
            {
              isSelected: watch("isApproved"),
              onValueChange: (value) => {
                setValue("isApproved", value)
              }
            })}
            classNames={{
              base: cn(
                "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent"
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
              <p className='text-medium'>Aprrove Term</p>
              <p className='text-tiny text-default-400'>
                {errors.isApproved?.message || "Toggle to approve or disapprove the term"}
              </p>
            </div>
          </Switch>
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
export default TermForm
