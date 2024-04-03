"use client"
import { Sidebar } from "@/_components"
import { AuthGuard } from "@/_hooks"
import { useGetMeQuery } from "@/_services"
import { useAuthStore } from "@/_store"

import React, { PropsWithChildren, useEffect } from "react"

const Layout = ({ children }: PropsWithChildren) => {
    const { setUserInfo, reset } = useAuthStore()
    const { data, isSuccess, isError, isFetched } = useGetMeQuery()

    useEffect(() => {
        if (isFetched && isSuccess) {
            setUserInfo(data)
        }
        isFetched && !isSuccess && isError && reset()
    }, [data, isSuccess, isError, isFetched])

    return (
        <AuthGuard>
            <div className='flex max-h-screen min-h-screen'>
                <Sidebar />
                <div className='h-screen max-h-screen min-h-screen flex-1 overflow-auto p-8'>{children}</div>
            </div>
        </AuthGuard>
    )
}

export default Layout
