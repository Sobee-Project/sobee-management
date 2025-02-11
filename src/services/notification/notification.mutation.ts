import {INotification} from '@/lib/interfaces';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {
  deleteNotificationAction,
  pushNotificationAction,
} from './notification.action';

export const usePushNotificationMutation = () => {
  return useMutation({
    mutationFn: async (body: INotification) =>
      await pushNotificationAction(body),
  });
};

export const useDeleteNotificationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteNotificationAction(id);
      if (res.success) {
        await queryClient.refetchQueries({
          queryKey: ['getAllNotification'],
        });
      }
      return res;
    },
  });
};
