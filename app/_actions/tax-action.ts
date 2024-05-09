"use server"

import { API_ROUTES, APP_ROUTES, CACHE_KEY } from "@/_constants"
import { createTaxFormSchema, deleteTaxFormSchema, updateTaxFormSchema } from "@/_lib/form-schema"
import { ITax } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchAllTaxes = async () => {
    const res = await FETCH.get<ITax[]>(API_ROUTES.TAX.GET_TAXES, {
        next: {
            tags: [CACHE_KEY.TAX.GET_ALL]
        },
        cookies
    })
    return res
}

export const fetchTaxById = async (id: string) => {
    const res = await FETCH.get<ITax>(API_ROUTES.TAX.GET_TAX.replace(":id", id), {
        next: {
            tags: [[CACHE_KEY.TAX.GET_BY_ID, id].join(", ")]
        },
        cookies
    })
    return res
}

export const createTax = safeAction.schema(createTaxFormSchema).action(async ({ parsedInput }) => {
    const res = await FETCH.post<ITax>(API_ROUTES.TAX.CREATE_TAX, parsedInput, {
        cookies
    })
    if (res.success) {
        revalidateTag(CACHE_KEY.TAX.GET_ALL)
        return res
    }
    return res
})

export const updateTax = safeAction.schema(updateTaxFormSchema).action(async ({ parsedInput }) => {
    const res = await FETCH.put<ITax>(API_ROUTES.TAX.UPDATE_TAX.replace(":id", parsedInput._id!), parsedInput, {
        cookies
    })
    if (res.success) {
        revalidateTag([CACHE_KEY.TAX.GET_BY_ID, parsedInput._id!].join(", "))
    }
    return res
})

export const deleteTax = safeAction.schema(deleteTaxFormSchema).action(async ({ parsedInput }) => {
    const res = await FETCH.delete<ITax>(API_ROUTES.TAX.DELETE_TAX.replace(":id", parsedInput), {
        cookies
    })
    if (res.success) {
        revalidateTag(CACHE_KEY.TAX.GET_ALL)
        return res
    }
    return res
})
