"use client"
import { COOKIES_KEY, SOCKET_CLIENT_MESSAGE, SOCKET_SERVER_MESSAGE } from "@/_constants"
import { IChatMessage, IChatRoom } from "@/_lib/interfaces"
import { ErrorResponse, SucccessResponse } from "@/_lib/types"
import { useCookies } from "next-client-cookies"
import { useEffect, useState } from "react"
import { useSocket } from "./useSocket"

type MessageAndRoom = {
  chatRoomId: string
  message: IChatMessage
}

export const useChatRoomSocket = () => {
  const [data, setData] = useState<IChatRoom[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const socket = useSocket((socket) => {
    socket.emit(SOCKET_CLIENT_MESSAGE.VIEW_LIST_ROOM_CHAT)

    socket.on(SOCKET_SERVER_MESSAGE.LIST_ROOM_CHAT_RESULT, (res: SucccessResponse<IChatRoom[]>) => {
      setData(res.data)
      setIsLoading(false)
    })

    socket.on(SOCKET_SERVER_MESSAGE.ERROR, (err: Error) => {
      setError(err.message)
      setIsLoading(false)
    })

    socket.on(SOCKET_SERVER_MESSAGE.NEW_CHAT_MESSAGE, (room: MessageAndRoom) => {
      setData((prev) => {
        const index = prev.findIndex((r) => r._id === room.chatRoomId)
        if (index !== -1) {
          const newRoom = { ...prev[index], messages: [...prev[index].messages, room.message] }
          return [...prev.slice(0, index), newRoom, ...prev.slice(index + 1)]
        }
        return prev
      })
      socket.emit(SOCKET_CLIENT_MESSAGE.VIEW_USER_CHAT_ROOM)
      socket.emit(SOCKET_CLIENT_MESSAGE.VIEW_LIST_ROOM_CHAT)
    })

    socket.on(SOCKET_SERVER_MESSAGE.NEW_CHAT_ROOM, (room: IChatRoom) => {
      console.log("new room", room)
      setData((prev) => [room, ...prev])
    })

    socket.on(SOCKET_SERVER_MESSAGE.CREATE_CHAT_RESULT, (room: SucccessResponse<IChatRoom>) => {
      console.log("new room", room)
      setData((prev) => [room.data, ...prev])
    })
  }, [])

  return { data, error, isError: !!error, isLoading }
}
