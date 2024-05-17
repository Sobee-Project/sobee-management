import { z } from "zod"

export const createCouponFormSchema = z.object({
    image: z.string().optional(),
    code: z.string().min(1, "Code is required").min(2, "Code must be at least 2 characters"),
    discountValue: z.number().min(1, "Discount value must be greater than 0"),
    type: z.string(),
    startDate: z.string().optional(),
    minOrderValue: z.number().min(1, "Minimum order value must be greater than 0"),
    endDate: z.string().optional(),
    usageLimit: z.number().min(1, "Usage limit must be greater than 0"),
    applyTo: z.string(),
    productApply: z.array(z.string()).optional()
})

export type CreateCouponFormSchema = z.infer<typeof createCouponFormSchema>

export const updateCouponFormSchema = z
    .object({
        _id: z.string()
    })
    .merge(createCouponFormSchema)

export type UpdateCouponFormSchema = z.infer<typeof updateCouponFormSchema>

export const deleteCouponFormSchema = z.string()

export type DeleteCouponFormSchema = z.infer<typeof deleteCouponFormSchema>
