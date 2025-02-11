import {
  CreateCategoryFormSchema,
  UpdateCategoryFormSchema,
} from '@/lib/form-schema';
import {useMutation} from '@tanstack/react-query';
import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from './category.action';

export const useCreateCategoryMutation = () => {
  return useMutation({
    mutationFn: async (payload: CreateCategoryFormSchema) =>
      await createCategoryAction(payload),
  });
};

export const useUpdateCategoryMutation = (id: string) => {
  return useMutation({
    mutationFn: async (payload: UpdateCategoryFormSchema) =>
      await updateCategoryAction(id, payload),
  });
};

export const useDeleteCategoryMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => await deleteCategoryAction(id),
  });
};
