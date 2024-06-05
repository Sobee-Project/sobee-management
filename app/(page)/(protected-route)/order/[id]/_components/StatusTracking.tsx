import { EOrderStatus } from "@/_lib/enums"
import { cn } from "@/_lib/utils"
import { Check } from "lucide-react"
import React, { useMemo } from "react"

type Props = {
  status: EOrderStatus
}

const StatusTracking = ({ status: _status }: Props) => {
  const status = EOrderStatus.CANCELED
  const statuses = Object.values(EOrderStatus)
  const modifiedStatuses =
    status === EOrderStatus.CANCELED
      ? statuses.slice(0, statuses.indexOf(EOrderStatus.CANCELED) + 1)
      : Object.values(EOrderStatus).filter((item) => item !== EOrderStatus.CANCELED)

  const fillIndex = modifiedStatuses.indexOf(status)
  const percent = ((fillIndex + 1) / modifiedStatuses.length) * 100

  return (
    <div>
      <div className='relative flex items-center justify-between'>
        <div className='absolute inset-0 z-0 flex items-center'>
          <div className='h-2 w-full rounded-full bg-foreground-300' />
          <div className='absolute left-0 h-2 rounded-full bg-primary' style={{ width: `${percent}%` }} />
        </div>
        {modifiedStatuses.map((item, index) => (
          <div key={item} className='relative z-[1] px-4'>
            <div
              className={cn(
                "flex size-10 items-center justify-center rounded-full border-1 border-dashed border-primary font-semibold",
                index <= fillIndex ? "bg-primary text-white" : "bg-white text-primary"
              )}
            >
              {index <= fillIndex ? <Check size={20} /> : index + 1}
            </div>
            <p className='absolute inset-x-0 mt-2 w-fit text-center'>{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatusTracking
