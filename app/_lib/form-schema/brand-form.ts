import { z } from "zod"

export const createBrandFormSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  logo: z.string().min(1),
  isActive: z.boolean().default(true),
  website: z.string()
})

export type CreateBrandFormSchema = z.infer<typeof createBrandFormSchema>

export const updateBrandFormSchema = z
  .object({
    _id: z.string()
  })
  .merge(createBrandFormSchema)

export type UpdateBrandFormSchema = z.infer<typeof updateBrandFormSchema>

export const deleteBrandFormSchema = z.string()

export type DeleteBrandFormSchema = z.infer<typeof deleteBrandFormSchema>
