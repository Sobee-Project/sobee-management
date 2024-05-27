import { z } from "zod"

export const loginFormSchema = z.object({
  emailOrPhone: z
    .string()
    .min(10, "Email or phone number must be at least 10 characters long")
    .max(255, "Email or phone number must be at most 255 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long")
})

export const changePasswordFormSchema = z
  .object({
    oldPassword: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters")
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })

export const logoutFormSchema = z.void()

export type LoginFormSchema = z.infer<typeof loginFormSchema>
export type LogoutFormSchema = z.infer<typeof logoutFormSchema>
export type ChangePasswordFormSchema = z.infer<typeof changePasswordFormSchema>
