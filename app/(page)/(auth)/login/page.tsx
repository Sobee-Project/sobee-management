"use client"

import { login } from "@/_actions"
import { PasswordInput } from "@/_components"
import { ERole } from "@/_lib/enums"
import { LoginFormSchema, loginFormSchema } from "@/_lib/form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input } from "@nextui-org/react"

import { motion } from "framer-motion"
import { useAction } from "next-safe-action/hooks"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

const LoginPage = () => {
  const router = useRouter()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema)
  })

  const { execute, status } = useAction(login, {
    onSuccess: ({ data }) => {
      if (!data) return
      if (data.success) {
        if (data.data?.user.role === ERole.CUSTOMER) {
          toast.error("You are not authorized to access this page!")
          return
        }
        toast.success("Login successfully!")
      } else {
        toast.error(data.message || "Login failed!")
      }
    }
  })

  const isLoading = status === "executing"

  const handleClickLogin = (data: LoginFormSchema) => {
    execute(data)
  }

  return (
    <motion.div
      className='flex max-h-screen min-h-screen w-full items-center justify-center overflow-hidden dark:bg-gray-950'
      animate={{ opacity: 1, transform: "translateY(0)" }}
      initial={{ opacity: 0, transform: "translateY(40px)" }}
    >
      <form
        onSubmit={handleSubmit(handleClickLogin)}
        className='max-w-96 space-y-8 rounded-lg border bg-background px-8 py-6 shadow-lg dark:bg-gray-900'
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
            isDisabled={isLoading}
            isLoading={isLoading}
          >
            {isLoading ? "Logging in" : "Login"}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
export default LoginPage
