/* eslint-disable tailwindcss/classnames-order */
"use client"
import { APP_COLORS } from "@/_constants"
import { cn } from "@/_lib/utils"
import { useSidebarStore } from "@/_store"
import { Tooltip } from "@nextui-org/react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight, Dot } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import React, { useCallback, useEffect, useState } from "react"
import { TSidebar, TSidebarMeta } from "."

const SidebarItem = ({ href = "#", icon: Icon = Dot, title, items = [] }: TSidebar) => {
  const { isOpen: sidebarExpand } = useSidebarStore()

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

  const SubItem = ({ title, href, icon }: TSidebarMeta) => {
    const isSubLinkActive = pathname === href
    const SubIcon = icon ?? Dot
    return (
      <Link
        href={href ?? "#"}
        key={title}
        className={`group flex w-full items-center justify-between gap-2 rounded px-4 py-2 transition-colors`}
      >
        {sidebarExpand && (
          <SubIcon
            size={20}
            className={cn("group-hover:text-primary", isSubLinkActive ? "text-primary" : "text-slate-700")}
          />
        )}
        <h4
          className={cn(
            `flex-1 text-left group-hover:text-primary`,
            isSubLinkActive ? "font-semibold text-primary" : "font-normal text-slate-700",
            "text-sm"
          )}
        >
          {title}
        </h4>
      </Link>
    )
  }

  return (
    <>
      <div onMouseEnter={onHover} onMouseLeave={onLeave}>
        <Tooltip
          content={
            hasItems ? (
              <div>
                {items.map((subItem, index) => (
                  <SubItem {...subItem} key={subItem.title} />
                ))}
              </div>
            ) : (
              title
            )
          }
          placement='right-start'
          isDisabled={sidebarExpand || !hasItems}
        >
          <button
            onClick={handleExpand}
            className={cn(
              `group flex w-full items-center justify-between gap-2 rounded px-4 py-2 transition-colors  hover:bg-primary-50`,
              isLinkActive && "bg-primary-50 inner-border-small ",
              sidebarExpand && "mb-1"
            )}
          >
            <Icon
              size={20}
              className={cn("group-hover:text-primary", isLinkActive ? "text-primary" : "text-slate-700")}
            />
            {sidebarExpand && (
              <h4
                className={cn(
                  `flex-1 text-left text-sm  group-hover:text-primary`,
                  isLinkActive ? "font-semibold text-primary" : "font-normal text-slate-700"
                )}
              >
                {title}
              </h4>
            )}
            {hasItems && sidebarExpand && (
              <motion.div animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }} exit={{ opacity: 0 }}>
                <ChevronRight size={20} className={"text-slate-700 group-hover:text-primary"} />
              </motion.div>
            )}
          </button>
        </Tooltip>
        {sidebarExpand && expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, height: 0 }}
          >
            {items.map((item, index) => (
              <SubItem key={index} {...item} />
            ))}
          </motion.div>
        )}
      </div>
    </>
  )
}

export default SidebarItem
