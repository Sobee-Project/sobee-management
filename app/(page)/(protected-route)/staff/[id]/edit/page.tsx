import { fetchAllRoles, fetchRoleById, fetchStaffById, fetchTaxById } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { ParamsProps } from "@/_lib/params"
import { Button, Divider } from "@nextui-org/react"
import { ChevronLeft, Eye } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import React from "react"
import { StaffForm } from "../../_components"

const page = async ({ params }: ParamsProps) => {
  const id = params.id
  const res = await fetchStaffById(id)
  const resRole = await fetchAllRoles()

  const data = res.data!

  return (
    <div className='space-y-6'>
      <div className='mt-4 flex items-center justify-between gap-8'>
        <Link href={APP_ROUTES.STAFF.INDEX} className='p-2'>
          <ChevronLeft className='text-slate-500' />
        </Link>
        <h1 className='line-clamp-1 flex-1 text-lg font-semibold md:text-2xl'>
          Update Staff <span className='text-primary'>{data.name}</span>
        </h1>
        <Button
          startContent={<Eye size={20} />}
          variant='solid'
          color='primary'
          as={Link}
          href={APP_ROUTES.STAFF.ID.replace(":id", data._id!)}
        >
          View
        </Button>
      </div>
      <Divider />
      <StaffForm roles={resRole.data!} type='edit' staff={data} />
    </div>
  )
}

export default page
