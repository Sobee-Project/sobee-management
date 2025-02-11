'use client';

import {useAuthContext} from '@/context';
import {IChatMessage} from '@/lib/interfaces';
import {cn} from '@/lib/utils';
import {formatDistanceToNow} from 'date-fns';

type Props = {
  chat: IChatMessage;
};

const ChatItem = ({chat}: Props) => {
  const {user} = useAuthContext();
  const userId = user?._id;
  const isSender = userId === chat.sender;

  return (
    <div
      className={cn(
        'max-w-[30rem] rounded p-2',
        isSender ? 'self-end bg-primary' : 'self-start bg-foreground-200',
      )}>
      <p
        className={cn(
          'text-sm dark:text-white',
          isSender ? 'text-white' : 'text-black',
        )}>
        {chat.content}
      </p>
      <time
        className={cn(
          'text-sm',
          isSender ? 'text-white' : 'text-foreground-500',
        )}>
        {formatDistanceToNow(chat.createdAt!, {addSuffix: true})}
      </time>
    </div>
  );
};

export default ChatItem;
