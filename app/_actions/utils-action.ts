"use server"
import { safeAction } from "@/_utils"
import { revalidateTag } from "next/cache"
import { z } from "zod"

const revalidateTagSchema = z.string()
export const revalidateTagAction = safeAction.schema(revalidateTagSchema).action(async ({ parsedInput }) => {
    revalidateTag(parsedInput)
})
