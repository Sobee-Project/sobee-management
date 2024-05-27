import { APP_ROUTES } from "@/_constants"
import { commaFormatter } from "@/_lib/_utils"
import { ECouponType } from "@/_lib/enums"
import { ICoupon } from "@/_lib/interfaces"
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  Tooltip,
  useDisclosure
} from "@nextui-org/react"
import { format } from "date-fns"
import { Eye } from "lucide-react"
import Image from "next/image"

type Props = {
  coupon: ICoupon
}

export default function ViewCouponModal({ coupon }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  return (
    <>
      <Tooltip content={`View Coupon`}>
        <Button color='primary' variant='light' isIconOnly onClick={onOpen}>
          <Eye size={20} />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Coupon review</ModalHeader>
              <ModalBody>
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center gap-4'>
                    <Image src={coupon.image} alt={coupon.code} objectFit='contain' width={200} height={150} />
                    <div className='flex flex-col gap-2'>
                      <p className='text-lg font-bold'>{coupon.code}</p>
                      {/* <p>{coupon.description}</p> */}
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p>
                      <span className='font-semibold'>Type:</span> {coupon.type}
                    </p>
                    <p>
                      <span className='font-semibold'>Discount:</span>{" "}
                      {coupon.type === ECouponType.PERCENTAGE
                        ? `${coupon.discountValue}%`
                        : `${commaFormatter(coupon.discountValue)}`}
                    </p>
                    <p>
                      <span className='font-semibold'>Min order value:</span> {commaFormatter(coupon.minOrderValue)}
                    </p>
                    <p>
                      <span className='font-semibold'>Start date:</span>{" "}
                      {format(new Date(coupon.startDate as string), "dd/MM/yyyy")}
                    </p>
                    <p>
                      <span className='font-semibold'>End date:</span>{" "}
                      {format(new Date(coupon.endDate as string), "dd/MM/yyyy")}
                    </p>
                    <p>
                      <span className='font-semibold'>Usage limit:</span> {coupon.usageLimit}
                    </p>
                    <div className='flex items-start gap-2'>
                      <span className='font-semibold'>Usage:</span>
                      <Progress
                        value={(coupon.usageCount / coupon.usageLimit) * 100}
                        showValueLabel={true}
                        color='warning'
                      />
                    </div>
                    <p>
                      <span className='font-semibold'>Apply to:</span> {coupon.applyTo}
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className='items-center justify-center'>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' as={Link} href={APP_ROUTES.COUPONS.EDIT.replace(":id", coupon?._id!)}>
                  Edit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
