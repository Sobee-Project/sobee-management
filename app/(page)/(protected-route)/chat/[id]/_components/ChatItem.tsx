"use client"
import { COOKIES_KEY } from "@/_constants"
import { IChatMessage } from "@/_lib/interfaces"
import { cn } from "@/_lib/utils"
import { Tooltip } from "@nextui-org/react"
import { formatDistanceToNow } from "date-fns"
import { useCookies } from "next-client-cookies"
import React from "react"

type Props = {
  chat: IChatMessage
}

const ChatItem = ({ chat }: Props) => {
  const cookieData = useCookies()
  const userId = cookieData.get(COOKIES_KEY.USER_ID_KEY)
  const isSender = userId === chat.sender
  return (
    <div className={cn("max-w-[30rem] rounded p-2", isSender ? "self-end bg-primary" : "self-start bg-foreground-200")}>
      <p className={cn("text-sm dark:text-white", isSender ? "text-white" : "text-black")}>{chat.content}</p>
      <time className={cn("text-sm", isSender ? "text-white" : "text-foreground-500")}>
        {formatDistanceToNow(chat.createdAt!, { addSuffix: true })}
      </time>
    </div>
  )
}

export default ChatItem
