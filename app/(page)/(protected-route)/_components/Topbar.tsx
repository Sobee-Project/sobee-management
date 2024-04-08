"use client"
import { APP_ROUTES } from "@/_constants"
import { useLogoutMutation } from "@/_services"
import { clearCredentialsFromCookie, getUserInfoFromCookie } from "@/_utils/storage"
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react"
import { LogOut, SearchIcon, SunIcon, User, User2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import toast from "react-hot-toast"

const Topbar = () => {
    const logoutMutation = useLogoutMutation()
    const router = useRouter()
    const userInfo = getUserInfoFromCookie()

    const onClickProfile = () => {
        router.push(APP_ROUTES.PROFILE)
    }

    const onClickLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                clearCredentialsFromCookie()
                toast.success("Logged out successfully")
                router.replace(APP_ROUTES.LOGIN)
            },
            onError: () => {
                toast.error("Failed to logout")
            }
        })
    }

    return (
        <div className='flex items-center gap-4'>
            <Input
                variant='bordered'
                className='flex-1 cursor-pointer'
                placeholder='Search...'
                endContent={<SearchIcon onClick={() => console.log(1)} />}
            />
            <button>
                <SunIcon />
            </button>
            <Dropdown>
                <DropdownTrigger>
                    <button className='rounded-full bg-primary-50 p-2'>
                        <User2 size={20} />
                    </button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label='Static Actions'
                    topContent={
                        <p className='p-2 font-semibold'>
                            {userInfo?.name} - {userInfo?.role}
                        </p>
                    }
                >
                    <DropdownItem key='new' endContent={<User2 size={14} />} onClick={onClickProfile}>
                        Profile
                    </DropdownItem>
                    <DropdownItem
                        key='logout'
                        className='text-danger'
                        color='danger'
                        endContent={<LogOut size={14} />}
                        onClick={onClickLogout}
                    >
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default Topbar
