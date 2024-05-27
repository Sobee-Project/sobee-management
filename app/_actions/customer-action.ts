"use server"

import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { createCustomerFormSchema, deleteCustomerFormSchema, updateCustomerFormSchema } from "@/_lib/form-schema"
import { ICustomer, IUser } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchAllCustomer = async () => {
  const res = await FETCH.get<IUser<ICustomer>[]>(API_ROUTES.CUSTOMER.GET_CUSTOMERS, {
    cookies,
    next: {
      tags: [CACHE_KEY.CUSTOMER.GET_ALL]
    }
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const fetchCustomerById = async (id: string) => {
  const res = await FETCH.get<IUser<ICustomer>>(API_ROUTES.CUSTOMER.GET_CUSTOMER.replace(":id", id), {
    cookies,
    next: {
      tags: [[CACHE_KEY.CUSTOMER.GET_BY_ID, id].join(", ")]
    }
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const createCustomer = safeAction
  .metadata({
    actionName: "Create Customer"
  })
  .schema(createCustomerFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.post<IUser>(API_ROUTES.CUSTOMER.CREATE_CUSTOMER, parsedInput, {
      cookies
    })
    if (res.success) {
      revalidateTag(CACHE_KEY.CUSTOMER.GET_ALL)
      return res
    }
    return res
  })

export const updateCustomer = safeAction
  .metadata({
    actionName: "Update Customer"
  })
  .schema(updateCustomerFormSchema)
  .action(async ({ parsedInput }) => {
    console.log(parsedInput)

    const res = await FETCH.put<IUser>(
      API_ROUTES.CUSTOMER.UPDATE_CUSTOMER.replace(":id", parsedInput._id!),
      parsedInput,
      {
        cookies
      }
    )

    if (res.success) {
      revalidateTag(CACHE_KEY.CUSTOMER.GET_ALL)
      revalidateTag([CACHE_KEY.CUSTOMER.GET_BY_ID, parsedInput._id!].join(", "))
      return res
    }
    return res
  })

export const banCustomer = safeAction
  .metadata({
    actionName: "Ban Customer"
  })
  .schema(deleteCustomerFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.put(
      API_ROUTES.CUSTOMER.BAN.replace(":id", parsedInput!),
      {},
      {
        cookies
      }
    )
    if (res.success) {
      revalidateTag(CACHE_KEY.CUSTOMER.GET_ALL)
      revalidateTag([CACHE_KEY.CUSTOMER.GET_BY_ID, parsedInput!].join(", "))
    }
    return res
  })

export const unbanCustomer = safeAction
  .metadata({
    actionName: "Ban Customer"
  })
  .schema(deleteCustomerFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.put(
      API_ROUTES.CUSTOMER.UNBAN.replace(":id", parsedInput!),
      {},
      {
        cookies
      }
    )
    if (res.success) {
      revalidateTag(CACHE_KEY.CUSTOMER.GET_ALL)
      revalidateTag([CACHE_KEY.CUSTOMER.GET_BY_ID, parsedInput!].join(", "))
    }
    return res
  })

export const deleteCustomer = safeAction
  .metadata({
    actionName: "Delete Customer"
  })
  .schema(deleteCustomerFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.delete(API_ROUTES.CUSTOMER.DELETE_CUSTOMER.replace(":id", parsedInput), {
      cookies
    })
    if (res.success) {
      revalidateTag(CACHE_KEY.CUSTOMER.GET_ALL)
    }
    return res
  })
