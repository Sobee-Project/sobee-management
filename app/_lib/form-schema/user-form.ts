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
