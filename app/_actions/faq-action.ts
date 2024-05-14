"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { createFaqFormSchema, deleteFaqFormSchema, updateFaqFormSchema } from "@/_lib/form-schema"
import { IFaq } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchAllFaqs = async () => {
    const res = await FETCH.get<IFaq[]>(API_ROUTES.FAQ.GET_FAQS, {
        next: {
            tags: [CACHE_KEY.FAQ.GET_ALL]
        },
        cookies
    })
    if (!res.success) redirect("/" + res.statusCode)
    return res
}

export const fetchFaqById = async (id: string) => {
    const res = await FETCH.get<IFaq>(API_ROUTES.FAQ.GET_FAQ.replace(":id", id), {
        next: {
            tags: [[CACHE_KEY.FAQ.GET_BY_ID, id].join(", ")]
        },
        cookies
    })
    if (!res.success) redirect("/" + res.statusCode)
    return res
}

export const createFaq = safeAction
    .metadata({
        actionName: "Create Faq"
    })
    .schema(createFaqFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.post<IFaq>(API_ROUTES.FAQ.CREATE_FAQ, parsedInput, {
            cookies
        })
        if (res.success) {
            revalidateTag(CACHE_KEY.FAQ.GET_ALL)
        }
        return res
    })

export const updateFaq = safeAction
    .metadata({
        actionName: "Update Faq"
    })
    .schema(updateFaqFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.put<IFaq>(API_ROUTES.FAQ.UPDATE_FAQ.replace(":id", parsedInput._id!), parsedInput, {
            cookies
        })
        if (res.success) {
            revalidateTag(CACHE_KEY.FAQ.GET_ALL)
        }
        return res
    })

export const deleteFaq = safeAction
    .metadata({
        actionName: "Delete Faq"
    })
    .schema(deleteFaqFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.delete<IFaq>(API_ROUTES.FAQ.DELETE_FAQ.replace(":id", parsedInput), {
            cookies
        })
        if (res.success) {
            revalidateTag(CACHE_KEY.FAQ.GET_ALL)
        }
        return res
    })
