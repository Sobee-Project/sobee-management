"use client"
import { EOrderStatus } from "@/_lib/enums"
import { cn } from "@/_lib/utils"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import React, { useMemo } from "react"

type Props = {
  status: EOrderStatus
}

const StatusTracking = ({ status }: Props) => {
  const modifiedStatuses =
    status === EOrderStatus.CANCELED
      ? [EOrderStatus.PENDING, EOrderStatus.CANCELED]
      : Object.values(EOrderStatus).filter((item) => item !== EOrderStatus.CANCELED)

  const fillIndex = modifiedStatuses.indexOf(status)
  const percent = ((fillIndex + 1) / modifiedStatuses.length) * 100

  return (
    <div>
      <div className='relative flex items-center justify-between'>
        <div className='absolute inset-0 z-0 flex items-center'>
          <div className='h-2 w-full rounded-full bg-foreground-300' />
          <motion.div
            className='absolute left-0 h-2 rounded-full bg-primary'
            style={{ width: `${percent}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        {modifiedStatuses.map((item, index) => (
          <div key={item} className='relative z-[1] px-4'>
            <motion.div
              className={cn(
                "flex size-10 items-center justify-center rounded-full border-1 border-dashed border-primary font-semibold",
                index <= fillIndex ? "bg-primary text-white" : "bg-white text-primary"
              )}
              style={{ width: 40, height: 40 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {index <= fillIndex ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  exit={{ opacity: 0 }}
                >
                  <Check size={20} />
                </motion.div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  exit={{ opacity: 0 }}
                >
                  {index + 1}
                </motion.p>
              )}
            </motion.div>
            <p className='absolute inset-x-0 mt-2 w-fit text-center'>{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatusTracking
