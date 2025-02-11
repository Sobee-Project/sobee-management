import {
  CreateCustomerFormSchema,
  UpdateCustomerFormSchema,
} from '@/lib/form-schema';
import {useMutation} from '@tanstack/react-query';
import {
  banCustomerAction,
  createCustomerAction,
  deleteCustomerAction,
  unbanCustomerAction,
  updateCustomerAction,
} from './customer.action';

export const useCreateCustomerMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateCustomerFormSchema) =>
      await createCustomerAction(data),
  });
};

export const useUpdateCustomerMutation = (id: string) => {
  return useMutation({
    mutationFn: async (data: UpdateCustomerFormSchema) =>
      await updateCustomerAction(id, data),
  });
};

export const useDeleteCustomerMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => await deleteCustomerAction(id),
  });
};

export const useBanCustomerMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => await banCustomerAction(id),
  });
};

export const useUnbanCustomerMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => await unbanCustomerAction(id),
  });
};
