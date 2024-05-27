import { APP_ROUTES } from "@/_constants"
import { IRole, IStaff, IUser } from "@/_lib/interfaces"
import { Button, Divider } from "@nextui-org/react"
import { format } from "date-fns"
import { Cake, Key, LucideIcon, Mail, Phone, SquarePen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type Props = {
  staff: IUser<IStaff>
}

const StaffProfile = ({ staff }: Props) => {
  const staffUser = staff._user as IStaff
  const staffRole = staffUser.staffRole as IRole

  const renderIconWithText = (Icon: LucideIcon, text: string) => {
    return (
      <div className='flex items-center gap-2'>
        <Icon size={16} />
        <span>{text}</span>
      </div>
    )
  }

  return (
    <div>
      <div className='h-40 rounded-md bg-gradient-to-tr from-slate-200/50 to-slate-300 md:h-80' />
      <div className='px-4'>
        <Image
          src={staff.avatar}
          alt={staff.name}
          width={200}
          height={200}
          className='-mt-14 size-28 rounded-full border border-primary-100 bg-white object-cover p-2 shadow-lg lg:-mt-20 lg:size-40'
        />
        <h1 className='my-4 text-2xl font-semibold'>{staff.name}</h1>
        <div className='flex flex-wrap items-end justify-between gap-4'>
          <div className='flex flex-1 flex-col flex-nowrap gap-4 md:flex-row md:flex-wrap md:items-center'>
            {renderIconWithText(Mail, staff.email)}
            {renderIconWithText(Phone, staff.phoneNumber)}
            {renderIconWithText(Cake, format(staff.dateOfBirth || new Date(), "dd/MM/yyyy"))}
          </div>
          <Button
            startContent={<SquarePen size={20} />}
            variant='solid'
            color='primary'
            as={Link}
            href={APP_ROUTES.STAFF.EDIT.replace(":id", staff._id!)}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StaffProfile
