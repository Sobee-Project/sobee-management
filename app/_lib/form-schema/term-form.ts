import { z } from "zod"

export const createTermFormSchema = z.object({
    title: z.string().min(1, "Title is required").min(2, "Title must be at least 2 characters"),
    description: z.string().min(1, "Description is required").min(2, "Description must be at least 2 characters"),
    type: z.string().min(1, "Type is required"),
    isApproved: z.boolean().default(false)
})

export type CreateTermFormSchema = z.infer<typeof createTermFormSchema>

export const updateTermFormSchema = z
    .object({
        _id: z.string()
    })
    .merge(createTermFormSchema)

export type UpdateTermFormSchema = z.infer<typeof updateTermFormSchema>

export const deleteTermFormSchema = z.string()

export type DeleteTermFormSchema = z.infer<typeof deleteTermFormSchema>
