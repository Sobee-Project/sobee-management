import { banCustomer, unbanCustomer } from "@/_actions"
import { ICustomer, IUser } from "@/_lib/interfaces"
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
import { Ban, CircleCheck } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import React from "react"
import toast from "react-hot-toast"

type Props = {
    customer: IUser<ICustomer>
}

export default function BanCustomerModal({ customer }: Props) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

    const isActive = (customer?._user as ICustomer).isActive

    const { execute, status } = useAction(isActive ? banCustomer : unbanCustomer, {
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
        execute(customer._id!)
    }

    return (
        <>
            {isActive ? (
                <Tooltip content='Block customer'>
                    <Button color='warning' variant='light' isIconOnly onClick={onOpen}>
                        <Ban size={20} />
                    </Button>
                </Tooltip>
            ) : (
                <Tooltip content='Active Customer'>
                    <Button color='success' variant='light' isIconOnly onClick={onOpen}>
                        <CircleCheck size={20} />
                    </Button>
                </Tooltip>
            )}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Ban Customer</ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to ban <span className='text-primary'>{customer.name}</span>?
                                </p>
                            </ModalBody>
                            <ModalFooter className='items-center justify-center'>
                                <Button color='warning' variant='light' onPress={onClose}>
                                    Close
                                </Button>
                                <Button color={`${isActive ? "danger" : "primary"}`} onPress={handleAction}>
                                    {isExecuting ? "Processing..." : isActive ? "Ban" : "Activate"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
