"use client"
import { APP_ROUTES } from "@/_constants"
import { useAuthStore } from "@/_store"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

type Props = {
    children: React.ReactNode
}
export function AuthGuard({ children }: Props) {
    const router = useRouter()
    const { isAuthenticated, setAuthenticating } = useAuthStore()
    const [canRenderChildren, setCanRenderChildren] = useState(false)

    const check = useCallback(() => {
        if (!isAuthenticated) {
            router.replace(APP_ROUTES.LOGIN)
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
