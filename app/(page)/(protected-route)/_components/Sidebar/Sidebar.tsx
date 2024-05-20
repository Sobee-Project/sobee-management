"use client"
import { APP_ROUTES, LOCAL_STORAGE_KEYS } from "@/_constants"
import { cn } from "@/_lib/utils"
import { useSidebarStore } from "@/_store"
import { Button } from "@nextui-org/react"
import { getCookie } from "cookies-next"
import { motion } from "framer-motion"
import { XIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SidebarGroupItem, SidebarProps, sidebarMock } from "."

const Sidebar = ({}: SidebarProps) => {
    const { isOpen: expand, toggleSidebar: toggleExpand } = useSidebarStore()

    return (
        <>
            {expand && <div className='fixed inset-0 z-50 size-full bg-black/50 md:hidden' onClick={toggleExpand} />}
            {expand && (
                <Button
                    className='fixed right-4 top-4 z-50 md:hidden'
                    onPress={toggleExpand}
                    isIconOnly
                    variant='solid'
                    radius='full'
                >
                    <XIcon size={20} />
                </Button>
            )}
            <div
                className={cn(
                    "fixed z-50 flex h-screen max-h-screen flex-col bg-background transition-transform md:relative md:z-auto md:transform-none",
                    expand ? "translate-x-0 transform" : "-translate-x-full transform"
                )}
            >
                <div
                    className={cn(
                        "flex min-h-20 items-center border-b-1",
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
                        expand ? "w-[20rem] p-6" : "auto p-2"
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
        </>
    )
}

export default Sidebar
