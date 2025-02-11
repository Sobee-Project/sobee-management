import {EOrderStatus} from '@/lib/enums';
import {useMutation} from '@tanstack/react-query';
import {updateOrderStatusAction} from './order.action';

export const useUpdateOrderStatusMutation = (id: string) => {
  return useMutation({
    mutationFn: async (status: EOrderStatus) =>
      await updateOrderStatusAction(id, status),
  });
};
