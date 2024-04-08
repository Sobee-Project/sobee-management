import { useMutation } from "@tanstack/react-query"
import { authApi } from "../apis"

export const useLogoutMutation = () => {
    return useMutation({
        mutationKey: ["logout"],
        mutationFn: authApi.logout
    })
}
