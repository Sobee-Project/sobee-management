import { IRole, IStaff, IUser } from "@/_lib/interfaces"
import { Divider } from "@nextui-org/react"
import { format } from "date-fns"
import React from "react"

type Props = {
  staff: IUser<IStaff>
}

const StaffSince = ({ staff }: Props) => {
  const staffUser = staff._user as IStaff
  const staffRole = staffUser.staffRole as IRole
  return (
    <div className='flex-1 rounded-lg bg-background shadow-md md:w-80 md:flex-none'>
      <div className='space-y-1 p-4'>
        <p className='text-sm text-slate-500/70'>Joined Since</p>
        <p>{format(staff.createdAt || new Date(), "LLL dd, yyyy")}</p>
      </div>
      <Divider />
      <div className='space-y-1 p-4'>
        <p className='text-sm text-slate-500/70'>Role</p>
        <p>{staffRole.role_name}</p>
      </div>
    </div>
  )
}

export default StaffSince
