import { Sidebar } from "@/_components"
import React, { PropsWithChildren } from "react"

const layout = ({ children }: PropsWithChildren) => {
    return (
        <div className='flex max-h-screen min-h-screen'>
            <Sidebar />
            <div className='h-screen max-h-screen min-h-screen flex-1 overflow-auto p-8'>{children}</div>
        </div>
    )
}

export default layout
