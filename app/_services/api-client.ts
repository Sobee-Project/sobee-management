import { ENV_CONFIG } from "@/_constants"
import axios from "axios"

const apiClient = axios.create({
    baseURL: ENV_CONFIG.BASE_API_URL,
    withCredentials: true,
    timeout: 60000 // 60 seconds
})

export { apiClient }
