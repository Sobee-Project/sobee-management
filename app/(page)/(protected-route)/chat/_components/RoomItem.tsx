import { APP_ROUTES, COOKIES_KEY } from "@/_constants"
import { EAssetType } from "@/_lib/enums"
import { IChatRoom, IUser } from "@/_lib/interfaces"
import { cn } from "@/_lib/utils"
import { format, formatDistanceToNow } from "date-fns"
import { useCookies } from "next-client-cookies"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import React from "react"

type Props = {
  room: IChatRoom
}

const RoomItem = ({ room }: Props) => {
  const { isHaveNew, createdBy, title, lastMessage } = room
  const cookieData = useCookies()
  const userId = cookieData.get(COOKIES_KEY.USER_ID_KEY)

  const lastMessageSender = lastMessage?.sender as IUser
  const isSender = lastMessageSender?._id === userId

  const pathname = usePathname()
  const isActive = pathname.includes(room._id!)

  const renderLastMessageContent = () => {
    if (!lastMessage || !lastMessageSender) return
    switch (lastMessage.contentType) {
      case EAssetType.AUDIO:
        return (isSender ? "You" : lastMessageSender.name) + " sent an audio message"
      case EAssetType.IMAGE:
        return (isSender ? "You" : lastMessageSender.name) + " sent an image"
      case EAssetType.VIDEO:
        return (isSender ? "You" : lastMessageSender.name) + " sent a video"
      case EAssetType.DOCUMENT:
        return (isSender ? "You" : lastMessageSender.name) + " sent a document"
      default:
        return (isSender ? "You" : lastMessageSender.name) + ": " + lastMessage.content
    }
  }

  return (
    <Link
      href={APP_ROUTES.CHAT.ID.replace(":id", room._id!)}
      className={cn(
        "relative block rounded border border-foreground-200 p-2 transition-colors",
        isActive
          ? "border-primary bg-primary bg-opacity-10"
          : "hover:border-primary hover:bg-primary hover:bg-opacity-10 "
      )}
    >
      <div className='flex items-center'>
        <h2 className='flex-1 font-medium'>{title}</h2>
        {isHaveNew && <div className='mb-1 size-3 rounded-full bg-danger-500' />}
      </div>
      {lastMessage && (
        <div className='flex items-end text-sm text-foreground-500'>
          <span className={cn("line-clamp-1 flex-1")}>{renderLastMessageContent()}</span>
          <span className='line-clamp-1 text-xs'>{formatDistanceToNow(lastMessage.updatedAt!)}</span>
        </div>
      )}
    </Link>
  )
}

export default RoomItem
