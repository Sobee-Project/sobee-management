import { useSidebarStore } from "@/_store"
import React from "react"
import { TSidebarGroup } from "./Sidebar.type"
import SidebarItem from "./SidebarItem"

const SidebarGroupItem = ({ items, title, hasSeparator }: TSidebarGroup) => {
    const { isOpen } = useSidebarStore()
    return (
        <div key={title} className='space-y-2'>
            {isOpen && <p className='font-medium uppercase text-slate-600'>{title}</p>}
            <div className='space-y-1'>
                {items.map((subItem) => (
                    <SidebarItem {...subItem} key={subItem.title} />
                ))}
            </div>
            {!isOpen && <div className='border-t border-gray-200' />}
        </div>
    )
}

export default SidebarGroupItem
