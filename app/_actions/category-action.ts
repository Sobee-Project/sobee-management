"use server"

import { API_ROUTES, APP_ROUTES, CACHE_KEY } from "@/_constants"
import { createCategoryFormSchema, deleteCategoryFormSchema, updateCategoryFormSchema } from "@/_lib/form-schema"
import { ICategory } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchAllCategories = async () => {
    const res = await FETCH.get<ICategory[]>(API_ROUTES.CATEGORY.GET_CATEGORIES, {
        next: {
            tags: [CACHE_KEY.CATEGORY.GET_ALL]
        },
        cookies
    })
    if (!res.success) redirect("/" + res.statusCode)
    return res
}

export const fetchCategoryById = async (id: string) => {
    const res = await FETCH.get<ICategory>(API_ROUTES.CATEGORY.GET_CATEGORY.replace(":id", id), {
        next: {
            tags: [[CACHE_KEY.CATEGORY.GET_BY_ID, id].join(", ")]
        },
        cookies
    })
    if (!res.success) redirect("/" + res.statusCode)
    return res
}

export const createCategory = safeAction
    .metadata({
        actionName: "Create Category"
    })
    .schema(createCategoryFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.post<ICategory>(API_ROUTES.CATEGORY.CREATE_CATEGORY, parsedInput, {
            cookies
        })
        if (res.success) {
            revalidateTag(CACHE_KEY.CATEGORY.GET_ALL)
            return res
        }
        return res
    })

export const updateCategory = safeAction
    .metadata({
        actionName: "Update Category"
    })
    .schema(updateCategoryFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.put<ICategory>(
            API_ROUTES.CATEGORY.UPDATE_CATEGORY.replace(":id", parsedInput._id!),
            parsedInput,
            {
                cookies
            }
        )
        if (res.success) {
            revalidateTag([CACHE_KEY.CATEGORY.GET_BY_ID, parsedInput._id!].join(", "))
        }
        return res
    })

export const deleteCategory = safeAction
    .metadata({
        actionName: "Delete Category"
    })
    .schema(deleteCategoryFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.delete<ICategory>(API_ROUTES.CATEGORY.DELETE_CATEGORY.replace(":id", parsedInput), {
            cookies
        })
        if (res.success) {
            revalidateTag(CACHE_KEY.CATEGORY.GET_ALL)
            return res
        }
        return res
    })
