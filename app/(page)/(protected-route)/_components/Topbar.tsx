"use client"
import { getCurrentUser, logout } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { useSidebarStore, useUserStore } from "@/_store"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react"
import { motion } from "framer-motion"
import { LogOut, PanelTopClose, SearchIcon, SunIcon, User2 } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import toast from "react-hot-toast"

const Topbar = () => {
    const { isOpen, toggleSidebar } = useSidebarStore()
    const { isRefetch } = useUserStore()

    const { execute: executeUser, result } = useAction(getCurrentUser)

    useEffect(() => {
        executeUser()
    }, [executeUser, isRefetch])

    const userInfo = result.data?.data?.user

    const { execute } = useAction(logout, {
        onSuccess: ({ data }) => {
            if (data.success) {
                toast.success("Logged out successfully")
            } else {
                toast.error(data.message || "Failed to logout")
            }
        }
    })

    const onClickLogout = () => {
        execute()
    }

    return (
        <div className='flex h-20 items-center gap-4 border-b-1 border-l-1 bg-white p-4'>
            <motion.button
                onClick={toggleSidebar}
                initial={{ rotate: 90 }}
                animate={{ rotate: isOpen ? -90 : 90 }}
                transition={{ duration: 0.2 }}
                exit={{ rotate: 0 }}
            >
                <PanelTopClose className='hover:text-primary' />
            </motion.button>
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
                    <button className='grid size-10 place-items-center rounded-full bg-primary-50 p-1'>
                        {userInfo?.avatar ? (
                            <Image
                                src={userInfo.avatar}
                                alt={userInfo.name}
                                width={40}
                                height={40}
                                className='w-full rounded-full object-cover'
                            />
                        ) : (
                            <User2 size={20} />
                        )}
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
                    <DropdownItem as={Link} href={APP_ROUTES.PROFILE} key='new' endContent={<User2 size={14} />}>
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
