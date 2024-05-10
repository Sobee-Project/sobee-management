import { COOKIES_KEY } from "@/_constants"
import { deleteCookie, getCookie, setCookie } from "cookies-next"
import { OptionsType } from "cookies-next/lib/types"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"

export const setDataToCookie = (key: string, value: any, options?: OptionsType) => {
    setCookie(key, value, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        cookies: options?.cookies
    })
}

export const getDataFromCookie = (key: string) => {
    return getCookie(key)
}

export const setCredentialsToCookie = (
    auth: { accessToken: string; refreshToken: string; user_id: string },
    cookies?: () => ReadonlyRequestCookies
) => {
    setDataToCookie(COOKIES_KEY.ACCESS_TOKEN_KEY, auth.accessToken, {
        cookies
    })
    setDataToCookie(COOKIES_KEY.REFRESH_TOKEN_KEY, auth.refreshToken, {
        cookies
    })
    setDataToCookie(COOKIES_KEY.USER_ID_KEY, auth.user_id, {
        cookies
    })
}

export const getCredentialsFromCookie = (cookies?: () => ReadonlyRequestCookies) => {
    return {
        accessToken: getCookie(COOKIES_KEY.ACCESS_TOKEN_KEY, {
            cookies
        }),
        refreshToken: getCookie(COOKIES_KEY.REFRESH_TOKEN_KEY, {
            cookies
        }),
        user_id: getCookie(COOKIES_KEY.USER_ID_KEY, {
            cookies
        })
    }
}

export const clearCredentialsFromCookie = (cookies?: () => ReadonlyRequestCookies) => {
    deleteCookie(COOKIES_KEY.ACCESS_TOKEN_KEY, {
        cookies
    })
    deleteCookie(COOKIES_KEY.REFRESH_TOKEN_KEY, {
        cookies
    })
    deleteCookie(COOKIES_KEY.USER_ID_KEY, {
        cookies
    })
}

export const removeDataFromCookie = (key: string) => {
    deleteCookie(key)
}
