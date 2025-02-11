import {ICustomer, IUser} from '@/lib/interfaces';
import {
  useBanCustomerMutation,
  useUnbanCustomerMutation,
} from '@/services/customer';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import {Ban, CircleCheck} from 'lucide-react';
import toast from 'react-hot-toast';

type Props = {
  customer: IUser<ICustomer>;
};

export default function BanCustomerModal({customer}: Props) {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

  const isActive = (customer?._user as ICustomer).isActive;

  const banCustomerMutation = useBanCustomerMutation();
  const unbanCustomerMutation = useUnbanCustomerMutation();

  const isExecuting =
    banCustomerMutation.isPending || unbanCustomerMutation.isPending;

  const handleAction = () => {
    const handler = isActive ? banCustomerMutation : unbanCustomerMutation;

    handler.mutate(customer._id!, {
      onSuccess: data => {
        if (data.success) {
          onClose();

          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Failed to process');
      },
    });
  };

  return (
    <>
      {isActive ? (
        <Tooltip content="Block customer">
          <Button color="warning" variant="light" isIconOnly onClick={onOpen}>
            <Ban size={20} />
          </Button>
        </Tooltip>
      ) : (
        <Tooltip content="Active Customer">
          <Button color="success" variant="light" isIconOnly onClick={onOpen}>
            <CircleCheck size={20} />
          </Button>
        </Tooltip>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>Ban Customer</ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to ban{' '}
                  <span className="text-primary">{customer.name}</span>?
                </p>
              </ModalBody>
              <ModalFooter className="items-center justify-center">
                <Button color="warning" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color={`${isActive ? 'danger' : 'primary'}`}
                  onPress={handleAction}>
                  {isExecuting
                    ? 'Processing...'
                    : isActive
                      ? 'Ban'
                      : 'Activate'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
