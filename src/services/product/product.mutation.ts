import {
  CreateProductFormSchema,
  UpdateProductFormSchema,
} from '@/lib/form-schema';
import {useMutation} from '@tanstack/react-query';
import {
  createProductAction,
  deleteProductAction,
  updateProductAction,
} from './product.action';

export const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: async (payload: CreateProductFormSchema) =>
      await createProductAction(payload),
  });
};

export const useUpdateProductMutation = (id: string) => {
  return useMutation({
    mutationFn: async (payload: UpdateProductFormSchema) =>
      await updateProductAction(id, payload),
  });
};

export const useDeleteProductMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => await deleteProductAction(id),
  });
};
