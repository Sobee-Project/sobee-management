import {CreateFaqFormSchema, UpdateFaqFormSchema} from '@/lib/form-schema';
import {useMutation} from '@tanstack/react-query';
import {createFaqAction, deleteFaqAction, updateFaqAction} from './faq.action';

export const useCreateFaqMutation = () => {
  return useMutation({
    mutationFn: async (payload: CreateFaqFormSchema) =>
      await createFaqAction(payload),
  });
};

export const useUpdateFaqMutation = (id: string) => {
  return useMutation({
    mutationFn: async (payload: UpdateFaqFormSchema) =>
      await updateFaqAction(id, payload),
  });
};

export const useDeleteFaqMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => await deleteFaqAction(id),
  });
};
