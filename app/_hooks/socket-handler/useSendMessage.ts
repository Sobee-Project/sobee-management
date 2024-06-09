import { SOCKET_CLIENT_MESSAGE, SOCKET_SERVER_MESSAGE } from "@/_constants"
import { useState } from "react"
import { useSocket } from "./useSocket"

export const useSendMessage = (roomId: string) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const socket = useSocket(
    (socket) => {
      socket.on(SOCKET_SERVER_MESSAGE.CREATE_CHAT_MESSAGE_RESULT, () => {
        setIsLoading(false)
        setIsSuccess(true)
      })

      socket.on(SOCKET_SERVER_MESSAGE.ERROR, (err: Error) => {
        console.log(err)
        setIsLoading(false)
        setError(err.message)
      })
    },
    [roomId]
  )

  const sendMessage = (content: string) => {
    // setIsLoading(true)
    socket?.emit(SOCKET_CLIENT_MESSAGE.CREATE_CHAT_MESSAGE, {
      chatRoomId: roomId,
      message: content
    })
  }

  return { sendMessage, isSuccess, error, isLoading, isError: !!error }
}
