import {
  CreateShippingFormSchema,
  UpdateShippingFormSchema,
} from '@/lib/form-schema';
import {useMutation} from '@tanstack/react-query';
import {
  createShippingAction,
  deleteShippingAction,
  updateShippingAction,
} from './shipping.action';

export const useCreateShippingMutation = () => {
  return useMutation({
    mutationFn: async (payload: CreateShippingFormSchema) =>
      await createShippingAction(payload),
  });
};

export const useUpdateShippingMutation = (id: string) => {
  return useMutation({
    mutationFn: async (payload: UpdateShippingFormSchema) =>
      await updateShippingAction(id, payload),
  });
};

export const useDeleteShippingMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => await deleteShippingAction(id),
  });
};
