"use client"

import { useGetRoleListQuery } from "@/_services"
import { useRoleStore } from "@/_store"
import React, { useEffect } from "react"
import { RoleListData } from "./_components"

const Page = () => {
    const { isLoading, data, error, isSuccess } = useGetRoleListQuery()
    const { setRoleList } = useRoleStore()

    useEffect(() => {
        if (isSuccess && data) {
            setRoleList(data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, data])

    return (
        <div>
            <RoleListData isLoading={isLoading} />
        </div>
    )
}

export default Page
