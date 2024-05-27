import { z } from "zod"

export const createShippingFormSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  amount: z.number(),
  type: z.string().optional()
})

export type CreateShippingFormSchema = z.infer<typeof createShippingFormSchema>

export const updateShippingFormSchema = z
  .object({
    _id: z.string()
  })
  .merge(createShippingFormSchema)

export type UpdateShippingFormSchema = z.infer<typeof updateShippingFormSchema>

export const deleteShippingFormSchema = z.string()

export type DeleteShippingFormSchema = z.infer<typeof deleteShippingFormSchema>
