import {CreateBrandFormSchema, UpdateBrandFormSchema} from '@/lib/form-schema';
import {useMutation} from '@tanstack/react-query';
import {
  createBrandAction,
  deleteBrandAction,
  updateBrandAction,
} from './brand.action';

export const useCreateBrandMutation = () => {
  return useMutation({
    mutationFn: async (payload: CreateBrandFormSchema) =>
      await createBrandAction(payload),
  });
};

export const useUpdateBrandMutation = (id: string) => {
  return useMutation({
    mutationFn: async (payload: UpdateBrandFormSchema) =>
      await updateBrandAction(id, payload),
  });
};

export const useDeleteBrandMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => await deleteBrandAction(id),
  });
};
