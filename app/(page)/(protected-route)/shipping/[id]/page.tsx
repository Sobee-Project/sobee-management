import { APP_ROUTES } from "@/_constants"
import { ParamsProps } from "@/_lib/params"
import { redirect } from "next/navigation"
import React from "react"

const page = ({ params }: ParamsProps) => {
    redirect(APP_ROUTES.SHIPPINGS.EDIT.replace(":id", params.id))
}

export default page
