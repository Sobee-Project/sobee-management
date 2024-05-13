import { z } from "zod"

export const createAttributeFormSchema = z.object({
    name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
    description: z.string().optional()
})

export type CreateAttributeFormSchema = z.infer<typeof createAttributeFormSchema>

export const updateAttributeFormSchema = z
    .object({
        _id: z.string()
    })
    .merge(createAttributeFormSchema)

export type UpdateAttributeFormSchema = z.infer<typeof updateAttributeFormSchema>

export const deleteAttributeFormSchema = z.string()

export type DeleteAttributeFormSchema = z.infer<typeof deleteAttributeFormSchema>
