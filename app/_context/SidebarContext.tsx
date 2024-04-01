"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { LOCAL_STORAGE_KEYS } from "../_constants"

interface ISidebarContext {
    expand: boolean
    toggleExpand: () => void
}

export const SidebarContext = createContext<ISidebarContext | null>(null)

export const useSidebarContext = () => {
    const context = useContext(SidebarContext)
    if (!context) {
        throw new Error("useSidebarContext must be used within SidebarProvider")
    }
    return context
}
const DEFAULT_OPEN = true

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
    const [expand, setExpand] = useState<boolean>(DEFAULT_OPEN)

    useEffect(() => {
        const v = localStorage.getItem(LOCAL_STORAGE_KEYS.SIDEBAR_DEFAULT_OPEN)
        if (v) {
            setExpand(JSON.parse(v))
        }
    }, [])

    const toggleExpand = () => {
        setExpand((prev) => !prev)
        localStorage.setItem(LOCAL_STORAGE_KEYS.SIDEBAR_DEFAULT_OPEN, JSON.stringify(!expand))
    }

    const value = {
        expand,
        toggleExpand
    }

    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}
