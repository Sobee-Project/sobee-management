/* eslint-disable tailwindcss/classnames-order */
"use client"
import Image from "next/image"
import { ChangePasswordForm, SimpleInfoSection, UpdateUserInfoForm, UserInfoSection } from "./_components"

const Page = () => {
    return (
        <div className='grid grid-cols-[40%_auto] gap-4'>
            <div className='flex flex-col gap-4'>
                <SimpleInfoSection />
                <UserInfoSection />
                <div className='grid flex-1 place-items-center rounded-md bg-white shadow-custom-light'>
                    <Image src={"/logo.png"} alt='logo' width={140} height={140} className='object-cover' />
                </div>
            </div>
            <div className='space-y-4'>
                <UpdateUserInfoForm />
                <ChangePasswordForm />
            </div>
        </div>
    )
}
export default Page
