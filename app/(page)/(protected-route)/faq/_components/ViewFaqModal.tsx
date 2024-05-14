import { IFaq } from "@/_lib/interfaces"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps } from "@nextui-org/react"

type Props = {
    faq: IFaq
    modalProps: Omit<ModalProps, "children">
}

const ViewFaqModal = ({ faq, modalProps: { onClose: _onClose = () => {}, ...props } }: Props) => {
    return (
        <Modal {...props} onClose={_onClose} isDismissable>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className='flex flex-col gap-1'>{faq.title}</ModalHeader>
                        <ModalBody>
                            <p>{faq.description}</p>
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
export default ViewFaqModal
