import { fetchRoleById } from "@/_actions"
import { APP_ROUTES } from "@/_constants"
import { ParamsProps } from "@/_lib/params"
import { Button, Checkbox, CheckboxGroup, Divider } from "@nextui-org/react"
import { ChevronLeft, SquarePen } from "lucide-react"
import Link from "next/link"
import React from "react"

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
          Role <span className='text-primary'>{res.data?.role_name}</span>
        </h1>
        <Button
          startContent={<SquarePen size={20} />}
          variant='solid'
          color='primary'
          as={Link}
          href={APP_ROUTES.ROLES.EDIT.replace(":id", data._id!)}
        >
          Edit
        </Button>
      </div>
      <Divider />
      <div className='space-y-4'>
        <h3>Permissions</h3>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {data.grant_lists.map((grant) => (
            <div key={grant._id} className='space-y-1'>
              <p className='text-sm text-slate-500/70'>{grant.resource.replace(/_/g, " ")}</p>
              <CheckboxGroup value={grant.actions} isReadOnly>
                {grant.actions.map((action) => (
                  <Checkbox key={action} value={action}>
                    {action}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
