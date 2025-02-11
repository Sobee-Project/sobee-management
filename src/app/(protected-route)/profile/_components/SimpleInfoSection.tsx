'use client';

import {ScreenLoader} from '@/components';
import {IUser} from '@/lib/interfaces';
import {useChangeAvatarMutation} from '@/services/user';
import {Button, Chip} from '@nextui-org/react';
import {Camera} from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {useState} from 'react';
import toast from 'react-hot-toast';

const CloudinaryPlugin = dynamic(
  () => import('@/plugins').then(r => r.CloudinaryPlugin),
  {
    ssr: false,
    loading: () => <ScreenLoader />,
  },
);

type Props = {
  userInfo: IUser;
};

const SimpleInfoSection = ({userInfo}: Props) => {
  const [showPlugin, setShowPlugin] = useState(false);

  const changeAvatarMutation = useChangeAvatarMutation();

  const isLoading = changeAvatarMutation.isPending;

  const onUploadSuccess = (url: string) => {
    changeAvatarMutation.mutate(
      {avatar: url},
      {
        onSuccess: data => {
          if (data.success) {
            toast.success(data.message);
          } else {
            toast.error(data.message || 'Failed to change avatar');
          }
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || 'Failed to change avatar',
          );
        },
      },
    );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 rounded-md bg-background p-8 shadow-custom-light">
        <div className="relative size-24 rounded-full">
          <Image
            src={userInfo?.avatar!}
            alt="profile"
            width={100}
            height={100}
            className="size-full rounded-full object-cover"
            objectFit="cover"
          />
          <Button
            size="sm"
            radius="full"
            isIconOnly
            className="absolute bottom-0 right-0 border-2 border-white"
            color="primary"
            isLoading={isLoading}
            isDisabled={isLoading}
            onPress={() => setShowPlugin(true)}>
            <label
              htmlFor="file-zone"
              className="absolute inset-0 grid size-full cursor-pointer place-items-center">
              <Camera size={18} />
            </label>
          </Button>
        </div>
        <h2 className="text-2xl font-bold">{userInfo?.name}</h2>
        <Chip color="default">{userInfo?.role}</Chip>
      </div>
      {showPlugin && (
        <CloudinaryPlugin
          visible={showPlugin}
          onClose={() => setShowPlugin(false)}
          onUploadSuccess={({urls}) => onUploadSuccess(urls[0])}
          assetType="image"
        />
      )}
    </>
  );
};

export default SimpleInfoSection;
