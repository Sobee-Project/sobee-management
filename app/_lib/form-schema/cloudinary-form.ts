import { z } from "zod"
import { zfd } from "zod-form-data"

export const uploadFileFormSchema = zfd.formData({
  files: zfd
    .file(z.instanceof(File))
    .array()
    .or(zfd.file(z.instanceof(File))),
  resourceType: zfd.text(z.string().optional()).optional(),
  folder: zfd.text(z.string().optional()).optional()
})

export const uploadUrlFormSchema = zfd.formData({
  url: zfd.text(z.string().url()),
  resourceType: zfd.text(z.string().optional()).optional(),
  folder: zfd.text(z.string().optional()).optional()
})
