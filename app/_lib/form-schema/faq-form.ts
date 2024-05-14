import { z } from "zod"

export const createFaqFormSchema = z.object({
    title: z.string().min(1, "Title is required").min(2, "Title must be at least 2 characters"),
    description: z.string().min(1, "Description is required").min(2, "Description must be at least 2 characters"),
    type: z.string().min(1, "Type is required")
})

export type CreateFaqFormSchema = z.infer<typeof createFaqFormSchema>

export const updateFaqFormSchema = z
    .object({
        _id: z.string()
    })
    .merge(createFaqFormSchema)

export type UpdateFaqFormSchema = z.infer<typeof updateFaqFormSchema>

export const deleteFaqFormSchema = z.string()

export type DeleteFaqFormSchema = z.infer<typeof deleteFaqFormSchema>
