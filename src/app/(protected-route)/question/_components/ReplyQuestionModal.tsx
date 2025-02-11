import {IProduct, IQuestion} from '@/lib/interfaces';
import {useReplyQuestionMutation} from '@/services/question';
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';

type Props = {
  question: IQuestion;
  visible: boolean;
  onClose: () => void;
};

const ReplyQuestionModal = ({question, visible, onClose}: Props) => {
  const {
    isOpen,
    onClose: _onClose,
    onOpenChange,
  } = useDisclosure({
    isOpen: visible,
    onClose,
  });
  const [content, setContent] = useState('');

  useEffect(() => {
    if (question.answer) setContent(question.answer.content);
  }, [question]);

  const replyQuestionMutation = useReplyQuestionMutation(question._id!);

  const isLoading = replyQuestionMutation.isPending;
  const product = question.product as IProduct;

  const onSubmit = () => {
    replyQuestionMutation.mutate(
      {
        content,
      },
      {
        onSuccess: data => {
          if (data.success) {
            toast.success(data.message);
            onClose();
          } else {
            toast.error(data.message);
          }
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || 'Failed to reply question',
          );
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader>
              <h2>Reply to Question</h2>
            </ModalHeader>
            <ModalBody>
              <div className="flex items-center gap-2">
                <Image
                  src={product.thumbnail}
                  width={50}
                  height={50}
                  alt={product.name}
                  className="rounded border"
                />
                <p>{product.name}</p>
              </div>
              <Divider />
              <p>
                <span className="font-medium">Q:</span> {question.content}
              </p>
              <Textarea
                placeholder="Enter your reply..."
                className="w-full"
                value={content}
                onValueChange={setContent}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                isLoading={isLoading}
                isDisabled={content.length === 0}
                onPress={onSubmit}>
                Reply
              </Button>
              <Button onClick={onClose} variant="light">
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ReplyQuestionModal;
