import { Sidebar } from "@/app/_components"
import React, { PropsWithChildren } from "react"

const layout = ({ children }: PropsWithChildren) => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='max-h-screen min-h-screen flex-1 p-8'>{children}</div>
        </div>
    )
}

export default layout
