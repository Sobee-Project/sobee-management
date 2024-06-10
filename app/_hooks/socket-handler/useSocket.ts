"use client"

import { COOKIES_KEY, ENV_CONFIG } from "@/_constants"
import { useSocketContext } from "@/_context"
import { useCookies } from "next-client-cookies"
import { useContext, useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"

export const useSocket = (onConnect?: (socket: Socket) => void, dependencies: string[] = []) => {
  const cookieData = useCookies()
  const accessToken = cookieData.get(COOKIES_KEY.ACCESS_TOKEN_KEY)
  const userId = cookieData.get(COOKIES_KEY.USER_ID_KEY)
  const { socket, setSocket } = useSocketContext()
  useEffect(() => {
    if (socket && socket.connected) {
      return
    }
    let _socket: Socket
    if (!accessToken || !userId) return
    _socket = io(ENV_CONFIG.BASE_SOCKET_URL!, {
      extraHeaders: {
        client: userId,
        token: accessToken
      }
    })

    _socket.on("connect", () => {
      setSocket(_socket)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, socket, userId, ...dependencies])

  useEffect(() => {
    if (socket) {
      onConnect?.(socket)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!socket])

  return socket
}
