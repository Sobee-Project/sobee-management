import { useQuery } from "@tanstack/react-query"
import { roleApi } from "../apis"

export const useGetRoleListQuery = () => {
    return useQuery({
        queryKey: ["roleList"],
        queryFn: async () => {
            const res = await roleApi.getAll()
            return res.data.data
        },
        retry: 0
    })
}
