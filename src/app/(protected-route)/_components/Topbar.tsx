'use client';

import {APP_ROUTES} from '@/constants';
import {useAuthContext} from '@/context';
import {useLogoutUserMutation} from '@/services/auth';
import {useSidebarStore} from '@/store';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from '@nextui-org/react';
import {motion} from 'framer-motion';
import {LogOut, Menu, SearchIcon, User2} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import toast from 'react-hot-toast';
import {ThemeSwitcher} from '../../../components';

type Props = {};

const Topbar = ({}: Props) => {
  const {user: userInfo} = useAuthContext();
  const {isOpen, toggleSidebar} = useSidebarStore();
  const router = useRouter();

  const logoutUserMutation = useLogoutUserMutation();

  const onClickLogout = () => {
    logoutUserMutation.mutate(undefined, {
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

  return (
    <div className="flex h-20 items-center gap-4 border-b-1 border-l-1 bg-background p-4">
      <motion.button
        onClick={toggleSidebar}
        initial={{rotate: 0}}
        animate={{rotate: isOpen ? 45 : 0}}
        transition={{duration: 0.2}}
        exit={{rotate: 0}}>
        <Menu className="hover:text-primary" />
      </motion.button>
      <Input
        variant="bordered"
        className="flex-1 cursor-pointer"
        placeholder="Search..."
        endContent={<SearchIcon onClick={() => console.log(1)} />}
      />
      <ThemeSwitcher />
      <Dropdown>
        <DropdownTrigger>
          <button className="grid size-10 place-items-center rounded-full bg-primary-50 p-1">
            {userInfo?.avatar ? (
              <Image
                src={userInfo.avatar}
                alt={userInfo.name}
                width={40}
                height={40}
                className="w-full rounded-full object-cover"
              />
            ) : (
              <User2 size={20} />
            )}
          </button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Static Actions"
          topContent={
            <p className="p-2 font-semibold">
              {userInfo?.name} - {userInfo?.role}
            </p>
          }>
          <DropdownItem
            as={Link}
            href={APP_ROUTES.PROFILE}
            key="new"
            endContent={<User2 size={14} />}>
            Profile
          </DropdownItem>
          <DropdownItem
            key="logout"
            className="text-danger"
            color="danger"
            endContent={<LogOut size={14} />}
            onClick={onClickLogout}>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Topbar;
