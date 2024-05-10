"use server"
import { API_ROUTES, CACHE_KEY } from "@/_constants"
import { changeAvatarFormSchema, updateUserFormSchema } from "@/_lib/form-schema"
import { IUser } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const updateUser = safeAction
    .metadata({ actionName: "Update User" })
    .schema(updateUserFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.put<Partial<IUser>>(API_ROUTES.USER.UPDATE, parsedInput, {
            cookies
        })
        if (res.success) {
            revalidateTag(CACHE_KEY.AUTH.GET_ME)
        }
        return res
    })

export const changeAvatar = safeAction
    .metadata({ actionName: "Change Avatar" })
    .schema(changeAvatarFormSchema)
    .action(async ({ parsedInput }) => {
        const res = await FETCH.put<unknown, IUser>(API_ROUTES.USER.CHANGE_AVATAR, parsedInput, {
            cookies
        })
        if (res.success) {
            revalidateTag(CACHE_KEY.AUTH.GET_ME)
        }
        return res
    })
