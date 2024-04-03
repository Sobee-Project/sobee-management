import { QUERY_KEY } from "@/_constants"
import { useQuery } from "@tanstack/react-query"
import authApi from "../apis/auth.service"

export const useGetMeQuery = () =>
    useQuery({
        queryKey: [QUERY_KEY.AUTH.GETME],
        queryFn: async () => {
            const response = await authApi.getMe()
            return response.data.data.user
        }
    })
