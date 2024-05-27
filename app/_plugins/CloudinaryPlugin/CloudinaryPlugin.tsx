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
import { Cloud, Link, MonitorSmartphone, Server } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { CloudinaryPluginProps, ViaDevice, ViaURL } from "."
import ViaCloud from "./ViaCloud"

const CloudinaryPlugin = ({
  className,
  onUploadError,
  onUploadSuccess,
  onClose,
  visible,
  assetType = "auto",
  folder = "default",
  multiple = true
}: CloudinaryPluginProps) => {
  const {
    isOpen,
    onClose: _onClose,
    onOpenChange
  } = useDisclosure({
    isOpen: visible,
    onClose
  })

  const [tab, setTab] = useState<"Local" | "URL" | "Via Cloud">("Local")
  const [files, setFiles] = useState<File[] | FileList | null>(null)
  const [url, setUrl] = useState<string>("")
  const [filesUrl, setFilesUrl] = useState<string[]>([])

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
    if (tab === "Via Cloud") {
      onUploadSuccess?.({ urls: filesUrl })
      _onClose()
      return
    }
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
        break
      case url !== "":
        formData.append("url", url)
        break
      default:
        return
    }
    formData.append("resourceType", assetType)
    formData.append("folder", folder)

    execute(formData)
  }

  console.log(filesUrl)

  return (
    <Modal isOpen={isOpen} size='3xl' onOpenChange={onOpenChange} scrollBehavior='inside'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Upload</ModalHeader>
            <ModalBody>
              <div className={cn("flex flex-col gap-4", className)}>
                <Tabs selectedKey={tab} onSelectionChange={(v) => setTab(v as any)}>
                  <Tab
                    className='py-0'
                    isDisabled={isFilesDisabled || isLoading}
                    key={"Local"}
                    title={
                      <div className='flex items-center gap-2'>
                        <MonitorSmartphone size={20} />
                        <span className='hidden sm:block'>Via Device</span>
                      </div>
                    }
                  >
                    <ViaDevice
                      files={files}
                      setFiles={setFiles}
                      type={assetType}
                      isLoading={isLoading}
                      multiple={multiple}
                    />
                  </Tab>
                  <Tab
                    className='py-0'
                    isDisabled={isUrlDisabled || isLoading}
                    key={"URL"}
                    title={
                      <div className='flex items-center gap-2'>
                        <Link size={20} />
                        <span className='hidden sm:block'>Via URL</span>
                      </div>
                    }
                  >
                    <ViaURL url={url} setUrl={setUrl} isLoading={isLoading} />
                  </Tab>
                  <Tab
                    className='py-0'
                    isDisabled={isUrlDisabled || isLoading}
                    key={"Via Cloud"}
                    title={
                      <div className='flex items-center gap-2'>
                        <Server size={20} />
                        <span className='hidden sm:block'>Via Cloud</span>
                      </div>
                    }
                  >
                    <ViaCloud
                      multiple={multiple}
                      type={assetType}
                      folder={folder}
                      files={filesUrl}
                      setFiles={setFilesUrl}
                    />
                  </Tab>
                </Tabs>
              </div>
            </ModalBody>
            <ModalFooter>
              {tab === "Via Cloud" ? (
                <Button
                  color='primary'
                  isDisabled={isLoading || filesUrl.length === 0}
                  onPress={onUpload}
                  isLoading={isLoading}
                >
                  Choose
                </Button>
              ) : (
                <Button
                  color='primary'
                  isDisabled={isLoading || ((files === null || files.length === 0) && url === "")}
                  onPress={onUpload}
                  isLoading={isLoading}
                >
                  {isLoading ? "Uploading..." : "Upload"}
                </Button>
              )}
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
