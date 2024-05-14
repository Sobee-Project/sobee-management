import { ClassValue } from "clsx"

export type AssetType = "image" | "video" | "audio" | "raw" | "*"

export type CloudinaryPluginProps = {
    className?: ClassValue
    onUploadError?: () => void
    onUploadSuccess?: (response: { urls: string[] }) => void
    visible?: boolean
    onClose?: () => void
    assetType?: AssetType
}
