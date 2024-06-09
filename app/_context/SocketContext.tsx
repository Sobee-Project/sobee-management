import { SOCKET_STATUS } from "@/_constants"
import { PropsWithChildren, createContext, useContext, useState } from "react"
import { Socket } from "socket.io-client"

interface ISocketContext {
  socket: Socket | null
  setSocket: (newSocket: Socket | null) => void
  socketStatus: string
  setSocketStatus: (newStatus: string) => void
}

const SocketContext = createContext<ISocketContext>({
  socket: null,
  setSocket: (newSocket: Socket | null) => {},
  socketStatus: "IDLE",
  setSocketStatus: (newStatus: string) => {}
})

export const useSocketContext = () => {
  const context = useContext(SocketContext)

  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider")
  }

  return context
}

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const [socket, setSocket] = useState<null | Socket>(null)
  const [socketStatus, setSocketStatus] = useState<string>(SOCKET_STATUS.IDLE)

  const value = {
    socket,
    setSocket,
    socketStatus,
    setSocketStatus
  }

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

export { SocketContext }
