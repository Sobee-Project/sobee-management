import axios from "axios"
import { apiClient } from "./api-client"

export class TestService {
    async getTest(signal?: AbortSignal) {
        try {
            const res = await axios.get("https://hub.dummyapis.com/delay?seconds=6", { signal })
            return res.data
        } catch (error) {
            console.log(error)
            return error
        }
    }
}
