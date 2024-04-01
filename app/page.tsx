import { redirect } from "next/navigation"
import React from "react"
import { APP_ROUTES } from "./_constants"

const page = () => {
    const isAuthenticated = true
    if (isAuthenticated) {
        redirect(APP_ROUTES.DASHBOARD)
    }
    return <div>Not authenticated</div>
}

export default page
