import { LucideIcon } from "lucide-react"

type TSidebar = {
    icon?: LucideIcon
    title: string
    href?: string
    items?: TSidebar[]
    hasSeparator?: boolean
}

type SidebarProps = {}

export type { SidebarProps, TSidebar }
