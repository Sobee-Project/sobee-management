import {ReplyQuestionForm} from '@/lib/form-schema';
import {useMutation} from '@tanstack/react-query';
import {deleteQuestionAction, replyQuestionAction} from './question.action';

export const useReplyQuestionMutation = (id: string) => {
  return useMutation({
    mutationFn: async (payload: ReplyQuestionForm) =>
      await replyQuestionAction(id, payload),
  });
};

export const useDeleteQuestionMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => await deleteQuestionAction(id),
  });
};
