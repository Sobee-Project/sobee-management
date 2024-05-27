"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { createTermFormSchema, deleteTermFormSchema, updateTermFormSchema } from "@/_lib/form-schema"
import { ITerm } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchAllTerms = async () => {
  const res = await FETCH.get<ITerm[]>(API_ROUTES.TERM.GET_TERMS, {
    next: {
      tags: [CACHE_KEY.TERM.GET_ALL]
    },
    cookies
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const fetchTermById = async (id: string) => {
  const res = await FETCH.get<ITerm>(API_ROUTES.TERM.GET_TERM.replace(":id", id), {
    next: {
      tags: [[CACHE_KEY.TERM.GET_BY_ID, id].join(", ")]
    },
    cookies
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const createTerm = safeAction
  .metadata({
    actionName: "Create Term"
  })
  .schema(createTermFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.post<ITerm>(API_ROUTES.TERM.CREATE_TERM, parsedInput, {
      cookies
    })
    if (res.success) {
      revalidateTag(CACHE_KEY.TERM.GET_ALL)
    }
    return res
  })

export const updateTerm = safeAction
  .metadata({
    actionName: "Update Term"
  })
  .schema(updateTermFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.put<ITerm>(API_ROUTES.TERM.UPDATE_TERM.replace(":id", parsedInput._id!), parsedInput, {
      cookies
    })
    if (res.success) {
      revalidateTag(CACHE_KEY.TERM.GET_ALL)
      revalidateTag([CACHE_KEY.TERM.GET_BY_ID, parsedInput._id!].join(", "))
    }
    return res
  })

export const deleteTerm = safeAction
  .metadata({
    actionName: "Delete Term"
  })
  .schema(deleteTermFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.delete<ITerm>(API_ROUTES.TERM.DELETE_TERM.replace(":id", parsedInput), {
      cookies
    })
    if (res.success) {
      revalidateTag(CACHE_KEY.TERM.GET_ALL)
      revalidateTag([CACHE_KEY.TERM.GET_BY_ID, parsedInput].join(", "))
    }
    return res
  })
