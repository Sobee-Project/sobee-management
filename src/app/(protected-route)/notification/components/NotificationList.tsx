'use client';

import {useGetAllNotificationQuery} from '@/services/notification/notification.query';
import {Spinner} from '@nextui-org/react';
import {useMemo} from 'react';
import NotificationItem from './NotificationItem';

const NotificationList = () => {
  const {data, isLoading, isRefetching, isError} = useGetAllNotificationQuery();
  const notifications = useMemo(() => data?.data || [], [data]);
  return isError ? (
    <div>Error</div>
  ) : isLoading ? (
    <Spinner />
  ) : (
    <div className="space-y-4">
      {isRefetching && <Spinner size="sm" />}
      {notifications.map(notif => (
        <NotificationItem key={notif._id!} notification={notif} />
      ))}
    </div>
  );
};

export default NotificationList;
