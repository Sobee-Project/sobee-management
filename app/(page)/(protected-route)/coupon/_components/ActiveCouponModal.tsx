import { activeCoupon, deactiveCoupon } from "@/_actions"
import { ECouponStatus } from "@/_lib/enums"
import { ICoupon } from "@/_lib/interfaces"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure
} from "@nextui-org/react"
import { CircleCheck, CircleX } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import toast from "react-hot-toast"

type Props = {
  coupon: ICoupon
}

export default function ActiveCouponModal({ coupon }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const isActive = coupon.status === ECouponStatus.ACTIVE
  const isExpired = coupon.status === ECouponStatus.EXPIRED

  const { execute, status } = useAction(isActive ? deactiveCoupon : activeCoupon, {
    onSuccess: ({ data }) => {
      if (data.success) {
        onClose()
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    }
  })

  const isExecuting = status === "executing"

  const handleAction = () => {
    execute(coupon._id!)
  }

  return (
    <>
      <Tooltip content={`${isActive ? "Disabled" : "Active"} Coupon`}>
        <Button
          color={`${isExpired || isActive ? "danger" : "success"}`}
          variant='light'
          isIconOnly
          onClick={onOpen}
          disabled={isExpired}
          isDisabled={isExpired}
        >
          {isExpired || isActive ? <CircleX size={20} /> : <CircleCheck size={20} />}
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to <strong>{isActive ? "disabled" : "active"}</strong> this coupon{" "}
                  <strong>{coupon.code}</strong>?
                </p>
              </ModalBody>
              <ModalFooter className='items-center justify-center'>
                <Button color='primary' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color={`${isActive ? "danger" : "primary"}`} onPress={handleAction}>
                  {isExecuting ? "Processing..." : isActive ? "Disabled" : "Active"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
