import {useQuery} from '@tanstack/react-query';
import {getAllNotificationsAction} from './notification.action';

export const useGetAllNotificationQuery = () => {
  return useQuery({
    queryKey: ['getAllNotification'],
    queryFn: async () => await getAllNotificationsAction(),
    refetchInterval: 10000,
  });
};
