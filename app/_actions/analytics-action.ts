"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { IOrderAnalyticData, ISummaryAnalytics, ITotalOrderByStatus } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { cookies } from "next/headers"

export const fetchSummaryAnalytics = async () => {
  const res = await FETCH.get<ISummaryAnalytics>(API_ROUTES.ANALYTICS.GET_SUMMARY, {
    next: {
      revalidate: 360
    },
    cookies
  })
  // if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const fetchTotalOrderByStatus = async (startDate: string, endDate: string) => {
  const res = await FETCH.get<ITotalOrderByStatus>(API_ROUTES.ANALYTICS.GET_TOTAL_ORDER_BY_STATUS, {
    params: { startDate, endDate },
    next: {
      revalidate: 360
    },
    cookies
  })
  // if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const fetchOrderAnalytics = async (startDate: string, endDate: string) => {
  const res = await FETCH.get<IOrderAnalyticData[]>(API_ROUTES.ANALYTICS.GET_ORDER_ANALYTICS, {
    params: { startDate, endDate },
    next: {
      revalidate: 360
    },
    cookies
  })
  // if (!res.success) redirect("/" + res.statusCode)
  return res
}
