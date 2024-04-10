import { QUERY_KEY } from "@/_constants"
import { authApi } from "@/_services/apis"
import { UndefinedInitialDataOptions, UseQueryOptions, useQuery } from "@tanstack/react-query"

export const useGetMeQuery = (props?: Omit<UseQueryOptions, "queryKey">) =>
    useQuery({
        ...props,
        queryKey: [QUERY_KEY.AUTH.GETME],
        queryFn: async () => {
            const response = await authApi.getMe()
            return response.data.data.user
        }
    })
