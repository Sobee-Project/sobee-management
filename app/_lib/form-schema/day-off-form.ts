import { z } from "zod"

export const createDayOffFormSchema = z.object({
  staff: z.string().optional(),
  reason: z.string().min(1, "Reason must be at least 1 character").max(255, "Reason must be at most 255 characters"),
  status: z.string().optional(),
  startDate: z.string(),
  endDate: z.string()
})

export const updateDayOffFormSchema = z
  .object({
    _id: z.string()
  })
  .merge(createDayOffFormSchema)

export const updateDayOffStatusFormSchema = z.object({
  status: z.string(),
  _id: z.string()
})

export const deleteDayOffFormSchema = z.string()

export type CreateDayOffFormSchema = z.infer<typeof createDayOffFormSchema>
export type UpdateDayOffFormSchema = z.infer<typeof updateDayOffFormSchema>
export type DeleteDayOffFormSchema = z.infer<typeof deleteDayOffFormSchema>
export type UpdateDayOffStatusFormSchema = z.infer<typeof updateDayOffStatusFormSchema>
