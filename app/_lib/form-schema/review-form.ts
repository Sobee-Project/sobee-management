import { z } from "zod"

export const deleteReviewFormSchema = z.string()

export type DeleteReviewFormSchema = z.infer<typeof deleteReviewFormSchema>
