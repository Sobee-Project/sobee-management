"use client"
import { APP_ROUTES } from "@/_constants"
import { cn } from "@/_lib/utils"
import { useSidebarStore } from "@/_store"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { SidebarGroupItem, SidebarProps, sidebarMock } from "."

const Sidebar = ({}: SidebarProps) => {
    const { isOpen: expand, toggleSidebar: toggleExpand } = useSidebarStore()

    return (
        <div className='flex h-screen max-h-screen flex-col'>
            <div
                className={cn(
                    "bg-whtie flex min-h-20 items-center border-b-1",
                    expand ? "justify-start px-6" : "justify-center px-4"
                )}
            >
                <div className='flex w-full items-center justify-center'>
                    <Link href={APP_ROUTES.DASHBOARD}>
                        <Image
                            src={expand ? "/logo_text_light.png" : "/logo.svg"}
                            width={expand ? 140 : 30}
                            height={expand ? 140 : 30}
                            alt='Logo'
                            priority
                            className='object-contain'
                        />
                    </Link>
                </div>
            </div>
            <motion.div
                className={cn(
                    `flex h-screen max-h-screen flex-col gap-4 overflow-y-auto border-r-1 scrollbar-thin`,
                    expand ? "p-6" : "p-2"
                )}
                initial={{ width: expand ? "20rem" : "auto" }}
                animate={{ width: expand ? "20rem" : "auto" }}
                transition={{ duration: 0.2 }}
                exit={{ width: "20rem" }}
            >
                <div className={cn("flex flex-col", expand ? "gap-6" : "gap-4")}>
                    {sidebarMock.map((item) => (
                        <SidebarGroupItem {...item} key={item.title} />
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

export default Sidebar
