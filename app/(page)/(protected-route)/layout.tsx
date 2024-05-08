"use client"
import { IUser } from "@/_lib/interfaces"
import { useGetMeQuery } from "@/_services"
import { useUserStore } from "@/_store"
import { PropsWithChildren, useEffect } from "react"
import { Sidebar, Topbar } from "./_components"

const Layout = ({ children }: PropsWithChildren) => {
    const { userInfo, setUserInfo } = useUserStore()
    const { data, isFetched, isSuccess } = useGetMeQuery({
        enabled: userInfo === undefined
    })

    useEffect(() => {
        isFetched && (isSuccess ? setUserInfo(data as IUser) : setUserInfo(null))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetched, isSuccess])

    return (
        <div className='flex max-h-screen min-h-screen'>
            <Sidebar />
            <div className='flex h-screen max-h-screen min-h-screen flex-1 flex-col overflow-hidden'>
                <Topbar />
                <div className='flex-1 overflow-auto bg-gray-50 p-2 md:p-6'>{children}</div>
            </div>
        </div>
    )
}

export default Layout
