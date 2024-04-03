"use client"

import { APP_ROUTES } from "@/_constants"
import authApi from "@/_services/apis/auth.service"
import { useAuthStore } from "@/_store"

import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"

const LoginPage = () => {
    const router = useRouter()
    const [emailOrPhone, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)

    const { setUserInfo, reset } = useAuthStore()

    const loginMutation = useMutation({
        mutationFn: (body: { emailOrPhone: string; password: string }) => authApi.login(body)
    })

    const getMeMutation = useMutation({
        mutationFn: () => authApi.getMe()
    })

    const logoutMutation = useMutation({
        mutationFn: () => authApi.logout()
    })

    const handleClickLogin = () => {
        loginMutation.mutate(
            { emailOrPhone, password },
            {
                onSuccess: (response) => {
                    const { user } = response.data.data
                    setUserInfo(user)
                    router.replace(APP_ROUTES.DASHBOARD)
                },
                onError: (error) => {
                    console.log(error)
                }
            }
        )
    }

    const handleClickGetMe = () => {
        getMeMutation.mutate(undefined, {
            onSuccess: (response) => {
                const user = response.data.data
                console.log(user)
            },
            onError: (error) => {}
        })
    }

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                reset()
            }
        })
    }
    return (
        <div className='flex min-h-screen w-full items-center justify-center dark:bg-gray-950'>
            <div className='max-w-md rounded-lg bg-white px-8 py-6 shadow-md dark:bg-gray-900'>
                <h1 className='mb-4 text-center text-2xl font-bold dark:text-gray-200'>Welcome Back!</h1>
                <div>
                    <div className='mb-4'>
                        <label
                            htmlFor='email'
                            className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'
                        >
                            Email Address
                        </label>
                        <input
                            type='email'
                            id='email'
                            value={emailOrPhone}
                            onChange={(e) => setMail(e.target.value)}
                            className='w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
                            placeholder='your@email.com'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='password'
                            className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'
                        >
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
                            placeholder='Enter your password'
                            required
                        />
                        <a
                            href='#'
                            className='text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <div className='mb-4 flex items-center justify-between'>
                        <div className='flex items-center'>
                            <input
                                type='checkbox'
                                id='remember'
                                className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:outline-none focus:ring-indigo-500'
                            />
                            <label htmlFor='remember' className='ml-2 block text-sm text-gray-700 dark:text-gray-300'>
                                Remember me
                            </label>
                        </div>
                        <a
                            href='#'
                            className='text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        >
                            Create Account
                        </a>
                    </div>
                    <button
                        onClick={handleClickLogin}
                        className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                        Login
                    </button>
                    <p className='mt-4'>{isSuccess && "Login succcessfully"}</p>
                </div>
            </div>
            <div className='ml-20'>
                <div>
                    <button
                        onClick={handleClickGetMe}
                        className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                        Get Me
                    </button>
                    <p>{"aaaaa"}</p>
                </div>

                <div>
                    <button
                        onClick={handleLogout}
                        className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                        Logout
                    </button>
                    <p>{"aaaaa"}</p>
                </div>
            </div>
        </div>
    )
}
export default LoginPage
