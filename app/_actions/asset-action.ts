"use server"

import { API_ROUTES } from "@/_constants"
import { IAsset } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { cookies } from "next/headers"

export const getAssetsByType = async (type: string, folder: string) => {
    const res = await FETCH.get<IAsset>(API_ROUTES.ASSET.GET_BY_TYPE, {
        params: { type, folder },
        cookies,
        cache: "reload"
    })
    return res
}
