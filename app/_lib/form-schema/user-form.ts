import { z } from "zod"

export const userFormSchema = z.object({
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Invalid phone number").max(10, "Invalid phone number"),
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
    name: z.string().min(1, "Name is required"),
    avatar: z.string().url("Invalid URL. Please provide a valid URL."),
    dateOfBirth: z.string().optional(),
    role: z.string()
})

export const updateUserFormSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").optional(),
    email: z.string().email("Invalid email address").optional(),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 characters long").optional(),
    dateOfBirth: z.string().optional()
})

export const changeAvatarFormSchema = z.object({
    avatar: z.string().url("Invalid URL. Please provide a valid URL.")
})

export type UserFormSchema = z.infer<typeof userFormSchema>
export type UpdateUserFormSchema = z.infer<typeof updateUserFormSchema>
export type ChangeAvatarFormSchema = z.infer<typeof changeAvatarFormSchema>
