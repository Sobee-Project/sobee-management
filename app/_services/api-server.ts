import { ENV_CONFIG } from "@/_constants"
import { BaseResponse, ErrorResponse, SucccessResponse } from "@/_lib/types"
import { getCredentialsFromCookie } from "@/_utils"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"

type Options = {
    params?: Record<string, any>
    body?: any
    cookies?: () => ReadonlyRequestCookies
} & RequestInit

const _FETCH = async <T extends any>(
    url: string,
    options?: Options
): Promise<SucccessResponse<T> | ErrorResponse<T>> => {
    const opts = {
        ...options,
        body: JSON.stringify(options?.body),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...options?.headers
        }
    } as Options
    try {
        const params = new URLSearchParams(opts.params)
        const res = await fetch(`${ENV_CONFIG.BASE_API_URL}${url}?${params.toString()}`, opts)
        const data = await res.json()
        return data as SucccessResponse<T>
    } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message ?? error?.message,
            statusCode: error?.status
        } as ErrorResponse<T>
    }
}

const FETCH_WITH_TOKEN = async <T extends any>(url: string, options?: Options) => {
    const { accessToken, user_id } = getCredentialsFromCookie(options?.cookies)
    return await _FETCH<T>(url, {
        ...options,
        headers: {
            ...options?.headers,
            Authorization: "Bearer " + accessToken,
            "x-client-id": user_id
        } as HeadersInit
    })
}

export const FETCH = {
    get: <T extends any>(url: string, options?: Options) =>
        FETCH_WITH_TOKEN<T>(url, { ...options, method: "GET", cookies: options?.cookies }),
    post: <T extends any>(url: string, data: T, options?: Options) =>
        FETCH_WITH_TOKEN<T>(url, { ...options, body: data as any, method: "POST", cookies: options?.cookies }),
    put: <T extends any>(url: string, data: T, options?: Options) =>
        FETCH_WITH_TOKEN<T>(url, { ...options, body: data as any, method: "PUT", cookies: options?.cookies }),
    delete: <T extends any>(url: string, options?: Options) =>
        FETCH_WITH_TOKEN<T>(url, { ...options, method: "DELETE", cookies: options?.cookies })
}
