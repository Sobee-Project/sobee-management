import { ENV_CONFIG } from "@/_constants"

const _FETCH = async (url: string, options?: RequestInit) => {
    const fullUrl = `${ENV_CONFIG.BASE_API_URL}${url}`
    return fetch(fullUrl, {
        ...options,
        body: options?.body ? JSON.stringify(options.body) : undefined,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers
        }
    })
}

const _JSON_FETCH = async <T>(url: string, options?: RequestInit) => {
    const response = await _FETCH(url, options)
    const data = await response.json()
    return data as T
}

export const PRIMATIVE_FETCH = {
    get: (url: string, options?: RequestInit) => _FETCH(url, options),
    post: (url: string, body: any, options?: RequestInit) => _FETCH(url, { ...options, method: "POST", body }),
    put: (url: string, body: any, options?: RequestInit) => _FETCH(url, { ...options, method: "PUT", body }),
    delete: (url: string, options?: RequestInit) => _FETCH(url, { ...options, method: "DELETE" }),
    patch: (url: string, body: any, options?: RequestInit) => _FETCH(url, { ...options, method: "PATCH", body })
}

export const JSON_FETCH = {
    get: <T>(url: string, options?: RequestInit) => _JSON_FETCH<T>(url, options),
    post: <T>(url: string, body: any, options?: RequestInit) =>
        _JSON_FETCH<T>(url, { ...options, method: "POST", body }),
    put: <T>(url: string, body: any, options?: RequestInit) => _JSON_FETCH<T>(url, { ...options, method: "PUT", body }),
    delete: <T>(url: string, options?: RequestInit) => _JSON_FETCH<T>(url, { ...options, method: "DELETE" }),
    patch: <T>(url: string, body: any, options?: RequestInit) =>
        _JSON_FETCH<T>(url, { ...options, method: "PATCH", body })
}
