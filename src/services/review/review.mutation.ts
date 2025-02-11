import {useMutation} from '@tanstack/react-query';
import {deleteReviewAction} from './review.action';

export const useDeleteReviewMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => await deleteReviewAction(id),
  });
};
