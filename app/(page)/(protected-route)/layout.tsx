"use client"
import { Sidebar } from "@/_components"
import { IUser } from "@/_lib/interfaces"
import { useGetMeQuery } from "@/_services"
import { useUserStore } from "@/_store"
import { PropsWithChildren, useEffect } from "react"
import { Topbar } from "./_components"

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
            <div className='h-screen max-h-screen min-h-screen flex-1 space-y-6 overflow-auto p-6'>
                <Topbar />
                {children}
            </div>
        </div>
    )
}

export default Layout
