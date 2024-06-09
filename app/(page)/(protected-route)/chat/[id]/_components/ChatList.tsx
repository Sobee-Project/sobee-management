"use client"
import { useChatRoomMessages } from "@/_hooks"
import { Spinner } from "@nextui-org/react"
import React, { useEffect, useRef } from "react"
import toast from "react-hot-toast"
import ChatItem from "./ChatItem"

type Props = {
  roomId: string
}

const ChatList = ({ roomId }: Props) => {
  const { error, isError, isLoading, messages } = useChatRoomMessages(roomId)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isError) {
      toast.error(error)
    }
  }, [error, isError])

  useEffect(() => {
    if (messages.length > 0) listRef.current?.scrollIntoView({ behavior: "instant" })
  }, [messages])

  if (isLoading)
    return (
      <div className='flex items-center justify-center p-4'>
        <Spinner />
      </div>
    )

  return (
    <div className='flex flex-col gap-1 overflow-auto p-4 pt-20'>
      {messages.length > 0 ? (
        messages.map((message) => <ChatItem key={message._id} chat={message} />)
      ) : (
        <p className='text-center text-sm text-foreground-500'>No messages</p>
      )}
      <div ref={listRef} />
    </div>
  )
}

export default ChatList
