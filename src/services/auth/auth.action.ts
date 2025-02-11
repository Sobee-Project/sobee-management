'use server';

import {API_ROUTES, CACHE_KEY, COOKIES_KEY} from '@/constants';
import {ERole} from '@/lib/enums';
import {ChangePasswordFormSchema, LoginFormSchema} from '@/lib/form-schema';
import {IUser} from '@/lib/interfaces';
import {AuthResponse} from '@/lib/types';
import {FETCH} from '@/services';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';

const setCookies = async (data: {
  accessToken: string;
  refreshToken: string;
}) => {
  const cookieData = cookies();
  cookieData.set(COOKIES_KEY.ACCESS_TOKEN_KEY, data.accessToken);
  cookieData.set(COOKIES_KEY.REFRESH_TOKEN_KEY, data.refreshToken);
};

const clearCookies = async () => {
  const cookieData = cookies();
  cookieData.delete(COOKIES_KEY.ACCESS_TOKEN_KEY);
  cookieData.delete(COOKIES_KEY.REFRESH_TOKEN_KEY);
};

export const getCurrentUserAction = async () => {
  const res = await FETCH.get<{
    user: IUser;
  }>(API_ROUTES.AUTH.GET_ME, {
    cookies,
    cache: 'reload',
    next: {
      tags: [CACHE_KEY.AUTH.GET_ME],
    },
  });
  if (res.success) {
    return {
      user: res.data!.user,
      accessToken: cookies().get(COOKIES_KEY.ACCESS_TOKEN_KEY)?.value,
    };
  }
  return null;
};

export const loginAction = async (payload: LoginFormSchema) => {
  const res = await FETCH.post<LoginFormSchema, AuthResponse>(
    API_ROUTES.AUTH.LOGIN,
    payload,
    {cookies},
  );
  if (res.success) {
    if (res.data?.user.role === ERole.CUSTOMER) {
      return res;
    }
    const {accessToken, refreshToken} = res.data!;
    setCookies({accessToken, refreshToken});
  }
  return res;
};

export const logoutAction = async () => {
  const res = await FETCH.post<any, AuthResponse>(
    API_ROUTES.AUTH.LOGOUT,
    undefined,
    {
      cookies,
    },
  );
  if (res.success) {
    clearCookies();
    revalidateTag(CACHE_KEY.AUTH.GET_ME);
  }
  return res;
};

export const changePasswordAction = async (
  payload: ChangePasswordFormSchema,
) => {
  const res = await FETCH.put<ChangePasswordFormSchema, AuthResponse>(
    API_ROUTES.AUTH.CHANGE_PASSWORD,
    payload,
    {
      cookies,
    },
  );

  return res;
};
