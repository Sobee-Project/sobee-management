"use client"
import { useSendMessage } from "@/_hooks"
import { Button, Input } from "@nextui-org/react"
import { SendHorizonal } from "lucide-react"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"

type Props = {
  roomId: string
}

const SendMessage = ({ roomId }: Props) => {
  const { sendMessage, error, isError, isLoading, isSuccess } = useSendMessage(roomId)
  const [content, setContent] = useState("")

  useEffect(() => {
    if (isError) {
      toast.error(error)
    }
  }, [error, isError])

  const onSend = () => {
    setContent("")
    sendMessage(content)
  }

  return (
    <div className='inset-x-0 bottom-0 flex gap-2 border-t p-4'>
      <Input
        placeholder='Type a message...'
        onValueChange={setContent}
        value={content}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSend()
          }
        }}
        autoFocus
      />
      <Button color='primary' variant='light' isDisabled={!content || isLoading} isLoading={isLoading} isIconOnly>
        <SendHorizonal />
      </Button>
    </div>
  )
}

export default SendMessage
