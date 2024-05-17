"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import {
    CreateCouponFormSchema,
    UpdateCouponFormSchema,
    createCouponFormSchema,
    deleteCouponFormSchema,
    updateCouponFormSchema
} from "@/_lib/form-schema"
import { ICoupon } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const fetchAllCoupons = async () => {
    const res = await FETCH.get<ICoupon[]>(API_ROUTES.COUPON.GET_COUPONS, {
        next: {
            tags: [CACHE_KEY.COUPON.GET_ALL]
        },
        cookies
    })
    if (!res.success) redirect("/" + res.statusCode)
    return res
}

export const fetchCouponById = async (id: string) => {
    const res = await FETCH.get<ICoupon>(API_ROUTES.COUPON.GET_COUPON.replace(":id", id), {
        next: {
            tags: [[CACHE_KEY.COUPON.GET_BY_ID, id].join(", ")]
        },
        cookies
    })
    if (!res.success) redirect("/" + res.statusCode)
    return res
}

export const createCoupon = safeAction
    .metadata({
        actionName: "Create Coupon"
    })
    .schema(createCouponFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.post<CreateCouponFormSchema, ICoupon>(API_ROUTES.COUPON.CREATE_COUPON, parsedInput, {
            cookies
        })
        if (res.success) {
            revalidateTag(CACHE_KEY.COUPON.GET_ALL)
        }
        return res
    })

export const updateCoupon = safeAction
    .metadata({
        actionName: "Update Coupon"
    })
    .schema(updateCouponFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.put<UpdateCouponFormSchema, ICoupon>(
            API_ROUTES.COUPON.UPDATE_COUPON.replace(":id", parsedInput._id!),
            parsedInput,
            {
                cookies
            }
        )
        if (res.success) {
            revalidateTag(CACHE_KEY.COUPON.GET_ALL)
            revalidateTag([CACHE_KEY.COUPON.GET_BY_ID, parsedInput._id!].join(", "))
        }
        return res
    })

export const deleteCoupon = safeAction
    .metadata({
        actionName: "Delete Coupon"
    })
    .schema(deleteCouponFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.delete<ICoupon>(API_ROUTES.COUPON.DELETE_COUPON.replace(":id", parsedInput), {
            cookies
        })
        if (res.success) {
            revalidateTag(CACHE_KEY.COUPON.GET_ALL)
            revalidateTag([CACHE_KEY.COUPON.GET_BY_ID, parsedInput].join(", "))
        }
        return res
    })

export const activeCoupon = safeAction
    .metadata({
        actionName: "Active Coupon"
    })
    .schema(deleteCouponFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.put(
            API_ROUTES.COUPON.ACTIVE_COUPON.replace(":id", parsedInput),
            {},
            {
                cookies
            }
        )
        if (res.success) {
            revalidateTag(CACHE_KEY.COUPON.GET_ALL)
            revalidateTag([CACHE_KEY.COUPON.GET_BY_ID, parsedInput].join(", "))
        }
        return res
    })

export const deactiveCoupon = safeAction
    .metadata({
        actionName: "Deactive Coupon"
    })
    .schema(deleteCouponFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.put(
            API_ROUTES.COUPON.DEACTIVE_COUPON.replace(":id", parsedInput),
            {},
            {
                cookies
            }
        )
        if (res.success) {
            revalidateTag(CACHE_KEY.COUPON.GET_ALL)
            revalidateTag([CACHE_KEY.COUPON.GET_BY_ID, parsedInput].join(", "))
        }
        return res
    })
