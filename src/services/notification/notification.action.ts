'use server';

import {API_ROUTES, CACHE_KEY} from '@/constants';
import {INotification} from '@/lib/interfaces';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';
import {FETCH} from '../api-server';

export const getAllNotificationsAction = async () => {
  const res = await FETCH.get<INotification[]>(
    API_ROUTES.NOTIFICATION.GET_NOTIFICATIONS,
    {
      cookies,
      next: {
        tags: [CACHE_KEY.NOTIFICATION.GET_ALL],
      },
    },
  );
  return res;
};

export const pushNotificationAction = async (body: INotification) => {
  const res = await FETCH.post(
    API_ROUTES.NOTIFICATION.PUSH_NOTIFICATION,
    body,
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.NOTIFICATION.GET_ALL);
  }
  return res;
};

export const deleteNotificationAction = async (id: string) => {
  const res = await FETCH.delete(
    API_ROUTES.NOTIFICATION.DELETE_NOTIFICATION.replace(':id', id),
    {
      cookies,
    },
  );

  return res;
};
