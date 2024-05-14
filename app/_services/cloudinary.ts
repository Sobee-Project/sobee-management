import { ENV_CONFIG } from "@/_constants"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    secure: true,
    cloud_name: ENV_CONFIG.CLOUDINARY_CLOUD_NAME,
    api_key: ENV_CONFIG.CLOUDINARY_API_KEY,
    api_secret: ENV_CONFIG.CLOUDINARY_API_SECRET
})

export default cloudinary

// console.log("Cloudinary Plugin Loaded", cloudinary.config())
