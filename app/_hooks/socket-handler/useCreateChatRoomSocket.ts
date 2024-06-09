"use client"
import { SOCKET_CLIENT_MESSAGE, SOCKET_SERVER_MESSAGE } from "@/_constants"
import { IChatRoom } from "@/_lib/interfaces"
import { SucccessResponse } from "@/_lib/types"
import { useState } from "react"
import { useSocket } from "./useSocket"

export const useCreateChatRoomSocket = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<IChatRoom | null>(null)

  const socket = useSocket((socket) => {
    socket.on(SOCKET_SERVER_MESSAGE.CREATE_CHAT_RESULT, (room: SucccessResponse<IChatRoom>) => {
      setIsLoading(false)
      setIsSuccess(true)
      setData(room.data)
    })

    socket.on(SOCKET_SERVER_MESSAGE.ERROR, (err: Error) => {
      setIsLoading(false)
      setError(err.message)
    })
  })

  const createRoom = (orderId: string) => {
    setIsLoading(true)
    socket?.emit(SOCKET_CLIENT_MESSAGE.CREATE_CHAT, {
      orderId
    })
  }

  return { data, isSuccess, error, isError: !!error, isLoading, createRoom }
}
