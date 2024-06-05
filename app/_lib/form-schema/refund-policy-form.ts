import { z } from "zod"

export const createRefundPolicyFormSchema = z.object({
  title: z.string().min(1, "Title is required").min(2, "Title must be at least 2 characters"),
  description: z.string().min(1, "Description is required").min(2, "Description must be at least 2 characters"),
  appliedOn: z.string()
})

export type CreateRefundPolicyFormSchema = z.infer<typeof createRefundPolicyFormSchema>

export const updateRefundPolicyFormSchema = z
  .object({
    _id: z.string()
  })
  .merge(createRefundPolicyFormSchema)

export type UpdateRefundPolicyFormSchema = z.infer<typeof updateRefundPolicyFormSchema>

export const deleteRefundPolicyFormSchema = z.string()

export type DeleteRefundPolicyFormSchema = z.infer<typeof deleteRefundPolicyFormSchema>
