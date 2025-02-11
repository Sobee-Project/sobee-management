'use server';

import {API_ROUTES, CACHE_KEY} from '@/constants';
import {ReplyQuestionForm} from '@/lib/form-schema';
import {IQuestion} from '@/lib/interfaces';
import {FETCH} from '@/services';
import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';

export const fetchAllQuestionsAction = async (query?: any) => {
  const res = await FETCH.get<IQuestion[]>(API_ROUTES.QUESTION.GET_QUESTIONS, {
    cookies,
    params: query,
    next: {
      tags: [CACHE_KEY.QUESTION.GET_ALL],
    },
  });
  return res;
};

export const replyQuestionAction = async (
  id: string,
  parsedInput: ReplyQuestionForm,
) => {
  const res = await FETCH.put<ReplyQuestionForm>(
    API_ROUTES.QUESTION.REPLY_QUESTION.replace(':id', id),
    parsedInput,
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.QUESTION.GET_ALL);
  }

  return res;
};

export const deleteQuestionAction = async (id: string) => {
  const res = await FETCH.delete(
    API_ROUTES.QUESTION.DELETE_QUESTION.replace(':id', id),
    {
      cookies,
    },
  );

  if (res.success) {
    revalidateTag(CACHE_KEY.QUESTION.GET_ALL);
  }

  return res;
};
