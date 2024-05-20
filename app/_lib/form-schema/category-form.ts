import { z } from "zod"

export const createCategoryFormSchema = z.object({
    name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
    slug: z.string().min(1, "Slug is required").min(2, "Slug must be at least 2 characters"),
    description: z.string().optional(),
    image: z.string().url().optional()
})

export type CreateCategoryFormSchema = z.infer<typeof createCategoryFormSchema>

export const updateCategoryFormSchema = z
    .object({
        _id: z.string()
    })
    .merge(createCategoryFormSchema)

export type UpdateCategoryFormSchema = z.infer<typeof updateCategoryFormSchema>

export const deleteCategoryFormSchema = z.string()

export type DeleteCategoryFormSchema = z.infer<typeof deleteCategoryFormSchema>
