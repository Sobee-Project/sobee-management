"use server"
import { API_ROUTES, APP_ROUTES, CACHE_KEY, COOKIES_KEY } from "@/_constants"
import { ERole } from "@/_lib/enums"
import {
  ChangePasswordFormSchema,
  LoginFormSchema,
  changePasswordFormSchema,
  loginFormSchema
} from "@/_lib/form-schema"
import { IUser } from "@/_lib/interfaces"
import { AuthResponse } from "@/_lib/types"
import { FETCH } from "@/_services"
import { clearCredentialsFromCookie, safeAction, setCredentialsToCookie } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const setCookies = async (data: { accessToken: string; refreshToken: string; user_id: string }) => {
  const cookieData = cookies()
  cookieData.set(COOKIES_KEY.ACCESS_TOKEN_KEY, data.accessToken)
  cookieData.set(COOKIES_KEY.REFRESH_TOKEN_KEY, data.refreshToken)
  cookieData.set(COOKIES_KEY.USER_ID_KEY, data.user_id)
}

export const getCurrentUser = async () => {
  const res = await FETCH.get<{
    user: IUser
  }>(API_ROUTES.AUTH.GET_ME, {
    cookies,
    cache: "reload",
    next: {
      tags: [CACHE_KEY.AUTH.GET_ME]
    }
  })
  return res
}

export const login = safeAction
  .metadata({
    actionName: "Login"
  })
  .schema(loginFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.post<LoginFormSchema, AuthResponse>(API_ROUTES.AUTH.LOGIN, parsedInput, { cookies })
    if (res.success) {
      if (res.data?.user.role === ERole.CUSTOMER) {
        return res
      }
      const { accessToken, refreshToken, user } = res.data!
      setCookies({ accessToken, refreshToken, user_id: user._id! })
      redirect(APP_ROUTES.DASHBOARD)
    }
    return res
  })

export const logout = safeAction
  .metadata({
    actionName: "Logout"
  })
  .action(async () => {
    const res = await FETCH.post<any, AuthResponse>(API_ROUTES.AUTH.LOGOUT, undefined, {
      cookies
    })
    if (res.success) {
      clearCredentialsFromCookie(cookies)
      revalidateTag(CACHE_KEY.AUTH.GET_ME)
      redirect(APP_ROUTES.LOGIN)
    }
    return res
  })

export const changePassword = safeAction
  .metadata({ actionName: "Change password" })
  .schema(changePasswordFormSchema)
  .action(async ({ parsedInput }) => {
    const res = await FETCH.put<ChangePasswordFormSchema, AuthResponse>(API_ROUTES.AUTH.CHANGE_PASSWORD, parsedInput, {
      cookies
    })
    if (res.success) {
      revalidateTag(CACHE_KEY.AUTH.GET_ME)
    }
    return res
  })
