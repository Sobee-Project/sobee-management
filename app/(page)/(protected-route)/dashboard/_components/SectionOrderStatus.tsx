"use client"
import { fetchTotalOrderByStatus } from "@/_actions/analytics-action"
import { ITotalOrderByStatus } from "@/_lib/interfaces"
import { cn } from "@/_lib/utils"
import { Button } from "@nextui-org/react"
import { motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"
import OrderStatusWidget from "./OrderStatusWidget"

const SectionOrderStatus = () => {
  const [activeTimeFrame, setActiveTimeFrame] = useState(1)
  const [orderDataRange, setOrderDataRange] = useState<ITotalOrderByStatus>({
    delivered: 0,
    pickingUp: 0,
    pending: 0,
    delivering: 0,
    completed: 0,
    canceled: 0,
    total: 0
  })
  const timeFrame = [
    { name: "Today", day: 1 },
    { name: "Last Week", day: 7 },
    { name: "Last Month", day: 30 },
    { name: "Last Year", day: 365 }
  ]

  const endDate = new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString()

  const fetchOrderData = useCallback(async () => {
    const startDate = new Date(new Date().setDate(new Date().getDate() - activeTimeFrame)).toLocaleDateString()
    // fetch order data
    const res = await fetchTotalOrderByStatus(startDate, endDate)
    if (res.success) {
      setOrderDataRange(res.data!)
    }
  }, [activeTimeFrame, endDate])

  useEffect(() => {
    fetchOrderData()
  }, [fetchOrderData, activeTimeFrame])

  return (
    <>
      <div className='col-span-full rounded-lg border border-foreground-300 p-6 md:p-7'>
        <div className='mb-5 items-center justify-between sm:flex md:mb-7'>
          <h3 className='relative mt-1 text-lg font-semibold text-gray-800 before:absolute before:-left-6 before:-top-px before:h-7 before:w-1 before:rounded-r-md before:bg-primary-500 before:content-[""] dark:text-gray-200 dark:before:bg-primary-600 md:before:-left-6 md:before:-top-0.5 lg:before:h-8'>
            Order Status
          </h3>
          <div className='mt-3.5 inline-flex rounded-full bg-gray-200/80 p-1.5 dark:bg-gray-500/80 sm:mt-0'>
            {timeFrame
              ? timeFrame.map((time) => (
                  <div key={time.day} className='relative'>
                    <button
                      className={cn(
                        "!focus:ring-0  relative z-10 !h-7 rounded-full !px-2.5 text-sm font-medium text-gray-500 dark:text-gray-200",
                        time.day === activeTimeFrame ? "text-primary-400 dark:text-primary-600" : ""
                      )}
                      onClick={() => setActiveTimeFrame(time.day)}
                    >
                      {time.name}
                    </button>
                    {time.day === activeTimeFrame ? (
                      <motion.div className='absolute inset-x-0 bottom-0 z-0 h-full rounded-3xl bg-primary-600/10 dark:bg-primary-400/20' />
                    ) : null}
                  </div>
                ))
              : null}
          </div>
        </div>
        <OrderStatusWidget data={orderDataRange} />
      </div>
    </>
  )
}
export default SectionOrderStatus
