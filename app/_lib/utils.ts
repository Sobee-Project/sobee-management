import { API_ROUTES, ENV_CONFIG } from "@/_constants"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getImageFromServer(src: string) {
    return `${ENV_CONFIG.BASE_API_URL}${API_ROUTES.ASSET.GET_ASSET_RESOUREC}?resourcePath=${src}`
}
