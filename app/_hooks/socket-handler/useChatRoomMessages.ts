"use client"
import { SOCKET_CLIENT_MESSAGE, SOCKET_SERVER_MESSAGE } from "@/_constants"
import { IChatMessage, IChatRoom } from "@/_lib/interfaces"
import { SucccessResponse } from "@/_lib/types"
import { useState } from "react"
import { useSocket } from "./useSocket"

type MessageAndRoom = {
  chatRoomId: string
  message: IChatMessage
}

export const useChatRoomMessages = (roomId: string) => {
  const [messages, setMessages] = useState<IChatMessage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const socket = useSocket((socket) => {
    socket.emit(SOCKET_CLIENT_MESSAGE.VIEW_ROOM_CHAT, { chatRoomId: roomId })
    socket.on(SOCKET_SERVER_MESSAGE.VIEW_ROOM_CHAT_RESULT, (data: SucccessResponse<IChatRoom>) => {
      setMessages(data.data.messages)
      setIsLoading(false)
    })

    socket.on(SOCKET_SERVER_MESSAGE.CREATE_CHAT_MESSAGE_RESULT, (message: SucccessResponse<IChatMessage>) => {
      setMessages((prev) => [...prev, message.data!])
    })

    socket.on(SOCKET_SERVER_MESSAGE.NEW_CHAT_MESSAGE, (room: MessageAndRoom) => {
      if (room.chatRoomId === roomId) {
        setMessages((prev) => [...prev, room.message])
      }
    })

    socket.on(SOCKET_SERVER_MESSAGE.ERROR, (err: Error) => {
      setIsLoading(false)
      setError(err.message)
    })
  })

  return { messages, error, isLoading, isError: !!error }
}
