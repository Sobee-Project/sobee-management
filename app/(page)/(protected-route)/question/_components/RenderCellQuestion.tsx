"use client"
import { deleteQuestion } from "@/_actions"
import { IProduct, IQuestion, IUser } from "@/_lib/interfaces"
import { Avatar, Button, Popover, PopoverContent, PopoverTrigger, Spinner } from "@nextui-org/react"
import { format } from "date-fns"
import { SquarePen, Trash2 } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import dynamic from "next/dynamic"
import Image from "next/image"
import { Key, useState } from "react"
import toast from "react-hot-toast"
import { QuestionColumnKey } from "../_mock"

const ReplyQuestionModal = dynamic(() => import("./ReplyQuestionModal"), {
  ssr: false,
  loading: () => <Spinner />
})

type Props = {
  question: IQuestion
  columnKey: Key
}

const RenderCellQuestion = ({ question, columnKey }: Props) => {
  const cellValue = question[columnKey as keyof IQuestion]
  const [showPopover, setShowPopover] = useState(false)
  const [showReplyModal, setShowReplyModal] = useState(false)

  const { execute, status } = useAction(deleteQuestion, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    }
  })
  const isLoading = status === "executing"

  const onDelete = () => {
    execute(question._id!)
  }
  const product = question.product as IProduct
  const customer = question.customer as IUser

  switch (columnKey as QuestionColumnKey) {
    case "product":
      return (
        <div className='flex items-center gap-2'>
          <Image src={product.thumbnail} width={50} height={50} alt={product.name} className='rounded' />
          <p>{product.name}</p>
        </div>
      )
    case "question_and_answer":
      return (
        <div>
          <p>
            Q: {question.content} ({question.likes?.length || 0} likes)
          </p>
          {question.answer && (
            <p>
              A: {question.answer.content} ({question.answer.likes?.length || 0} likes)
            </p>
          )}
        </div>
      )
    case "customer":
      return (
        <div className='flex items-center gap-2'>
          <Avatar src={customer.avatar} alt={customer.name} />
          <p>{customer.name}</p>
        </div>
      )
    case "createdAt":
      return <p>{format(new Date(question.createdAt!), "dd/MM/yyyy 'at' HH:mm")}</p>
    case "actions":
      return (
        <div className='flex items-center gap-1'>
          <Button isIconOnly variant='light' size='sm' color='primary' onPress={() => setShowReplyModal(true)}>
            <SquarePen size={20} />
          </Button>
          {showReplyModal && (
            <ReplyQuestionModal question={question} visible={showReplyModal} onClose={() => setShowReplyModal(false)} />
          )}
          <Popover placement='right' isOpen={showPopover} onOpenChange={setShowPopover} showArrow>
            <PopoverTrigger>
              <Button isIconOnly variant='light' color='danger' size='sm' onClick={() => console.log("delete")}>
                <Trash2 size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className='space-y-2 self-end px-1 py-2'>
                <p className='font-bold'>Delete confirmation</p>
                <p>Are you sure you want to delete this question?</p>
                <div className='flex justify-end space-x-2'>
                  <Button color='danger' onClick={onDelete} size='sm'>
                    {isLoading ? "Deleting..." : "Yes"}
                  </Button>
                  <Button color='default' onClick={() => setShowPopover(false)} size='sm'>
                    No
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )
    default:
      return <>{cellValue}</>
  }
}

export default RenderCellQuestion
