"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { IOrder } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchAllOrders = async (query?: any) => {
  const res = await FETCH.get<IOrder[]>(API_ROUTES.ORDER.GET_ALL, {
    cache: "reload",
    next: {
      tags: [CACHE_KEY.ORDER.GET_ALL]
    },
    cookies,
    params: query
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const fetchOrderById = async (id: string) => {
  const res = await FETCH.get<IOrder>(API_ROUTES.ORDER.GET_ORDER.replace(":id", id), {
    cache: "reload",
    next: {
      tags: [[CACHE_KEY.ORDER.GET_BY_ID, id].join(",")]
    },
    cookies
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}
