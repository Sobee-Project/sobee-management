import { apiClient } from "."

export class TestService {
    getTest() {
        return apiClient.get("/products/1")
    }
}
