import { APP_ROUTES } from "@/_constants"
import { useLogoutMutation } from "@/_services"
import { useUserStore } from "@/_store"
import { clearCredentialsFromCookie } from "@/_utils/storage"
import { Button } from "@nextui-org/react"
import { format } from "date-fns"
import { AtSign, Baby, Calendar, Download, LogOut, LucideIcon, Phone } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import toast from "react-hot-toast"

const UserInfoSection = () => {
    const { userInfo, setUserInfo } = useUserStore()

    const logoutMutation = useLogoutMutation()
    const router = useRouter()

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                clearCredentialsFromCookie()
                setUserInfo(null)
                toast.success("Logged out successfully")
                router.replace(APP_ROUTES.LOGIN)
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Failed to logout")
            }
        })
    }

    const renderItem = useCallback((Icon: LucideIcon, value: string) => {
        return (
            <div className='flex items-center gap-2'>
                <Icon size={18} className='text-primary-500' />
                <p>{value}</p>
            </div>
        )
    }, [])

    return (
        // eslint-disable-next-line tailwindcss/classnames-order
        <div className='shadow-custom-light space-y-2 rounded-md bg-white p-4'>
            {renderItem(AtSign, userInfo?.email || "")}
            {renderItem(Phone, userInfo?.phoneNumber || "")}
            {renderItem(Baby, format(userInfo?.dateOfBirth || new Date(), "dd/MM/yyyy"))}
            {renderItem(Calendar, "Joined " + format(userInfo?.createdAt || new Date(), "dd/MM/yyyy"))}
            <div className='flex gap-2'>
                <Button variant='solid' color='primary' startContent={<Download size={16} />} className='flex-1'>
                    Download personal data
                </Button>
                <Button variant='light' color='danger' onClick={handleLogout} startContent={<LogOut size={16} />}>
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default UserInfoSection
