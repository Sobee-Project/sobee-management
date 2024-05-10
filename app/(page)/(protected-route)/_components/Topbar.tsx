"use client"
import { APP_ROUTES } from "@/_constants"
import { useLogoutMutation } from "@/_services"
import { useSidebarStore, useUserStore } from "@/_store"
import { clearCredentialsFromCookie } from "@/_utils/storage"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react"
import { motion } from "framer-motion"
import { LogOut, PanelTopClose, SearchIcon, SunIcon, User2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const Topbar = () => {
    const logoutMutation = useLogoutMutation()
    const router = useRouter()
    const { userInfo, setUserInfo } = useUserStore()
    const { isOpen, toggleSidebar } = useSidebarStore()

    const onClickProfile = () => {
        router.push(APP_ROUTES.PROFILE)
    }

    const onClickLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                clearCredentialsFromCookie()
                setUserInfo(null)
                toast.success("Logged out successfully")
                router.replace(APP_ROUTES.LOGIN)
            },
            onError: () => {
                toast.error("Failed to logout")
            }
        })
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
