import { z } from "zod"
import { userFormSchema } from "./user-form"

export const createStaffFormSchema = z
  .object({
    identityCard: z.string().min(1, "Identity card is required"),
    staffRole: z.string()
  })
  .merge(userFormSchema)

export const updateStaffFormSchema = z
  .object({
    _id: z.string().optional(),
    oldPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional()
  })
  .merge(createStaffFormSchema)
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })

export const deleteStaffFormSchema = z.string()

export type CreateStaffFormSchema = z.infer<typeof createStaffFormSchema>
export type UpdateStaffFormSchema = z.infer<typeof updateStaffFormSchema>
export type DeleteStaffFormSchema = z.infer<typeof deleteStaffFormSchema>
