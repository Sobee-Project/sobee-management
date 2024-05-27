"use client"
import { logout } from "@/_actions"
import { IUser } from "@/_lib/interfaces"
import { Button } from "@nextui-org/react"
import { format } from "date-fns"
import { AtSign, Baby, Calendar, Download, LogOut, LucideIcon, Phone } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useCallback } from "react"
import toast from "react-hot-toast"

type Props = {
  userInfo: IUser
}

const UserInfoSection = ({ userInfo }: Props) => {
  const { execute, status } = useAction(logout, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success("Logged out successfully")
      } else {
        toast.error(data.message || "Failed to logout")
      }
    }
  })

  const isLoading = status === "executing"

  const handleLogout = () => {
    execute()
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
    <div className='space-y-2 rounded-md bg-white p-4 shadow-custom-light'>
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
