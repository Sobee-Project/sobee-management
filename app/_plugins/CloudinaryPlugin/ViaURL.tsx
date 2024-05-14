/* eslint-disable @next/next/no-img-element */
"use client"
import { Button, Input } from "@nextui-org/react"
import { useEffect, useState } from "react"

type Props = {
    url: string
    setUrl: (url: string) => void
    isLoading?: boolean
}

const ViaURL = ({ url, setUrl, isLoading = false }: Props) => {
    const [preview, setPreview] = useState<string | null>(null)
    const [imageState, setImageState] = useState<"idle" | "loading" | "error">("idle")

    useEffect(() => {
        setUrl(preview || "")
    }, [preview, setUrl])

    const onSubmit = () => {
        setPreview(url)
    }

    const onReset = () => {
        setPreview(null)
        setImageState("idle")
    }

    const onImageError = () => {
        setImageState("error")
    }

    const hasPreviewError = imageState === "error"

    return (
        <div className='flex flex-col gap-4'>
            <Input
                placeholder='https://example.com/image.jpg'
                label='Image URL'
                autoFocus
                isDisabled={!!preview || isLoading}
                onValueChange={(v) => setUrl(v)}
                type='url'
                value={url}
            />
            {preview && (
                <div className='flex flex-col gap-2'>
                    <p>Preview</p>
                    {hasPreviewError ? (
                        <p className='text-sm text-gray-500'>No preview available</p>
                    ) : (
                        <img
                            src={preview}
                            className='h-auto w-full rounded-lg'
                            alt='Image upload'
                            onError={onImageError}
                        />
                    )}
                </div>
            )}
            <div className='flex items-center gap-2'>
                {!preview ? (
                    <Button
                        color='primary'
                        className='self-start'
                        onPress={onSubmit}
                        isDisabled={url === "" || isLoading}
                    >
                        Preview
                    </Button>
                ) : (
                    <Button
                        variant='flat'
                        className='self-start'
                        type='button'
                        onPress={onReset}
                        isDisabled={isLoading}
                    >
                        Reset
                    </Button>
                )}
            </div>
        </div>
    )
}

export default ViaURL
