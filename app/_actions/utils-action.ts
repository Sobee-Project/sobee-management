"use server"
import { COOKIES_KEY } from "@/_constants"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

const revalidateTagSchema = z.string()
export const revalidateTagAction = safeAction.schema(revalidateTagSchema).action(async ({ parsedInput }) => {
  revalidateTag(parsedInput)
})

export const invalidateCookies = safeAction.metadata({ actionName: "Invalidate cookies" }).action(async () => {
  const cookieData = cookies()
  cookieData.delete(COOKIES_KEY.ACCESS_TOKEN_KEY)
  cookieData.delete(COOKIES_KEY.REFRESH_TOKEN_KEY)
  cookieData.delete(COOKIES_KEY.USER_ID_KEY)
})
