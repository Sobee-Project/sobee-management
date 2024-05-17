"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { createBrandFormSchema, deleteBrandFormSchema, updateBrandFormSchema } from "@/_lib/form-schema"
import { IBrand } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchAllBrands = async () => {
    const res = await FETCH.get<IBrand[]>(API_ROUTES.BRAND.GET_BRANDS, {
        next: {
            tags: [CACHE_KEY.BRAND.GET_ALL]
        },
        cookies
    })
    if (!res.success) redirect("/" + res.statusCode)
    return res
}

export const fetchBrandById = async (id: string) => {
    const res = await FETCH.get<IBrand>(API_ROUTES.BRAND.GET_BRAND.replace(":id", id), {
        next: {
            tags: [[CACHE_KEY.BRAND.GET_BY_ID, id].join(", ")]
        },
        cookies
    })
    if (!res.success) redirect("/" + res.statusCode)
    return res
}

export const createBrand = safeAction
    .metadata({
        actionName: "Create Brand"
    })
    .schema(createBrandFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.post<IBrand>(API_ROUTES.BRAND.CREATE_BRAND, parsedInput, {
            cookies
        })
        if (res.success) {
            revalidateTag(CACHE_KEY.BRAND.GET_ALL)
        }
        return res
    })

export const updateBrand = safeAction
    .metadata({
        actionName: "Update Brand"
    })
    .schema(updateBrandFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.put<IBrand>(
            API_ROUTES.BRAND.UPDATE_BRAND.replace(":id", parsedInput._id!),
            parsedInput,
            {
                cookies
            }
        )
        if (res.success) {
            revalidateTag(CACHE_KEY.BRAND.GET_ALL)
            revalidateTag([CACHE_KEY.BRAND.GET_BY_ID, parsedInput._id!].join(", "))
        }
        return res
    })

export const deleteBrand = safeAction
    .metadata({
        actionName: "Delete Brand"
    })
    .schema(deleteBrandFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.delete<IBrand>(API_ROUTES.BRAND.DELETE_BRAND.replace(":id", parsedInput), {
            cookies
        })
        if (res.success) {
            revalidateTag(CACHE_KEY.BRAND.GET_ALL)
            revalidateTag([CACHE_KEY.BRAND.GET_BY_ID, parsedInput].join(", "))
        }
        return res
    })
