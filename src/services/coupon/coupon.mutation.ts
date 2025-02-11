import {
  CreateCouponFormSchema,
  UpdateCouponFormSchema,
} from '@/lib/form-schema';
import {useMutation} from '@tanstack/react-query';
import {
  activeCouponAction,
  createCouponAction,
  deactiveCouponAction,
  deleteCouponAction,
  updateCouponAction,
} from './coupon.action';

export const useCreateCouponMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateCouponFormSchema) =>
      await createCouponAction(data),
  });
};

export const useUpdateCouponMutation = (id: string) => {
  return useMutation({
    mutationFn: async (data: UpdateCouponFormSchema) =>
      await updateCouponAction(id, data),
  });
};

export const useDeleteCouponMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => await deleteCouponAction(id),
  });
};

export const useActiveCouponMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => await activeCouponAction(id),
  });
};

export const useDeactiveCouponMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => await deactiveCouponAction(id),
  });
};
