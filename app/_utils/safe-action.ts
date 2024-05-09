import { createSafeActionClient } from "next-safe-action"
import { z } from "zod"

export const safeAction = createSafeActionClient({
    defineMetadataSchema: () => {
        return z.object({
            actionName: z.string()
        })
    }
})
