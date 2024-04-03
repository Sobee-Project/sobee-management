import { useQuery } from "@tanstack/react-query"
import { Axios, AxiosError, AxiosResponse } from "axios"
import { TestService } from "../test.service"

const useTest = () => {
    const testService = new TestService()
    return useQuery({
        queryKey: ["test"],
        queryFn: ({ signal }) => testService.getTest(signal)
    })
}

export { useTest }
