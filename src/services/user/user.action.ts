'use server';

import {API_ROUTES, CACHE_KEY} from '@/constants';
import {ChangeAvatarFormSchema, UpdateUserFormSchema} from '@/lib/form-schema';
import {IUser} from '@/lib/interfaces';
import {FETCH} from '@/services';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';

export const updateUserAction = async (parsedInput: UpdateUserFormSchema) => {
  const res = await FETCH.put<Partial<IUser>>(
    API_ROUTES.USER.UPDATE,
    parsedInput,
    {
      cookies,
    },
  );
  if (res.success) {
    revalidateTag(CACHE_KEY.AUTH.GET_ME);
  }
  return res;
};

export const changeAvatarAction = async (
  parsedInput: ChangeAvatarFormSchema,
) => {
  const res = await FETCH.put<
    {
      avatar: string;
    },
    IUser
  >(API_ROUTES.USER.CHANGE_AVATAR, parsedInput, {
    cookies,
  });
  if (res.success) {
    revalidateTag(CACHE_KEY.AUTH.GET_ME);
  }
  return res;
};
