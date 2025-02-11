import {APP_ROUTES} from '@/constants';
import {useAuthContext} from '@/context';
import {EAssetType} from '@/lib/enums';
import {IChatRoom, IUser} from '@/lib/interfaces';
import {cn} from '@/lib/utils';
import {formatDistanceToNow} from 'date-fns';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

type Props = {
  room: IChatRoom;
};

const RoomItem = ({room}: Props) => {
  const {isHaveNew, createdBy, title, lastMessage} = room;
  const {user} = useAuthContext();
  const userId = user?._id;

  const lastMessageSender = lastMessage?.sender as IUser;
  const isSender = lastMessageSender?._id === userId;

  const pathname = usePathname();
  const isActive = pathname.includes(room._id!);

  const renderLastMessageContent = () => {
    if (!lastMessage || !lastMessageSender) return;
    switch (lastMessage.contentType) {
      case EAssetType.AUDIO:
        return (
          (isSender ? 'You' : lastMessageSender.name) + ' sent an audio message'
        );
      case EAssetType.IMAGE:
        return (isSender ? 'You' : lastMessageSender.name) + ' sent an image';
      case EAssetType.VIDEO:
        return (isSender ? 'You' : lastMessageSender.name) + ' sent a video';
      case EAssetType.DOCUMENT:
        return (isSender ? 'You' : lastMessageSender.name) + ' sent a document';
      default:
        return (
          (isSender ? 'You' : lastMessageSender.name) +
          ': ' +
          lastMessage.content
        );
    }
  };

  return (
    <Link
      href={APP_ROUTES.CHAT.ID.replace(':id', room._id!)}
      className={cn(
        'relative block rounded border border-foreground-200 p-2 transition-colors',
        isActive
          ? 'border-primary bg-primary bg-opacity-10'
          : 'hover:border-primary hover:bg-primary hover:bg-opacity-10',
      )}>
      <div className="flex items-center">
        <h2 className="flex-1 font-medium">{title}</h2>
      </div>
      {lastMessage && (
        <div className="flex items-end text-sm text-foreground-500">
          <span className={cn('line-clamp-1 flex-1')}>
            {renderLastMessageContent()}
          </span>
          <span className="line-clamp-1 text-xs">
            {formatDistanceToNow(lastMessage.updatedAt!)}
          </span>
        </div>
      )}
    </Link>
  );
};

export default RoomItem;
