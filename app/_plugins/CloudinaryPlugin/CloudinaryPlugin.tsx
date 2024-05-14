"use client"
import { uploadFile, uploadUrl } from "@/_actions"
import { cn } from "@/_lib/utils"
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Tab,
    Tabs,
    useDisclosure
} from "@nextui-org/react"
import { Link, MonitorSmartphone } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { CloudinaryPluginProps, ViaDevice, ViaURL } from "."

const CloudinaryPlugin = ({
    className,
    onUploadError,
    onUploadSuccess,
    onClose,
    visible,
    assetType = "*"
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

    const { execute, status } = useAction(isFilesDisabled ? uploadUrl : uploadFile, {
        onSuccess: ({ data }) => {
            if (data.success) {
                setFiles(null)
                setUrl("")
                toast.success(data.message)
                onUploadSuccess?.(data.data!)
                _onClose()
            } else {
                toast.error(data.message)
                onUploadError?.()
            }
        },
        onError: ({ error }) => {
            console.error(error)
            toast.error("An error occurred while uploading the file.")
            onUploadError?.()
        }
    })

    const isLoading = status === "executing"

    const onUpload = async () => {
        const formData = new FormData()
        switch (true) {
            case files !== null && files.length > 0:
                const _files = [...files]
                if (_files.length === 1) {
                    formData.append("files", _files[0])
                } else {
                    _files.forEach((file) => {
                        formData.append("files", file)
                    })
                }
                assetType !== "*" && formData.append("resourceType", assetType)
                break
            case url !== "":
                formData.append("url", url)
                formData.append("resourceType", "image")
                break
            default:
                return
        }

        execute(formData)
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
                                        isDisabled={isFilesDisabled || isLoading}
                                        key={"Local"}
                                        title={
                                            <div className='flex items-center gap-2'>
                                                <MonitorSmartphone size={20} />
                                                <span>Via Device</span>
                                            </div>
                                        }
                                    >
                                        <ViaDevice
                                            files={files}
                                            setFiles={setFiles}
                                            type={assetType}
                                            isLoading={isLoading}
                                        />
                                    </Tab>
                                    <Tab
                                        className='py-0'
                                        isDisabled={isUrlDisabled || isLoading}
                                        key={"URL"}
                                        title={
                                            <div className='flex items-center gap-2'>
                                                <Link size={20} />
                                                <span>Via URL</span>
                                            </div>
                                        }
                                    >
                                        <ViaURL url={url} setUrl={setUrl} isLoading={isLoading} />
                                    </Tab>
                                </Tabs>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color='primary'
                                isDisabled={isLoading || ((files === null || files.length === 0) && url === "")}
                                onPress={onUpload}
                                isLoading={isLoading}
                            >
                                {isLoading ? "Uploading..." : "Upload"}
                            </Button>
                            <Button color='danger' variant='light' onPress={onClose} isDisabled={isLoading}>
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
