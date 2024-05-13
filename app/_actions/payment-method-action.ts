"use server"

import { API_ROUTES, APP_ROUTES, CACHE_KEY } from "@/_constants"
import {
    createPaymentMethodFormSchema,
    deletePaymentMethodFormSchema,
    updatePaymentMethodFormSchema
} from "@/_lib/form-schema"
import { IPaymentMethod } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchAllPaymentMethods = async () => {
    const res = await FETCH.get<IPaymentMethod[]>(API_ROUTES.PAYMENT_METHOD.GET_PAYMENT_METHODS, {
        next: {
            tags: [CACHE_KEY.PAYMENT_METHOD.GET_ALL]
        },
        cookies
    })
    if (!res.success) redirect("/" + res.statusCode)
    return res
}

export const fetchPaymentMethodById = async (id: string) => {
    const res = await FETCH.get<IPaymentMethod>(API_ROUTES.PAYMENT_METHOD.GET_PAYMENT_METHOD.replace(":id", id), {
        next: {
            tags: [[CACHE_KEY.PAYMENT_METHOD.GET_BY_ID, id].join(", ")]
        },
        cookies
    })
    if (!res.success) redirect("/" + res.statusCode)
    return res
}

export const createPaymentMethod = safeAction
    .metadata({
        actionName: "Create PaymentMethod"
    })
    .schema(createPaymentMethodFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.post<IPaymentMethod>(API_ROUTES.PAYMENT_METHOD.CREATE_PAYMENT_METHOD, parsedInput, {
            cookies
        })
        if (res.success) {
            revalidateTag(CACHE_KEY.PAYMENT_METHOD.GET_ALL)
            return res
        }
        return res
    })

export const updatePaymentMethod = safeAction
    .metadata({
        actionName: "Update PaymentMethod"
    })
    .schema(updatePaymentMethodFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.put<IPaymentMethod>(
            API_ROUTES.PAYMENT_METHOD.UPDATE_PAYMENT_METHOD.replace(":id", parsedInput._id!),
            parsedInput,
            {
                cookies
            }
        )
        if (res.success) {
            revalidateTag([CACHE_KEY.PAYMENT_METHOD.GET_BY_ID, parsedInput._id!].join(", "))
        }
        return res
    })

export const deletePaymentMethod = safeAction
    .metadata({
        actionName: "Delete PaymentMethod"
    })
    .schema(deletePaymentMethodFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.delete<IPaymentMethod>(
            API_ROUTES.PAYMENT_METHOD.DELETE_PAYMENT_METHOD.replace(":id", parsedInput),
            {
                cookies
            }
        )
        if (res.success) {
            revalidateTag(CACHE_KEY.PAYMENT_METHOD.GET_ALL)
            return res
        }
        return res
    })
