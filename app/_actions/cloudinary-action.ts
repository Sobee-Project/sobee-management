"use server"

import { API_ROUTES, APP_ROUTES, CACHE_KEY, ENV_CONFIG } from "@/_constants"
import { uploadFileFormSchema, uploadUrlFormSchema } from "@/_lib/form-schema"
import { ICategory } from "@/_lib/interfaces"
import { FETCH } from "@/_services"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const uploadFile = safeAction
    .metadata({
        actionName: "Upload File"
    })
    .schema(uploadFileFormSchema)
    .action(async ({ parsedInput }) => {
        const { files, resourceType } = parsedInput
        const formData = new FormData()
        switch (true) {
            case files instanceof File:
                formData.append("files", files)
                break
            default:
                files.forEach((file) => {
                    formData.append("files", file)
                })
                break
        }

        formData.append("upload_preset", ENV_CONFIG.CLOUDINARY_UPLOAD_PRESET!)
        formData.append("folder", resourceType as string)
        const res = await FETCH.post<
            any,
            {
                urls: string[]
            }
        >(API_ROUTES.UPLOAD.UPLOAD_FILE, formData, {
            cookies
        })
        return res
    })

export const uploadUrl = safeAction
    .metadata({
        actionName: "Upload URL"
    })
    .schema(uploadUrlFormSchema)
    .action(async ({ parsedInput }) => {
        const { url } = parsedInput
        const formData = new FormData()
        formData.append("url", url)
        formData.append("upload_preset", ENV_CONFIG.CLOUDINARY_UPLOAD_PRESET!)
        const res = await FETCH.post<
            any,
            {
                urls: string[]
            }
        >(API_ROUTES.UPLOAD.UPLOAD_URL, formData, {
            cookies
        })
        return res
    })
