'use client';

import {INotification} from '@/lib/interfaces';
import {useDeleteNotificationMutation} from '@/services/notification';
import {Button} from '@nextui-org/react';
import {X} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

type NotificationItemProps = {
  notification: INotification;
};
const NotificationItem = ({notification}: NotificationItemProps) => {
  const {title, content, imageUrl, type, redirectUrl} = notification;
  const deleteNotification = useDeleteNotificationMutation();

  const handleDelete = async () => {
    deleteNotification.mutate(notification._id!, {
      onSuccess: data => {
        if (data.success) {
          toast.success('Notification deleted successfully');
        } else {
          toast.error('Failed to delete notification');
        }
      },
      onError: error => {
        toast.error(error.message);
      },
    });
  };

  const isLoading = deleteNotification.isPending;

  return (
    <div className="group relative flex items-start gap-4 rounded-lg border bg-white p-4 shadow-sm transition hover:bg-gray-100">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80" />
      )}
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="flex-1 text-sm text-gray-600">{content}</p>
        <span className="text-xs font-medium uppercase text-blue-500">
          {type}
        </span>
        {redirectUrl && (
          <Link
            href={redirectUrl}
            className="mt-2 block text-sm text-blue-600 hover:underline">
            View Details
          </Link>
        )}
      </div>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          width={200}
          height={200}
          className="size-20 rounded-md object-cover"
        />
      )}
      <Button
        isDisabled={isLoading}
        size="sm"
        variant="light"
        isIconOnly
        onPress={handleDelete}
        className="invisible group-hover:visible">
        <X size={16} />
      </Button>
    </div>
  );
};

export default NotificationItem;
