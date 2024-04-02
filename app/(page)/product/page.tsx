import { APP_ROUTES } from "@/_constants"
import { redirect } from "next/navigation"
import React from "react"

const page = () => {
    redirect(APP_ROUTES.PRODUCTS.ALL)
}

export default page
