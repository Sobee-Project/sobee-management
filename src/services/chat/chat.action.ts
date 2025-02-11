'use server';

import {API_ROUTES} from '@/constants';
import {IChatRoom} from '@/lib/interfaces';
import {FETCH} from '@/services';
import {cookies} from 'next/headers';

export const fetchRoomByIdAction = async (roomId: string) => {
  const room = await FETCH.get<IChatRoom>(
    API_ROUTES.CHAT.GET_ROOM.replace(':id', roomId),
    {
      cookies,
    },
  );
  return room;
};

export const createRoomAction = async (orderId: string) => {
  const room = await FETCH.post<any, IChatRoom>(
    API_ROUTES.CHAT.CREATE_ROOM,
    {order: orderId},
    {
      cookies,
    },
  );
  return room;
};
