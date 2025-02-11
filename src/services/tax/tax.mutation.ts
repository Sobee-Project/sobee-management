import {CreateTaxFormSchema, UpdateTaxFormSchema} from '@/lib/form-schema';
import {useMutation} from '@tanstack/react-query';
import {createTaxAction, deleteTaxAction, updateTaxAction} from './tax.action';

export const useCreateTaxMutation = () => {
  return useMutation({
    mutationFn: async (payload: CreateTaxFormSchema) =>
      await createTaxAction(payload),
  });
};

export const useUpdateTaxMutation = (id: string) => {
  return useMutation({
    mutationFn: async (payload: UpdateTaxFormSchema) =>
      await updateTaxAction(id, payload),
  });
};

export const useDeleteTaxMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => await deleteTaxAction(id),
  });
};
