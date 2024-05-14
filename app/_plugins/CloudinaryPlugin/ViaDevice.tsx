"use client"
import { cn, fromFileSizeToReadable } from "@/_lib/utils"
import { Button, Link } from "@nextui-org/react"
import { AnimatePresence, motion } from "framer-motion"
import { PlusIcon, Trash2Icon, UploadCloudIcon } from "lucide-react"
import Image from "next/image"
import React, { useCallback, useMemo, useState } from "react"
import { DefaultExtensionType, FileIcon, IconType, defaultStyles } from "react-file-icon"
import { AssetType } from "."

type Props = {
    files: File[] | FileList | null
    setFiles: (files: File[] | FileList | null) => void
    types?: AssetType[] | "*"
}

const ViaDevice = ({ files, setFiles, types = "*" }: Props) => {
    const uploadRef = React.useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = useState(false)

    const onBrowse = () => {
        uploadRef.current?.click()
    }

    const onFilesChange = (_files: File[] | FileList | null) => {
        const currentFiles = files ? [...files] : ([] as File[])
        const newFiles = _files ? [..._files] : ([] as File[])
        const ids = new Set(newFiles.map((file) => file.name))
        const merged = [...newFiles, ...currentFiles.filter((file) => !ids.has(file.name))]
        setFiles(merged)
    }

    const onRemove = useCallback(
        (index: number) => {
            const newFiles = files ? [...files] : ([] as File[])
            newFiles.splice(index, 1)
            setFiles(newFiles)
        },
        [files, setFiles]
    )

    const onClear = () => {
        setFiles(null)
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        onFilesChange(files)
    }

    const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        const files = e.dataTransfer.files
        onFilesChange(files)
    }

    const renderFiles = useCallback(() => {
        return (
            files && (
                <div className='grid gap-2 md:grid-cols-2'>
                    {[...files].map((file, index) => {
                        const fileType = file.type
                        const key = `${file.name}-${index}-${file.lastModified}`
                        const fileName = file.name.split(".").shift()
                        const ext = (file.name.split(".").pop() || "") as DefaultExtensionType
                        const type = file.type.split("/")[0] as IconType
                        const renderFileType = () => {
                            switch (true) {
                                case fileType.includes("image"):
                                    return (
                                        <Image
                                            key={key}
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            width={100}
                                            height={100}
                                            className='w-12 object-contain'
                                        />
                                    )
                                default:
                                    return (
                                        <div className='h-auto w-8' key={key}>
                                            <FileIcon extension={ext} type={type} {...defaultStyles[ext]} />
                                        </div>
                                    )
                            }
                        }
                        return (
                            <motion.div
                                key={key}
                                className='group flex h-fit cursor-pointer items-center gap-2 rounded-lg border p-2 shadow-sm transition-all hover:border-primary sm:hover:shadow-md'
                                transition={{ duration: 1 }}
                                initial='hidden'
                                animate='visible'
                                exit='hidden'
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1 }
                                }}
                            >
                                {renderFileType()}
                                <div className='flex-1'>
                                    <span className='line-clamp-1 text-sm group-hover:text-primary'>{fileName}</span>
                                    <span className='text-xs text-gray-500 group-hover:text-primary'>
                                        .{ext} - {fromFileSizeToReadable(file.size)}
                                    </span>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <Button
                                        as={Link}
                                        href={URL.createObjectURL(file)}
                                        target='_blank'
                                        isIconOnly
                                        showAnchorIcon
                                        variant='light'
                                        color='primary'
                                        size='sm'
                                    />
                                    <Button
                                        isIconOnly
                                        variant='light'
                                        color='danger'
                                        size='sm'
                                        onPress={() => onRemove(index)}
                                    >
                                        <Trash2Icon size={14} />
                                    </Button>
                                </div>
                            </motion.div>
                        )
                    })}
                    <Button
                        variant='flat'
                        startContent={<PlusIcon size={16} />}
                        className='h-full min-h-14 self-start'
                        onClick={onBrowse}
                    >
                        Add more
                    </Button>
                </div>
            )
        )
    }, [files, onRemove])

    const acceptType = useMemo(() => {
        if (types === "*") return "*"
        const _types = types.map((type) => {
            switch (type) {
                case "image":
                    return "image/*"
                case "video":
                    return "video/*"
                case "audio":
                    return "audio/*"
                case "raw":
                    return "application/*, text/*"
                default:
                    return "*"
            }
        })

        return _types.join(", ")
    }, [types])

    return (
        <div
            className='flex flex-col gap-4'
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            <input
                type='file'
                className='hidden'
                ref={uploadRef}
                onChange={onFileChange}
                multiple
                accept={acceptType}
            />
            {(!files || (files && files.length === 0)) && (
                <AnimatePresence>
                    <div
                        className={cn(
                            "flex flex-col items-center gap-3 rounded-lg border-2 border-dashed p-4 transition-colors",
                            isDragging && "border-primary"
                        )}
                    >
                        <UploadCloudIcon
                            className={cn("size-20 md:size-32", !isDragging ? "stroke-gray-300" : "stroke-primary")}
                            strokeWidth={1.5}
                        />
                        <p className={cn("text-center text-sm", isDragging ? "text-primary" : "text-gray-500")}>
                            Drag and drop here to upload
                        </p>
                        {!isDragging && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                exit={{ opacity: 0 }}
                                className='flex flex-col items-center gap-2'
                            >
                                <span className={cn("text-sm text-gray-500")}>or</span>
                                <Button variant='flat' onPress={onBrowse}>
                                    Browse File
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </AnimatePresence>
            )}
            {files && files.length > 0 && (
                <div className='flex flex-col gap-2'>
                    <div className='self-end'>
                        <Button
                            variant='light'
                            size='sm'
                            color='danger'
                            startContent={<Trash2Icon size={16} />}
                            className='self-start'
                            onClick={onClear}
                        >
                            Clear
                        </Button>
                    </div>
                    {renderFiles()}
                </div>
            )}
        </div>
    )
}

export default ViaDevice
