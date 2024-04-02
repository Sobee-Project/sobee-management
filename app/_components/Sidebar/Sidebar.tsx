"use client"
import { APP_ROUTES } from "@/_constants"
import { useSidebarStore } from "@/_store"
import { Button } from "@nextui-org/react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight, ChevronsRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { SidebarItem, SidebarProps, sidebarMock } from "."

const Sidebar = ({}: SidebarProps) => {
    const { isOpen: expand, toggleSidebar: toggleExpand } = useSidebarStore()

    return (
        <>
            <motion.div
                className={`flex flex-col gap-4 shadow-md ${expand ? "p-8" : "p-4"}`}
                initial={{ width: expand ? "20rem" : "auto" }}
                animate={{ width: expand ? "20rem" : "auto" }}
                transition={{ duration: 0.2 }}
                exit={{ width: "20rem" }}
            >
                <motion.button
                    onClick={toggleExpand}
                    className={`p-2 ${expand ? "self-end" : "flex items-center justify-center self-center"} rounded hover:bg-primary-50`}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: expand ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    exit={{ rotate: 0 }}
                >
                    <ChevronsRight size={20} />
                </motion.button>
                <div className='flex flex-col gap-4'>
                    <Link href={APP_ROUTES.DASHBOARD} className='self-center'>
                        <Image src='/logo.png' width={expand ? 140 : 30} height={expand ? 140 : 30} alt='Logo' />
                    </Link>
                    <div className='flex flex-col gap-4'>
                        {sidebarMock.map((item) => (
                            <SidebarItem {...item} key={item.title} />
                        ))}
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Sidebar
