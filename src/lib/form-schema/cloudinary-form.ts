import {z} from 'zod';
import {zfd} from 'zod-form-data';

export const uploadFileFormSchema = z.object({
  files: zfd
    .file(z.instanceof(File))
    .array()
    .or(zfd.file(z.instanceof(File))),
  resourceType: zfd.text(z.string().optional()).optional(),
  folder: zfd.text(z.string().optional()).optional(),
});

export type UploadFileFormSchema = z.infer<typeof uploadFileFormSchema>;

export const uploadUrlFormSchema = z.object({
  url: z.string().url(),
  resourceType: z.string().optional(),
  folder: z.string().optional(),
});

export type UploadUrlFormSchema = z.infer<typeof uploadUrlFormSchema>;
