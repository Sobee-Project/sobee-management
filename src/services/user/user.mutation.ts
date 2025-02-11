import {ChangeAvatarFormSchema, UpdateUserFormSchema} from '@/lib/form-schema';
import {useMutation} from '@tanstack/react-query';
import {changeAvatarAction, updateUserAction} from './user.action';

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: async (data: UpdateUserFormSchema) =>
      await updateUserAction(data),
  });
};

export const useChangeAvatarMutation = () => {
  return useMutation({
    mutationFn: async (data: ChangeAvatarFormSchema) =>
      await changeAvatarAction(data),
  });
};
