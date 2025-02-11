import {CreateTermFormSchema, UpdateTermFormSchema} from '@/lib/form-schema';
import {useMutation} from '@tanstack/react-query';
import {
  createTermAction,
  deleteTermAction,
  updateTermAction,
} from './term.action';

export const useCreateTermMutation = () => {
  return useMutation({
    mutationFn: async (payload: CreateTermFormSchema) =>
      await createTermAction(payload),
  });
};

export const useUpdateTermMutation = (id: string) => {
  return useMutation({
    mutationFn: async (payload: UpdateTermFormSchema) =>
      await updateTermAction(id, payload),
  });
};

export const useDeleteTermMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => await deleteTermAction(id),
  });
};
