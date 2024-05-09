import { z } from "zod"

export const createRoleFormSchema = z.object({
    role_name: z
        .string()
        .min(3, "Role name must be at least 3 characters")
        .max(40, "Role name must be at most 40 characters"),
    grant_lists: z.array(
        z.object({
            actions: z.array(z.string()),
            resource: z.string(),
            attributes: z.string()
        })
    )
})

export type CreateRoleFormSchema = z.infer<typeof createRoleFormSchema>

export const updateRoleFormSchema = z
    .object({
        _id: z.string()
    })
    .merge(createRoleFormSchema)

export type UpdateRoleFormSchema = z.infer<typeof updateRoleFormSchema>

export const deleteRoleFormSchema = z.string()

export type DeleteRoleFormSchema = z.infer<typeof deleteRoleFormSchema>
