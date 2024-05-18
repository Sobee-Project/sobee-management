import { API_ROUTES, APP_ROUTES, COOKIES_KEY } from "@/_constants"
import { RefreshTokenResponse } from "@/_lib/types"
import { FETCH } from "@/_services"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/favicon.ico") {
        return NextResponse.next()
    }

    const cookies = request.cookies
    const accessToken = cookies.get(COOKIES_KEY.ACCESS_TOKEN_KEY)
    const refreshToken = cookies.get(COOKIES_KEY.REFRESH_TOKEN_KEY)
    const userId = cookies.get(COOKIES_KEY.USER_ID_KEY)

    const redirectToLogin = () => {
        const response = NextResponse.redirect(new URL(APP_ROUTES.LOGIN, request.url))
        response.cookies.delete(COOKIES_KEY.ACCESS_TOKEN_KEY)
        response.cookies.delete(COOKIES_KEY.REFRESH_TOKEN_KEY)
        response.cookies.delete(COOKIES_KEY.USER_ID_KEY)
        return response
    }

    if ((!accessToken || !userId || !refreshToken) && !request.url.includes(APP_ROUTES.LOGIN)) {
        return redirectToLogin()
    }
    if (accessToken && userId && refreshToken) {
        const decodedAccessToken = parseJwt(accessToken.value)
        const decodedRefreshToken = parseJwt(refreshToken.value)
        if (!decodedAccessToken || !decodedRefreshToken) {
            return redirectToLogin()
        }
        const { exp: accessExp } = decodedAccessToken
        const currentTime = Math.floor(Date.now() / 1000)
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

        if (currentTime > accessExp) {
            // Refresh the token
            return FETCH.post<
                {
                    refreshToken: string
                },
                RefreshTokenResponse
            >(
                API_ROUTES.AUTH.REFRESH_TOKEN,
                {
                    refreshToken: refreshToken.value
                },
                {
                    headers: {
                        "x-client-id": userId.value,
                        Authorization: `Bearer ${accessToken.value}`
                    }
                }
            )
                .then((res) => {
                    console.log(res)
                    if (!res.success) {
                        return redirectToLogin()
                    }
                    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data!
                    const response = NextResponse.next()

                    response.cookies.set(COOKIES_KEY.ACCESS_TOKEN_KEY, newAccessToken, {
                        expires
                    })

                    response.cookies.set(COOKIES_KEY.REFRESH_TOKEN_KEY, newRefreshToken, {
                        expires
                    })

                    return response
                })
                .catch((error) => {
                    return redirectToLogin()
                })
        } else {
            if (request.url.includes(APP_ROUTES.LOGIN)) {
                return NextResponse.redirect(new URL(APP_ROUTES.DASHBOARD, request.url))
            }
            if (request.nextUrl.pathname === "/500" || request.nextUrl.pathname === "/401") {
                return redirectToLogin()
            }
            return NextResponse.next()
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
}

/**
 * @Reference https://stackoverflow.com/a/54036386
 */
function parseJwt(token: string): JwtPayload | undefined {
    if (!token) {
        return undefined
    }
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace("-", "+").replace("_", "/")
    return JSON.parse(atob(base64))
}

type JwtPayload = {
    iat: number
    exp: number
}
