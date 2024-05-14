"use client"
import { uploadFile } from "@/_actions"
import { cn } from "@/_lib/utils"
import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Tab,
    Tabs,
    useDisclosure
} from "@nextui-org/react"
import { ClassValue } from "clsx"
import { Link, MonitorSmartphone } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useEffect, useState } from "react"
import { CloudinaryPluginProps, ViaDevice, ViaURL } from "."

const CloudinaryPlugin = ({
    className,
    onUploadError,
    onUploadSuccess,
    onClose,
    visible,
    assetTypes = "*"
}: CloudinaryPluginProps) => {
    const {
        isOpen,
        onClose: _onClose,
        onOpenChange
    } = useDisclosure({
        isOpen: visible,
        onClose
    })
    const [files, setFiles] = useState<File[] | FileList | null>(null)
    const [url, setUrl] = useState<string>("")

    useEffect(() => {
        return () => {
            setFiles(null)
            setUrl("")
        }
    }, [])

    const isUrlDisabled = files !== null ? files.length > 0 : false
    const isFilesDisabled = url !== ""

    const { execute } = useAction(uploadFile, {
        onSuccess: ({ data }) => {
            console.log(data)
        },
        onError: (error) => {
            console.error(error)
        }
    })

    const onUpload = async () => {
        console.log("OK")
        const file = files !== null ? files[0] : url
        execute({ file: JSON.stringify(file), resourceType: "image" })
    }

    const _onUploadSuccess = (response: any) => {
        onUploadSuccess && onUploadSuccess(response)
    }

    const _onUploadError = (error: Error) => {
        onUploadError && onUploadError(error)
    }

    return (
        <Modal isOpen={isOpen} size='3xl' onOpenChange={onOpenChange} scrollBehavior='inside'>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Upload</ModalHeader>
                        <ModalBody>
                            <div className={cn("flex flex-col gap-4", className)}>
                                <Tabs>
                                    <Tab
                                        className='py-0'
                                        isDisabled={isFilesDisabled}
                                        key={"Local"}
                                        title={
                                            <div className='flex items-center gap-2'>
                                                <MonitorSmartphone size={20} />
                                                <span>Via Device</span>
                                            </div>
                                        }
                                    >
                                        <ViaDevice files={files} setFiles={setFiles} types={assetTypes} />
                                    </Tab>
                                    <Tab
                                        className='py-0'
                                        isDisabled={isUrlDisabled}
                                        key={"URL"}
                                        title={
                                            <div className='flex items-center gap-2'>
                                                <Link size={20} />
                                                <span>Via URL</span>
                                            </div>
                                        }
                                    >
                                        <ViaURL url={url} setUrl={setUrl} />
                                    </Tab>
                                </Tabs>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color='primary'
                                isDisabled={(files === null || files.length === 0) && url === ""}
                                onPress={onUpload}
                            >
                                Upload
                            </Button>
                            <Button color='danger' variant='light' onPress={onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default CloudinaryPlugin
