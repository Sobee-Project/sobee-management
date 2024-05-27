import { z } from "zod"
import { userFormSchema } from "./user-form"

export const createCustomerFormSchema = z
  .object({
    _user: z.object({
      gender: z.string(),
      isActive: z.boolean().default(true)
    })
  })
  .merge(userFormSchema)

export const updateCustomerFormSchema = z
  .object({
    _id: z.string().optional()
  })
  .merge(createCustomerFormSchema)

export const deleteCustomerFormSchema = z.string()

export type CreateCustomerFormSchema = z.infer<typeof createCustomerFormSchema>
export type UpdateCustomerFormSchema = z.infer<typeof updateCustomerFormSchema>
export type DeleteCustomerFormSchema = z.infer<typeof deleteCustomerFormSchema>
