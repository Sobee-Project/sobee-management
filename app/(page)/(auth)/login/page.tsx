"use client"

import { PasswordInput } from "@/_components"
import { APP_ROUTES } from "@/_constants"
import { authApi } from "@/_services"
import { useUserStore } from "@/_store"
import { clearCredentialsFromCookie, setCredentialsToCookie } from "@/_utils/storage"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input } from "@nextui-org/react"

import { useMutation, useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

const formSchema = z.object({
    emailOrPhone: z
        .string()
        .min(10, "Email or phone number must be at least 10 characters long")
        .max(255, "Email or phone number must be at most 255 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})

type FormSchema = z.infer<typeof formSchema>

const LoginPage = () => {
    const router = useRouter()
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema)
    })

    const { setUserInfo } = useUserStore()

    const _emailOrPhone = watch("emailOrPhone") || ""
    const _password = watch("password") || ""

    const loginMutation = useMutation({
        mutationFn: (body: { emailOrPhone: string; password: string }) => authApi.login(body)
    })

    const handleClickLogin = ({ emailOrPhone, password }: FormSchema) => {
        loginMutation.mutate(
            { emailOrPhone, password },
            {
                onSuccess: (response) => {
                    const { user, accessToken, refreshToken } = response.data.data
                    setCredentialsToCookie({ accessToken, refreshToken, user_id: user._id! })
                    setUserInfo(user)
                    toast.success("Login successfully!")
                    router.replace(APP_ROUTES.DASHBOARD)
                    // need to reload to sync between cookie and session
                    location.reload()
                },
                onError: (error: any) => {
                    toast.error(error?.response?.data?.message || "Login failed!")
                }
            }
        )
    }

    return (
        <motion.div
            className='flex max-h-screen min-h-screen w-full items-center justify-center overflow-hidden dark:bg-gray-950'
            animate={{ opacity: 1, transform: "translateY(0)" }}
            initial={{ opacity: 0, transform: "translateY(40px)" }}
        >
            <form
                onSubmit={handleSubmit(handleClickLogin)}
                className='max-w-96 space-y-8 rounded-lg border bg-white px-8 py-6 shadow-lg dark:bg-gray-900'
            >
                <div className='space-y-4'>
                    <h1 className='text-center text-2xl font-bold dark:text-gray-200'>Welcome Back!</h1>
                    <p className='max-w-80 text-center'>Login to your account to access all the features of the app.</p>
                </div>
                <div className='space-y-4'>
                    <Input
                        {...register("emailOrPhone")}
                        label='Email/Phone number'
                        type='text'
                        placeholder='example@host.com'
                        variant='bordered'
                        autoFocus
                        errorMessage={errors.emailOrPhone?.message}
                        isInvalid={!!errors.emailOrPhone}
                    />
                    <PasswordInput
                        {...register("password")}
                        label='Password'
                        placeholder='Enter your secret password'
                        variant='bordered'
                        errorMessage={errors.password?.message}
                        isInvalid={!!errors.password}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='solid'
                        color='primary'
                        size='lg'
                        isDisabled={_emailOrPhone.length === 0 || _password.length === 0 || loginMutation.isPending}
                    >
                        {loginMutation.isPending ? "Logging in" : "Login"}
                    </Button>
                </div>
            </form>
        </motion.div>
    )
}
export default LoginPage
