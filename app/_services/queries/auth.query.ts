import { QUERY_KEY } from "@/_constants"
import { authApi } from "@/_services/apis"
import { useQuery } from "@tanstack/react-query"

export const useGetMeQuery = () =>
    useQuery({
        queryKey: [QUERY_KEY.AUTH.GETME],
        queryFn: async () => {
            const response = await authApi.getMe()
            return response.data.data.user
        }
    })
