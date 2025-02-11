import {ENV_CONFIG} from '@/constants';
import {UploadFileFormSchema, UploadUrlFormSchema} from '@/lib/form-schema';
import {useMutation} from '@tanstack/react-query';
import {uploadFileAction, uploadUrlAction} from './cloudinary.action';

export const useUploadFileMutation = () => {
  return useMutation({
    mutationFn: async (payload: UploadFileFormSchema) => {
      const {files, resourceType, folder} = payload;
      const formData = new FormData();
      switch (true) {
        case files instanceof File:
          formData.append('files', files);
          break;
        default:
          files.forEach(file => {
            formData.append('files', file);
          });
          break;
      }

      formData.append('upload_preset', ENV_CONFIG.CLOUDINARY_UPLOAD_PRESET!);
      formData.append('folder', folder as string);
      formData.append('resourceType', resourceType as string);

      return await uploadFileAction(formData);
    },
  });
};

export const useUploadUrlMutation = () => {
  return useMutation({
    mutationFn: async (payload: UploadUrlFormSchema) => {
      const {url, folder, resourceType} = payload;
      const formData = new FormData();
      formData.append('url', url);
      formData.append('upload_preset', ENV_CONFIG.CLOUDINARY_UPLOAD_PRESET!);
      formData.append('folder', folder as string);
      formData.append('resourceType', resourceType as string);
      return await uploadUrlAction(formData);
    },
  });
};
