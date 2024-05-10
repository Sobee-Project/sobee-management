import { fetchAllRoles } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { Divider } from "@nextui-org/react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import React from "react"
import { StaffForm } from "../_components"

const page = async () => {
    const resRole = await fetchAllRoles()
    return (
        <div className='space-y-6'>
            <div className='mt-4 flex items-center gap-8'>
                <Link href={APP_ROUTES.STAFF.INDEX} className='p-2'>
                    <ChevronLeft className='text-slate-500' />
                </Link>
                <h1 className='text-2xl font-semibold'>Create Staff</h1>
            </div>
            <Divider />
            <StaffForm roles={resRole.data!} />
        </div>
    )
}

export default page
