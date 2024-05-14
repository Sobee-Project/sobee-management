"use server"

import { API_ROUTES, APP_ROUTES, CACHE_KEY, ENV_CONFIG } from "@/_constants"
import { uploadFileFormSchema } from "@/_lib/form-schema"
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
    .action(async ({ parsedInput }) => {})
