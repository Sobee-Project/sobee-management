import { fetchRoleById, fetchTaxById } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { ParamsProps } from "@/_lib/params"
import { Button, Divider } from "@nextui-org/react"
import { ChevronLeft, Eye } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import React from "react"
import { RoleForm } from "../../_components"

const page = async ({ params }: ParamsProps) => {
    const id = params.id
    const res = await fetchRoleById(id)

    const data = res.data!

    return (
        <div className='space-y-6'>
            <div className='mt-4 flex items-center justify-between gap-8'>
                <Link href={APP_ROUTES.ROLES.INDEX} className='p-2'>
                    <ChevronLeft className='text-slate-500' />
                </Link>
                <h1 className='flex-1 text-2xl font-semibold'>
                    Update Role <span className='text-primary'>{res.data?.role_name}</span>
                </h1>
                <Button
                    startContent={<Eye size={20} />}
                    variant='solid'
                    color='primary'
                    as={Link}
                    href={APP_ROUTES.ROLES.ID.replace(":id", data._id!)}
                >
                    View
                </Button>
            </div>
            <Divider />
            <RoleForm role={data} type='edit' />
        </div>
    )
}

export default page
