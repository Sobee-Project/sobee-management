import { z } from "zod"

export const createPaymentMethodFormSchema = z.object({
    name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
    image: z.string().url().optional()
})

export type CreatePaymentMethodFormSchema = z.infer<typeof createPaymentMethodFormSchema>

export const updatePaymentMethodFormSchema = z
    .object({
        _id: z.string()
    })
    .merge(createPaymentMethodFormSchema)

export type UpdatePaymentMethodFormSchema = z.infer<typeof updatePaymentMethodFormSchema>

export const deletePaymentMethodFormSchema = z.string()

export type DeletePaymentMethodFormSchema = z.infer<typeof deletePaymentMethodFormSchema>
