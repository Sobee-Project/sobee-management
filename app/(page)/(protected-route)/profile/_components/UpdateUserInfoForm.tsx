import { useUpdateUserInfoMutation } from "@/_services"
import { useUserStore } from "@/_store"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input } from "@nextui-org/react"
import { format } from "date-fns"
import { Check, RotateCcw } from "lucide-react"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 characters long"),
    dateOfBirth: z.date().max(new Date(), "Date of birth must be in the past")
})

type FormSchema = z.infer<typeof formSchema>

const UpdateUserInfoForm = () => {
    const { userInfo } = useUserStore()
    const {
        register,
        watch,
        formState: { errors },
        setValue,
        handleSubmit,
        reset
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema)
    })

    const updateUserInfoMutation = useUpdateUserInfoMutation()

    useEffect(() => {
        setValue("name", userInfo?.name || "")
        setValue("email", userInfo?.email || "")
        setValue("phoneNumber", userInfo?.phoneNumber || "")
        setValue("dateOfBirth", new Date(userInfo?.dateOfBirth || new Date()))
    }, [setValue, userInfo])

    const onReset = () => {
        reset({
            dateOfBirth: new Date(userInfo?.dateOfBirth || new Date()),
            email: userInfo?.email || "",
            name: userInfo?.name || "",
            phoneNumber: userInfo?.phoneNumber || ""
        })
    }
    const onUpdate = (data: FormSchema) => {
        updateUserInfoMutation.mutate(data, {
            onSuccess: (response) => {
                toast.success(response.data.message)
            }
        })
    }

    return (
        // eslint-disable-next-line tailwindcss/classnames-order
        <div className='shadow-custom-light h-fit space-y-2 rounded-md bg-white p-4'>
            <h2 className='text-2xl font-bold'>Update user information</h2>
            <form className='space-y-3' onSubmit={handleSubmit(onUpdate)}>
                <Input
                    {...register("name")}
                    label='Name'
                    placeholder='So Van Bee'
                    variant='bordered'
                    value={watch("name")}
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                />
                <Input
                    {...register("email")}
                    label='Email'
                    placeholder='example@host.com'
                    variant='bordered'
                    value={watch("email")}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                />
                <Input
                    {...register("phoneNumber")}
                    label='Phone number'
                    placeholder='0123456789'
                    variant='bordered'
                    value={watch("phoneNumber")}
                    isInvalid={!!errors.phoneNumber}
                    errorMessage={errors.phoneNumber?.message}
                />
                <Input
                    {...register("dateOfBirth")}
                    label='Date of birth'
                    type='date'
                    variant='bordered'
                    isInvalid={!!errors.dateOfBirth}
                    errorMessage={errors.dateOfBirth?.message}
                    value={format(watch("dateOfBirth") || new Date(), "yyyy-MM-dd")}
                />
                <div className='flex gap-2'>
                    <Button variant='solid' color='primary' startContent={<Check size={18} />} type='submit'>
                        Update
                    </Button>
                    <Button
                        variant='light'
                        color='default'
                        startContent={<RotateCcw size={18} />}
                        type='reset'
                        onClick={onReset}
                    >
                        Reset
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default UpdateUserInfoForm
