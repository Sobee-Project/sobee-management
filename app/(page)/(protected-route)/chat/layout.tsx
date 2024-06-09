import { CACHE_KEY } from "@/_constants"
import React from "react"
import { PageHeader } from "../_components"
import ChatRooms from "./_components/ChatRooms"

const layout = ({ children }: any) => {
  return (
    <div>
      <PageHeader title='Order Contact' keyCache={CACHE_KEY.ORDER.GET_ALL} />
      <div className='flex h-screen max-h-[calc(100vh-250px)]'>
        <ChatRooms />
        <div className='max-h-full flex-1 overflow-auto'>{children}</div>
      </div>
    </div>
  )
}

export default layout
