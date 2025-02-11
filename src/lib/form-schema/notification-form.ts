import {z} from 'zod';

export const pushNotificationFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(2, 'Title must be at least 2 characters'),
  content: z
    .string()
    .min(1, 'Content is required')
    .min(2, 'Content must be at least 2 characters'),
  type: z.string().min(1, 'Type is required'),
  imageUrl: z.string().url().optional(),
  redirectUrl: z.string().url().optional().or(z.literal('')),
});

export type PushNotificationFormSchema = z.infer<
  typeof pushNotificationFormSchema
>;
