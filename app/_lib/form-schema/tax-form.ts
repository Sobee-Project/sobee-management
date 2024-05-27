import { z } from "zod"

export const createTaxFormSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  rate: z.number().min(0, "Rate is required").max(100, "Rate must be less than 100"),
  country: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional()
})

export type CreateTaxFormSchema = z.infer<typeof createTaxFormSchema>

export const updateTaxFormSchema = z
  .object({
    _id: z.string()
  })
  .merge(createTaxFormSchema)

export type UpdateTaxFormSchema = z.infer<typeof updateTaxFormSchema>

export const deleteTaxFormSchema = z.string()

export type DeleteTaxFormSchema = z.infer<typeof deleteTaxFormSchema>
