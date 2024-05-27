"use server"

import { API_ROUTES, APP_ROUTES, CACHE_KEY } from "@/_constants"
import { createShippingFormSchema, deleteShippingFormSchema, updateShippingFormSchema } from "@/_lib/form-schema"
import { IShipping } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchAllShippings = async () => {
  const res = await FETCH.get<IShipping[]>(API_ROUTES.SHIPPING.GET_SHIPPINGS, {
    next: {
      tags: [CACHE_KEY.SHIPPING.GET_ALL]
    },
    cookies
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const fetchShippingById = async (id: string) => {
  const res = await FETCH.get<IShipping>(API_ROUTES.SHIPPING.GET_SHIPPING.replace(":id", id), {
    next: {
      tags: [[CACHE_KEY.SHIPPING.GET_BY_ID, id].join(", ")]
    },
    cookies
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const createShipping = safeAction
  .metadata({
    actionName: "Create Shipping"
  })
  .schema(createShippingFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.post<IShipping>(API_ROUTES.SHIPPING.CREATE_SHIPPING, parsedInput, {
      cookies
    })
    if (res.success) {
      revalidateTag(CACHE_KEY.SHIPPING.GET_ALL)
      return res
    }
    return res
  })

export const updateShipping = safeAction
  .metadata({
    actionName: "Update Shipping"
  })
  .schema(updateShippingFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.put<IShipping>(
      API_ROUTES.SHIPPING.UPDATE_SHIPPING.replace(":id", parsedInput._id!),
      parsedInput,
      {
        cookies
      }
    )
    if (res.success) {
      revalidateTag([CACHE_KEY.SHIPPING.GET_BY_ID, parsedInput._id!].join(", "))
    }
    return res
  })

export const deleteShipping = safeAction
  .metadata({
    actionName: "Delete Shipping"
  })
  .schema(deleteShippingFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.delete<IShipping>(API_ROUTES.SHIPPING.DELETE_SHIPPING.replace(":id", parsedInput), {
      cookies
    })
    if (res.success) {
      revalidateTag(CACHE_KEY.SHIPPING.GET_ALL)
      return res
    }
    return res
  })
