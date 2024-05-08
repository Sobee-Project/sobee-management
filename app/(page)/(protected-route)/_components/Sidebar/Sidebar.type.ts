import { LucideIcon } from "lucide-react"

type TSidebarMeta = {
    icon?: LucideIcon
    title: string
    href?: string
}

type TSidebar = TSidebarMeta & {
    items?: TSidebarMeta[]
}

type TSidebarGroup = {
    title: string
    items: TSidebar[]
    hasSeparator?: boolean
}

type SidebarProps = {}

export type { SidebarProps, TSidebar, TSidebarGroup, TSidebarMeta }
