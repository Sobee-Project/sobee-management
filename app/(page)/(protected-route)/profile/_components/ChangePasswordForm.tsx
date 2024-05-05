import { useChangePasswordMutation } from "@/_services"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input } from "@nextui-org/react"
import { Check, X } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

const formSchema = z
    .object({
        oldPassword: z.string().min(6, "Password must be at least 6 characters"),
        newPassword: z.string().min(6, "New password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters")
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    })

type FormSchema = z.infer<typeof formSchema>

const ChangePasswordForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema)
    })

    const changePasswordMutation = useChangePasswordMutation()

    const onUpdate = (data: FormSchema) => {
        changePasswordMutation.mutate(data, {
            onSuccess: (response) => {
                reset()
                toast.success(response.data.message)
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Failed to change password")
            }
        })
    }

    const onReset = () => {
        reset()
    }

    return (
        // eslint-disable-next-line tailwindcss/classnames-order
        <div className='shadow-custom-light h-fit space-y-2 rounded-md bg-white p-4'>
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
                    <Button
                        variant='light'
                        color='default'
                        startContent={<X size={18} />}
                        type='reset'
                        onClick={onReset}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ChangePasswordForm
