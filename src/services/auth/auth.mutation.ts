import {ChangePasswordFormSchema, LoginFormSchema} from '@/lib/form-schema';
import {useMutation} from '@tanstack/react-query';
import {changePasswordAction, loginAction, logoutAction} from './auth.action';

export const useLoginUserMutation = () => {
  return useMutation({
    mutationFn: async (payload: LoginFormSchema) => await loginAction(payload),
  });
};

export const useLogoutUserMutation = () => {
  return useMutation({
    mutationFn: async () => await logoutAction(),
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: async (payload: ChangePasswordFormSchema) =>
      await changePasswordAction(payload),
  });
};
