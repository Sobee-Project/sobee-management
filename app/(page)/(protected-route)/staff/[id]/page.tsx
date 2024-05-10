import { fetchStaffById } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { ParamsProps } from "@/_lib/params"
import { Button, Divider } from "@nextui-org/react"
import { ChevronLeft, SquarePen } from "lucide-react"
import Link from "next/link"
import React from "react"
import { StaffAnalytics, StaffProfile, StaffSince } from "./_components"

const page = async ({ params }: ParamsProps) => {
    const id = params.id
    const res = await fetchStaffById(id)
    const data = res.data!
    return (
        <div className='space-y-6'>
            <StaffProfile staff={data} />
            <div className='flex flex-col gap-6 md:flex-row'>
                <StaffSince staff={data} />
                <StaffAnalytics />
            </div>
        </div>
    )
}

export default page
