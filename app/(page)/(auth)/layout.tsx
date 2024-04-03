"use client"

import { APP_ROUTES } from "@/_constants"
import { useAuthStore } from "@/_store"
import { useRouter } from "next/navigation"
import { PropsWithChildren, useCallback, useEffect, useState } from "react"

const AuthLayout = ({ children }: PropsWithChildren) => {
    const router = useRouter()
    const { isAuthenticated, setAuthenticating } = useAuthStore()
    const [canRenderChildren, setCanRenderChildren] = useState(false)

    const check = useCallback(() => {
        if (isAuthenticated) {
            router.replace(APP_ROUTES.DASHBOARD)
        } else {
            setCanRenderChildren(true)
        }
        setAuthenticating(false)
    }, [router, isAuthenticated])

    useEffect(() => {
        check()
    }, [check])

    if (canRenderChildren) return children
}
export default AuthLayout
