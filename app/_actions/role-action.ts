"use server"

import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { createRoleFormSchema, deleteRoleFormSchema, updateRoleFormSchema } from "@/_lib/form-schema"
import { IRole } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchAllRoles = async () => {
  const res = await FETCH.get<IRole[]>(API_ROUTES.ROLE.GET_ROLES, {
    next: {
      tags: [CACHE_KEY.ROLE.GET_ALL]
    },
    cookies
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const fetchRoleById = async (id: string) => {
  const res = await FETCH.get<IRole>(API_ROUTES.ROLE.GET_ROLE.replace(":id", id), {
    next: {
      tags: [[CACHE_KEY.ROLE.GET_BY_ID, id].join(", ")]
    },
    cookies
  })
  if (!res.success) redirect("/" + res.statusCode)
  return res
}

export const createRole = safeAction
  .metadata({
    actionName: "Create Role"
  })
  .schema(createRoleFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.post<IRole>(API_ROUTES.ROLE.CREATE_ROLE, parsedInput, {
      cookies
    })
    if (res.success) {
      revalidateTag(CACHE_KEY.ROLE.GET_ALL)
      return res
    }
    return res
  })

export const updateRole = safeAction
  .metadata({
    actionName: "Update Role"
  })
  .schema(updateRoleFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.put<IRole>(API_ROUTES.ROLE.UPDATE_ROLE.replace(":id", parsedInput._id!), parsedInput, {
      cookies
    })
    if (res.success) {
      revalidateTag([CACHE_KEY.ROLE.GET_BY_ID, parsedInput._id!].join(", "))
    }
    return res
  })

export const deleteRole = safeAction
  .metadata({
    actionName: "Delete Role"
  })
  .schema(deleteRoleFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.delete<IRole>(API_ROUTES.ROLE.DELETE_ROLE.replace(":id", parsedInput), {
      cookies
    })
    if (res.success) {
      revalidateTag(CACHE_KEY.ROLE.GET_ALL)
      return res
    }
    return res
  })
