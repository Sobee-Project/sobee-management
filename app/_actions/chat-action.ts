"use server"

import { API_ROUTES } from "@/_constants"
import { IChatRoom } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { cookies } from "next/headers"

export const fetchRoomById = async (roomId: string) => {
  const room = await FETCH.get<IChatRoom>(API_ROUTES.CHAT.GET_ROOM.replace(":id", roomId), {
    cookies
  })
  return room
}

export const createRoom = async (orderId: string) => {
  const room = await FETCH.post<any, IChatRoom>(
    API_ROUTES.CHAT.CREATE_ROOM,
    { order: orderId },
    {
      cookies
    }
  )
  return room
}
