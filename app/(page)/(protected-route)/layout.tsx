import { getCurrentUser } from "@/_actions"
import { PropsWithChildren } from "react"
import { Sidebar, Topbar } from "./_components"

const Layout = async ({ children }: PropsWithChildren) => {
  const res = await getCurrentUser()
  const user = res.data!.user
  return (
    <div className='flex max-h-screen min-h-screen'>
      <Sidebar />
      <div className='flex h-screen max-h-screen min-h-screen flex-1 flex-col overflow-hidden'>
        <Topbar user={user} />
        <div className='flex-1 overflow-auto bg-gray-50 p-2 md:p-6'>{children}</div>
      </div>
    </div>
  )
}

export default Layout
