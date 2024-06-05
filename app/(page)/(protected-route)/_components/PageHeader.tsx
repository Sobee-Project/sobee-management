"use client"
import { revalidateTagAction } from "@/_actions"
import { format } from "date-fns"
import { RotateCw } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

type PageHeaderProps = {
  title: string
  keyCache?: string
}

const PageHeader = ({ title, keyCache }: PageHeaderProps) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  const { execute } = useAction(revalidateTagAction, {
    onSuccess: () => {
      toast.success("Data refreshed successfully")
    }
  })
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [currentTime])

  return (
    <div
      className='mb-5 flex flex-col gap-5 rounded-lg border border-foreground-200 bg-background !p-5 md:mb-[26px] md:!p-[26px]
    lg:flex-row lg:items-center lg:gap-4 lg:!py-5'
    >
      <h1 className='flex-1 text-center text-4xl font-bold lg:text-left'>{title}</h1>
      <button
        className='group hidden w-fit items-center gap-2 text-sm
           font-semibold xl:flex'
        onClick={() => {
          keyCache && execute(keyCache)
        }}
      >
        Data Refresh
        <RotateCw size={16} className=' group-hover:animate-spin' />
      </button>
      <div
        className=' flex h-11 items-center justify-center rounded-md
       border border-foreground-200 px-9 text-sm font-bold lg:w-[310px]'
      >
        {format(currentTime, "MMMM d, yyyy HH")}
        <span className='animate-pulse'>:</span>
        {format(currentTime, "mm:ss a")}
      </div>
    </div>
  )
}
export default PageHeader
