"use client"
import { ScreenLoader } from "@/_components"
import { useChatRoomSocket } from "@/_hooks"
import { Spinner } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import RoomItem from "./RoomItem"

const ChatRooms = () => {
  const { data, error, isLoading, isError } = useChatRoomSocket()
  useEffect(() => {
    if (isError) {
      toast.error(error)
    }
  }, [error, isError])

  return (
    <div className='max-h-full w-full max-w-80 space-y-2 overflow-auto border-r p-4'>
      {isLoading ? (
        <Spinner />
      ) : data.length > 0 ? (
        data.map((room) => <RoomItem key={room._id} room={room} />)
      ) : (
        <div>No chat rooms found</div>
      )}
    </div>
  )
}

export default ChatRooms
