import { COOKIES_KEY } from "@/_constants"
import { IUser } from "@/_lib/interfaces"
import { deleteCookie, getCookie, setCookie } from "cookies-next"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"

export const setDataToCookie = (key: string, value: any) => {
    setCookie(key, value, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    })
}

export const getDataFromCookie = (key: string) => {
    return getCookie(key)
}

export const setCredentialsToCookie = (auth: { accessToken: string; refreshToken: string; user_id: string }) => {
    setDataToCookie(COOKIES_KEY.ACCESS_TOKEN_KEY, auth.accessToken)
    setDataToCookie(COOKIES_KEY.REFRESH_TOKEN_KEY, auth.refreshToken)
    setDataToCookie(COOKIES_KEY.USER_ID_KEY, auth.user_id)
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
        }),
        userInfo: getCookie(COOKIES_KEY.USER_INFO, {
            cookies
        })
    }
}

export const clearCredentialsFromCookie = () => {
    deleteCookie(COOKIES_KEY.ACCESS_TOKEN_KEY)
    deleteCookie(COOKIES_KEY.REFRESH_TOKEN_KEY)
    deleteCookie(COOKIES_KEY.USER_ID_KEY)
    deleteCookie(COOKIES_KEY.USER_INFO)
}

export const removeDataFromCookie = (key: string) => {
    deleteCookie(key)
}

export const getUserInfoFromCookie = (cookies?: () => ReadonlyRequestCookies) => {
    const userInfo = getCookie(COOKIES_KEY.USER_INFO, {
        cookies
    })
    return userInfo ? (JSON.parse(userInfo) as IUser) : null
}

export const setUserInfoToCookie = (user: IUser) => {
    setDataToCookie(COOKIES_KEY.USER_INFO, JSON.stringify(user))
}
