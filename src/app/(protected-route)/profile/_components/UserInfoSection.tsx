'use client';

import {APP_ROUTES} from '@/constants';
import {IUser} from '@/lib/interfaces';
import {useLogoutUserMutation} from '@/services/auth';
import {Button} from '@nextui-org/react';
import {format} from 'date-fns';
import {
  AtSign,
  Baby,
  Calendar,
  Download,
  LogOut,
  LucideIcon,
  Phone,
} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useCallback} from 'react';
import toast from 'react-hot-toast';

type Props = {
  userInfo: IUser;
};

const UserInfoSection = ({userInfo}: Props) => {
  const router = useRouter();
  const logoutMutation = useLogoutUserMutation();
  const isLoading = logoutMutation.isPending;

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: data => {
        if (data.success) {
          toast.success('Logged out successfully');
          router.replace(APP_ROUTES.LOGIN);
        } else {
          toast.error(data.message || 'Failed to logout');
        }
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Failed to logout');
      },
    });
  };

  const renderItem = useCallback((Icon: LucideIcon, value: string) => {
    return (
      <div className="flex items-center gap-2">
        <Icon size={18} className="text-primary-500" />
        <p>{value}</p>
      </div>
    );
  }, []);

  return (
    <div className="space-y-2 rounded-md bg-background p-4 shadow-custom-light">
      {renderItem(AtSign, userInfo?.email || '')}
      {renderItem(Phone, userInfo?.phoneNumber || '')}
      {renderItem(
        Baby,
        format(userInfo?.dateOfBirth || new Date(), 'dd/MM/yyyy'),
      )}
      {renderItem(
        Calendar,
        'Joined ' + format(userInfo?.createdAt || new Date(), 'dd/MM/yyyy'),
      )}
      <div className="flex gap-2">
        <Button
          variant="solid"
          color="primary"
          startContent={<Download size={16} />}
          className="flex-1">
          Download personal data
        </Button>
        <Button
          variant="light"
          color="danger"
          onClick={handleLogout}
          startContent={<LogOut size={16} />}
          isDisabled={isLoading}>
          {isLoading ? 'Logging out...' : 'Logout'}
        </Button>
      </div>
    </div>
  );
};

export default UserInfoSection;
