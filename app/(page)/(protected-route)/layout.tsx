import { Sidebar } from "@/_components"
import { Input } from "@nextui-org/react"

import { PropsWithChildren } from "react"
import { Topbar } from "./_components"

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className='flex max-h-screen min-h-screen'>
            <Sidebar />
            <div className='h-screen max-h-screen min-h-screen flex-1 space-y-6 overflow-auto p-6'>
                <Topbar />
                {children}
            </div>
        </div>
    )
}

export default Layout
