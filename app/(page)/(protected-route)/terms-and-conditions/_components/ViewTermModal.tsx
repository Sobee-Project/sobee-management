import { ITerm } from "@/_lib/interfaces"
import { Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps } from "@nextui-org/react"
import { CheckIcon, X } from "lucide-react"

type Props = {
    term: ITerm
    modalProps: Omit<ModalProps, "children">
}

const ViewTermModal = ({ term, modalProps: { onClose: _onClose = () => {}, ...props } }: Props) => {
    return (
        <Modal {...props} onClose={_onClose} isDismissable>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className='flex flex-col gap-1'>{term.title}</ModalHeader>
                        <ModalBody>
                            <p>{term.description}</p>
                            {term.isApproved ? (
                                <Chip color='success' variant='bordered' startContent={<CheckIcon size={18} />}>
                                    Approved
                                </Chip>
                            ) : (
                                <Chip color='warning' variant='bordered' startContent={<X size={18} />}>
                                    Waiting for approval
                                </Chip>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button color='danger' variant='light' onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
export default ViewTermModal
