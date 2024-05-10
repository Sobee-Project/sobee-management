"use client"
import { changeAvatar } from "@/_actions"
import { IUser } from "@/_lib/interfaces"
import { useUserStore } from "@/_store"
import { Button, Chip } from "@nextui-org/react"
import { Camera } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import Image from "next/image"
import React from "react"
import toast from "react-hot-toast"

type Props = {
    userInfo: IUser
}

const SimpleInfoSection = ({ userInfo }: Props) => {
    const { refetch } = useUserStore()

    const { execute, status } = useAction(changeAvatar, {
        onSuccess: ({ data }) => {
            if (data.success) {
                toast.success(data.message)
                refetch()
            } else {
                toast.error(data.message || "Failed to change avatar")
            }
        }
    })

    const isLoading = status === "executing"

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append("upload_file", file)

        execute(formData)
    }
    return (
        <div className='flex flex-col items-center justify-center gap-4 rounded-md bg-white p-8 shadow-custom-light'>
            <div className='relative size-24 rounded-full'>
                <Image
                    src={userInfo?.avatar!}
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
                    isLoading={isLoading}
                    isDisabled={isLoading}
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
