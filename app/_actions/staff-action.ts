"use server"

import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { createStaffFormSchema, deleteStaffFormSchema, updateStaffFormSchema } from "@/_lib/form-schema"
import { IRole, IStaff, IUser } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchAllStaff = async () => {
  const res = await FETCH.get<IUser<IStaff>[]>(API_ROUTES.STAFF.GET_STAFF, {
    cookies,
    next: {
      tags: [CACHE_KEY.STAFF.GET_ALL]
    }
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const fetchStaffById = async (id: string) => {
  const res = await FETCH.get<IUser<IStaff>>(API_ROUTES.STAFF.GET_ONE_STAFF.replace(":id", id), {
    cookies,
    next: {
      tags: [[CACHE_KEY.STAFF.GET_BY_ID, id].join(", ")]
    }
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const createStaff = safeAction
  .metadata({
    actionName: "Create Staff"
  })
  .schema(createStaffFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.post<IUser>(API_ROUTES.STAFF.CREATE_STAFF, parsedInput, {
      cookies
    })
    if (res.success) {
      revalidateTag(CACHE_KEY.STAFF.GET_ALL)
      return res
    }
    return res
  })

export const updateStaff = safeAction
  .metadata({
    actionName: "Update Staff"
  })
  .schema(updateStaffFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.put<IUser>(API_ROUTES.STAFF.UPDATE_STAFF.replace(":id", parsedInput._id!), parsedInput, {
      cookies
    })
    if (res.success) {
      revalidateTag([CACHE_KEY.STAFF.GET_BY_ID, parsedInput._id!].join(", "))
      return res
    }
    return res
  })

export const deleteStaff = safeAction
  .metadata({
    actionName: "Delete Staff"
  })
  .schema(deleteStaffFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.delete(API_ROUTES.STAFF.DELETE_STAFF.replace(":id", parsedInput), {
      cookies
    })
    if (res.success) {
      revalidateTag(CACHE_KEY.STAFF.GET_ALL)
    }
    return res
  })
