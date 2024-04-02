import { ENV_CONFIG } from "@/_constants"
import axios from "axios"

const apiClient = axios.create({
    baseURL: ENV_CONFIG.BASE_API_URL,
    responseType: "json",
    withCredentials: true
})

export { apiClient }
