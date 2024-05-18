import { z } from "zod"

export const createProductFormSchema = z.object({
    name: z.string().min(1, "Name is required").max(255, "Name is too long"),
    description: z.string().min(1, "Description is required"),
    displayPrice: z.number().int().positive(),
    thumbnail: z.string().url(),
    brand: z.string().optional(),
    category: z.string().optional(),
    quantity: z.number().int().positive(),
    status: z.string().optional(),
    variants: z
        .array(
            z.object({
                assets: z.array(z.string().optional()).optional(),
                amount: z.number().int().positive(),
                attributeList: z.array(
                    z.object({
                        attribute: z.string(),
                        value: z.string()
                    })
                ),
                price: z.number().int().positive()
            })
        )
        .optional(),
    type: z.string().optional(),
    isDraft: z.boolean().optional()
})

export const updateProductFormSchema = z
    .object({
        _id: z.string()
    })
    .merge(createProductFormSchema)

export const deleteProductFormSchema = z.string()
export const publishedProductFormSchema = z.string()

export type CreateProductFormSchema = z.infer<typeof createProductFormSchema>
export type UpdateProductFormSchema = z.infer<typeof updateProductFormSchema>
