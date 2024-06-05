"use client"
import { changePassword } from "@/_actions"
import { ChangePasswordFormSchema, changePasswordFormSchema } from "@/_lib/form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input } from "@nextui-org/react"
import { Check, X } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ChangePasswordFormSchema>({
    resolver: zodResolver(changePasswordFormSchema)
  })

  const { execute } = useAction(changePassword, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message)
        reset()
      } else {
        toast.error(data.message || "Failed to change password")
      }
    }
  })

  const onUpdate = (data: ChangePasswordFormSchema) => {
    execute(data)
  }

  const onReset = () => {
    reset()
  }

  return (
    // eslint-disable-next-line tailwindcss/classnames-order
    <div className='h-fit space-y-2 rounded-md bg-background p-4 shadow-custom-light'>
      <h2 className='text-2xl font-bold'>Change password</h2>
      <form className='space-y-3' onSubmit={handleSubmit(onUpdate)}>
        <Input
          {...register("oldPassword")}
          label='Current password'
          placeholder='Enter your current password'
          variant='bordered'
          isInvalid={!!errors.oldPassword}
          errorMessage={errors.oldPassword?.message}
        />
        <Input
          {...register("newPassword")}
          label='New password'
          placeholder='Enter your new password'
          variant='bordered'
          isInvalid={!!errors.newPassword}
          errorMessage={errors.newPassword?.message}
        />
        <Input
          {...register("confirmPassword")}
          label='Confirm password'
          placeholder='Re-enter your new password'
          variant='bordered'
          isInvalid={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
        />
        <div className='flex gap-2'>
          <Button variant='solid' color='primary' startContent={<Check size={18} />} type='submit'>
            Update
          </Button>
          <Button variant='light' color='default' startContent={<X size={18} />} type='reset' onClick={onReset}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChangePasswordForm
