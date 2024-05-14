import { ClassValue } from "clsx"

export type AssetType = "image" | "video" | "audio" | "raw"

export type CloudinaryPluginProps = {
    className?: ClassValue
    onUploadError?: (error: Error) => void
    onUploadSuccess?: (response: any) => void
    visible?: boolean
    onClose?: () => void
    assetTypes?: AssetType[] | "*"
}
