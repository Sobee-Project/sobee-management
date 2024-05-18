import { IStaff, IUser } from "@/_lib/interfaces"
import { getCredentialsFromCookie } from "@/_utils"
import { Avatar, Select, SelectItem, SelectProps } from "@nextui-org/react"
import { UserRound } from "lucide-react"
import React, { ReactElement, forwardRef } from "react"

type StaffSelectProps = {
    staffList: IUser<IStaff>[]
} & Omit<SelectProps, "items" | "renderValue" | "children">

// eslint-disable-next-line react/display-name
const StaffSelect = forwardRef<HTMLSelectElement, StaffSelectProps>(({ staffList, ...props }, ref) => {
    const currentStaffId = getCredentialsFromCookie().user_id as string
    const RenderStaff = (staff: IUser<IStaff>) => (
        <div key={staff._id} className='flex items-center gap-2'>
            <Avatar src={staff.avatar} size='sm' fallback={<UserRound size={20} />} showFallback />
            <div className='flex-1 space-y-1'>
                <p>{staff.name}</p>
                <p className='line-clamp-1 text-xs text-slate-500'>
                    {staff.email} - {staff.phoneNumber}
                </p>
            </div>
        </div>
    )

    return (
        <Select
            ref={ref}
            items={staffList}
            selectionMode='single'
            disallowEmptySelection
            label='Staff'
            placeholder='Select staff'
            classNames={{
                label: "group-data-[filled=true]:-translate-y-5",
                trigger: "min-h-16",
                listboxWrapper: "max-h-[400px]"
            }}
            renderValue={(items) => items.map((item) => <RenderStaff {...item.data!} key={item.data?._id} />)}
            disabledKeys={[currentStaffId]}
            {...props}
        >
            {(staff) => (
                <SelectItem key={staff._id!} value={staff._id}>
                    <RenderStaff {...staff} />
                </SelectItem>
            )}
        </Select>
    )
})

export default StaffSelect
