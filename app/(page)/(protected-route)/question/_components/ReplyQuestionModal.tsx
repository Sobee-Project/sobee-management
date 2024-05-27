import { replyQuestion } from "@/_actions"
import { IProduct, IQuestion } from "@/_lib/interfaces"
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure
} from "@nextui-org/react"
import { useAction } from "next-safe-action/hooks"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"

type Props = {
  question: IQuestion
  visible: boolean
  onClose: () => void
}

const ReplyQuestionModal = ({ question, visible, onClose }: Props) => {
  const {
    isOpen,
    onClose: _onClose,
    onOpenChange
  } = useDisclosure({
    isOpen: visible,
    onClose
  })
  const [content, setContent] = useState("")

  useEffect(() => {
    if (question.answer) setContent(question.answer.content)
  }, [question])

  const { execute, status } = useAction(replyQuestion, {
    onSuccess: ({ data }) => {
      if (data.success) {
        toast.success(data.message)
        _onClose()
      } else {
        toast.error(data.message)
      }
    }
  })

  const isLoading = status === "executing"
  const product = question.product as IProduct

  const onSubmit = () => {
    execute({
      _id: question._id!,
      content
    })
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h2>Reply to Question</h2>
            </ModalHeader>
            <ModalBody>
              <div className='flex items-center gap-2'>
                <Image src={product.thumbnail} width={50} height={50} alt={product.name} className='rounded border' />
                <p>{product.name}</p>
              </div>
              <Divider />
              <p>
                <span className='font-medium'>Q:</span> {question.content}
              </p>
              <Textarea
                placeholder='Enter your reply...'
                className='w-full'
                value={content}
                onValueChange={setContent}
              />
            </ModalBody>
            <ModalFooter>
              <Button color='primary' isLoading={isLoading} isDisabled={content.length === 0} onPress={onSubmit}>
                Reply
              </Button>
              <Button onClick={onClose} variant='light'>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ReplyQuestionModal
