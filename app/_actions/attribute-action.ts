"use server"

import { API_ROUTES, APP_ROUTES, CACHE_KEY } from "@/_constants"
import { createAttributeFormSchema, deleteAttributeFormSchema, updateAttributeFormSchema } from "@/_lib/form-schema"
import { IAttribute } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchAllAttributes = async () => {
    const res = await FETCH.get<IAttribute[]>(API_ROUTES.ATTRIBUTE.GET_ATTRIBUTES, {
        next: {
            tags: [CACHE_KEY.ATTRIBUTE.GET_ALL]
        },
        cookies
    })
    if (!res.success) redirect("/" + res.statusCode)
    return res
}

export const fetchAttributeById = async (id: string) => {
    const res = await FETCH.get<IAttribute>(API_ROUTES.ATTRIBUTE.GET_ATTRIBUTE.replace(":id", id), {
        next: {
            tags: [[CACHE_KEY.ATTRIBUTE.GET_BY_ID, id].join(", ")]
        },
        cookies
    })
    if (!res.success) redirect("/" + res.statusCode)
    return res
}

export const createAttribute = safeAction
    .metadata({
        actionName: "Create Attribute"
    })
    .schema(createAttributeFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.post<IAttribute>(API_ROUTES.ATTRIBUTE.CREATE_ATTRIBUTE, parsedInput, {
            cookies
        })
        if (res.success) {
            revalidateTag(CACHE_KEY.ATTRIBUTE.GET_ALL)
            return res
        }
        return res
    })

export const updateAttribute = safeAction
    .metadata({
        actionName: "Update Attribute"
    })
    .schema(updateAttributeFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.put<IAttribute>(
            API_ROUTES.ATTRIBUTE.UPDATE_ATTRIBUTE.replace(":id", parsedInput._id!),
            parsedInput,
            {
                cookies
            }
        )
        if (res.success) {
            revalidateTag([CACHE_KEY.ATTRIBUTE.GET_BY_ID, parsedInput._id!].join(", "))
        }
        return res
    })

export const deleteAttribute = safeAction
    .metadata({
        actionName: "Delete Attribute"
    })
    .schema(deleteAttributeFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.delete<IAttribute>(API_ROUTES.ATTRIBUTE.DELETE_ATTRIBUTE.replace(":id", parsedInput), {
            cookies
        })
        if (res.success) {
            revalidateTag(CACHE_KEY.ATTRIBUTE.GET_ALL)
            return res
        }
        return res
    })
