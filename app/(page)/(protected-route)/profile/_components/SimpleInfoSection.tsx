import { getImageFromServer } from "@/_lib/utils"
import { useChangeUserAvatarMutation } from "@/_services"
import { useUserStore } from "@/_store"
import { Button, Chip } from "@nextui-org/react"
import { Camera } from "lucide-react"
import Image from "next/image"
import React from "react"
import toast from "react-hot-toast"

const SimpleInfoSection = () => {
    const { userInfo, setUserInfo } = useUserStore()

    const changeAvatarMutation = useChangeUserAvatarMutation()

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append("upload_file", file)

        changeAvatarMutation.mutate(formData, {
            onSuccess: (data) => {
                setUserInfo(data.data.data)
                toast.success("Avatar changed successfully")
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Failed to change avatar")
            }
        })
    }
    return (
        // eslint-disable-next-line tailwindcss/classnames-order
        <div className='shadow-custom-light flex flex-col items-center justify-center gap-4 rounded-md bg-white p-8'>
            <div className='relative size-24 rounded-full'>
                <Image
                    src={getImageFromServer(userInfo?.avatar!)}
                    alt='profile'
                    width={100}
                    height={100}
                    className='size-full rounded-full object-cover'
                    objectFit='cover'
                />
                <Button
                    size='sm'
                    radius='full'
                    isIconOnly
                    className='absolute bottom-0 right-0 border-2 border-white'
                    color='primary'
                >
                    <label
                        htmlFor='file-zone'
                        className='absolute inset-0 grid size-full cursor-pointer place-items-center'
                    >
                        <Camera size={18} />
                        <input
                            id='file-zone'
                            type='file'
                            className='z-10'
                            hidden
                            accept='image/*'
                            onChange={handleAvatarChange}
                        />
                    </label>
                </Button>
            </div>
            <h2 className='text-2xl font-bold'>{userInfo?.name}</h2>
            <Chip color='default'>{userInfo?.role}</Chip>
        </div>
    )
}

export default SimpleInfoSection
