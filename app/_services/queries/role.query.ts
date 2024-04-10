import { QUERY_KEY } from "@/_constants"
import { useQuery } from "@tanstack/react-query"
import { roleApi } from "../apis"

export const useGetRoleListQuery = () => {
    return useQuery({
        queryKey: [QUERY_KEY.ROLE.GET_ROLE_LIST],
        queryFn: async () => {
            const res = await roleApi.getAll()
            return res.data.data
        },
        retry: 0
    })
}
