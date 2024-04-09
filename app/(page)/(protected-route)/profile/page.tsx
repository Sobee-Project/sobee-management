"use client"
import { useUserStore } from "@/_store"
import React from "react"

const Page = () => {
    const { userInfo } = useUserStore()
    return <div>{JSON.stringify(userInfo)}</div>
}

export default Page
