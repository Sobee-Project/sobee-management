/* eslint-disable tailwindcss/classnames-order */
"use client"
import { APP_COLORS } from "@/app/_constants"
import { useSidebarContext } from "@/app/_context"
import { Tooltip } from "@nextui-org/react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight, Dot } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import React, { useCallback, useState } from "react"
import { TSidebar } from "."

const SidebarItem = ({ href = "#", icon: Icon = Dot, title, items = [], hasSeparator = false }: TSidebar) => {
    const { expand: sidebarExpand } = useSidebarContext()

    const hasItems = items.length > 0

    const router = useRouter()
    const pathname = usePathname()

    const isLinkActive = pathname.includes(href)

    const [expanded, setExpanded] = useState(isLinkActive)

    const handleExpand = () => {
        if (!hasItems) return router.push(href)
        setExpanded((prev) => !prev)
    }

    const onHover = useCallback(() => {
        if (!hasItems || sidebarExpand) return
        setExpanded(true)
    }, [hasItems, sidebarExpand])

    const onLeave = useCallback(() => {
        if (!hasItems || sidebarExpand) return
        setExpanded(false)
    }, [hasItems, sidebarExpand])

    return (
        <>
            {hasSeparator && <div className='border-t border-gray-200' />}
            <div onMouseEnter={onHover} onMouseLeave={onLeave}>
                <Tooltip content={title} placement='right-start' isDisabled={sidebarExpand}>
                    <button
                        onClick={handleExpand}
                        className={`hover:inner-border-small flex w-full items-center justify-between gap-2 rounded px-4 py-2 hover:bg-gray-100 ${sidebarExpand ? "flex-row" : "flex-col"}`}
                    >
                        <Icon size={20} color={isLinkActive ? APP_COLORS.primary : "#000"} />
                        {sidebarExpand && (
                            <h4
                                className={`flex-1 text-left font-bold`}
                                style={{
                                    color: isLinkActive ? APP_COLORS.primary : "#000"
                                }}
                            >
                                {title}
                            </h4>
                        )}
                        {hasItems && sidebarExpand && (
                            <motion.div
                                animate={{ rotate: expanded ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                                exit={{ opacity: 0 }}
                            >
                                <ChevronRight size={20} color={APP_COLORS.primary} />
                            </motion.div>
                        )}
                    </button>
                </Tooltip>
                {expanded && (
                    <motion.div
                        className={sidebarExpand ? "pl-4" : "pl-0"}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.2 }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {items.map((item, index) => (
                            <SidebarItem key={index} {...item} />
                        ))}
                    </motion.div>
                )}
            </div>
        </>
    )
}

export default SidebarItem
