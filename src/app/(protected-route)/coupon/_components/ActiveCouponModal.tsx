'use client';
import {ECouponStatus} from '@/lib/enums';
import {ICoupon} from '@/lib/interfaces';
import {
  useActiveCouponMutation,
  useDeactiveCouponMutation,
} from '@/services/coupon';
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
import {CircleCheck, CircleX} from 'lucide-react';
import toast from 'react-hot-toast';

type Props = {
  coupon: ICoupon;
};

export default function ActiveCouponModal({coupon}: Props) {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

  const isActive = coupon.status === ECouponStatus.ACTIVE;
  const isExpired = coupon.status === ECouponStatus.EXPIRED;

  const activeCouponMutation = useActiveCouponMutation();
  const deactiveCouponMutation = useDeactiveCouponMutation();

  const isExecuting =
    activeCouponMutation.isPending || deactiveCouponMutation.isPending;

  const handleAction = () => {
    const handler = isActive ? deactiveCouponMutation : activeCouponMutation;
    handler.mutate(coupon._id!, {
      onSuccess: data => {
        if (data.success) {
          toast.success(data.message);
          onClose();
        } else {
          toast.error(data.message);
        }
      },
    });
  };

  return (
    <>
      <Tooltip content={`${isActive ? 'Disabled' : 'Active'} Coupon`}>
        <Button
          color={`${isExpired || isActive ? 'danger' : 'success'}`}
          variant="light"
          isIconOnly
          onClick={onOpen}
          disabled={isExpired}
          isDisabled={isExpired}>
          {isExpired || isActive ? (
            <CircleX size={20} />
          ) : (
            <CircleCheck size={20} />
          )}
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to{' '}
                  <strong>{isActive ? 'disabled' : 'active'}</strong> this
                  coupon <strong>{coupon.code}</strong>?
                </p>
              </ModalBody>
              <ModalFooter className="items-center justify-center">
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color={`${isActive ? 'danger' : 'primary'}`}
                  onPress={handleAction}>
                  {isExecuting
                    ? 'Processing...'
                    : isActive
                      ? 'Disabled'
                      : 'Active'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
