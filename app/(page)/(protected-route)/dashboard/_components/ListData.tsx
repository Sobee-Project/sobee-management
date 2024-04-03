"use client"
import { useAuthStore } from "@/_store"
import React, { useEffect } from "react"

const ListData = () => {
    const { userInfo } = useAuthStore()
    useEffect(() => {
        console.log(userInfo)
    }, [userInfo])

    return <div className=''></div>
}

export default ListData
