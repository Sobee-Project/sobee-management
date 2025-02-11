'use server';

import {API_ROUTES} from '@/constants';
import {FETCH} from '@/services';
import {cookies} from 'next/headers';

export const uploadFileAction = async (payload: FormData) => {
  const res = await FETCH.post<
    any,
    {
      urls: string[];
    }
  >(API_ROUTES.UPLOAD.UPLOAD_FILE, payload, {
    cookies,
  });
  return res;
};

export const uploadUrlAction = async (payload: FormData) => {
  const res = await FETCH.post<
    any,
    {
      urls: string[];
    }
  >(API_ROUTES.UPLOAD.UPLOAD_URL, payload, {
    cookies,
  });
  return res;
};
