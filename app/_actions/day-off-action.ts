"use server"

import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { EDayOffStatus } from "@/_lib/enums"
import {
  UpdateDayOffStatusFormSchema,
  createDayOffFormSchema,
  deleteDayOffFormSchema,
  updateDayOffFormSchema,
  updateDayOffStatusFormSchema
} from "@/_lib/form-schema"
import { IDayOff, IRole } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchAllDayOffs = async () => {
  const res = await FETCH.get<IDayOff[]>(API_ROUTES.DAY_OFF.GET_DAY_OFFS, {
    next: {
      tags: [CACHE_KEY.DAY_OFF.GET_ALL]
    },
    cookies
  })

  if (!res.success) redirect("/" + res.statusCode)

  return res
}

export const fetchDayOffById = async (id: string) => {
  const res = await FETCH.get<IDayOff>(API_ROUTES.DAY_OFF.GET_DAY_OFF.replace(":id", id), {
    next: {
      tags: [[CACHE_KEY.DAY_OFF.GET_BY_ID, id].join(", ")]
    },
    cookies
  })

  if (!res.success) redirect("/" + res.statusCode)

  return res
}

export const createDayOff = safeAction
  .metadata({
    actionName: "Create Day Off"
  })
  .schema(createDayOffFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.post<IDayOff>(API_ROUTES.DAY_OFF.CREATE_DAY_OFF, parsedInput, {
      cookies
    })

    if (res.success) {
      revalidateTag(CACHE_KEY.DAY_OFF.GET_ALL)
      return res
    }

    return res
  })

export const updateDayOff = safeAction
  .metadata({
    actionName: "Update Day Off"
  })
  .schema(updateDayOffFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.put<IDayOff>(
      API_ROUTES.DAY_OFF.UPDATE_DAY_OFF.replace(":id", parsedInput._id!),
      parsedInput,
      {
        cookies
      }
    )

    if (res.success) {
      revalidateTag([CACHE_KEY.DAY_OFF.GET_BY_ID, parsedInput._id!].join(", "))
      return res
    }

    return res
  })

export const updateDayOffStatus = safeAction
  .metadata({
    actionName: "Update Day Off Status"
  })
  .schema(updateDayOffStatusFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.put<{ status: EDayOffStatus }>(
      API_ROUTES.DAY_OFF.UPDATE_DAY_OFF.replace(":id", parsedInput._id),
      {
        status: parsedInput.status as EDayOffStatus
      },
      {
        cookies
      }
    )

    if (res.success) {
      revalidateTag(CACHE_KEY.DAY_OFF.GET_ALL)
      return res
    }

    return res
  })

export const deleteDayOff = safeAction
  .metadata({
    actionName: "Delete Day Off"
  })
  .schema(deleteDayOffFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.delete(API_ROUTES.DAY_OFF.DELETE_DAY_OFF.replace(":id", parsedInput), {
      cookies
    })

    if (res.success) {
      revalidateTag(CACHE_KEY.DAY_OFF.GET_ALL)
      return res
    }

    return res
  })
