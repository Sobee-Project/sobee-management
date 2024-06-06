import { Spinner } from "@nextui-org/react"
import dynamic from "next/dynamic"
import Timer from "./Timer"

type PageHeaderProps = {
  title: string
  keyCache?: string
}

const PageHeader = ({ title, keyCache }: PageHeaderProps) => {
  return (
    <div
      className='mb-5 flex flex-col gap-5 rounded-lg border border-foreground-200 bg-background !p-5 md:mb-[26px] md:!p-[26px]
    lg:flex-row lg:items-center lg:gap-4 lg:!py-5'
    >
      <h1 className='flex-1 text-center text-4xl font-bold lg:text-left'>{title}</h1>
      <Timer keyCache={keyCache} />
    </div>
  )
}
export default PageHeader
