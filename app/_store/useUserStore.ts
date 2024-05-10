import { create } from "zustand"

interface UserStore {
    isRefetch: boolean
    refetch: () => void
}

export const useUserStore = create<UserStore>((set, get) => ({
    isRefetch: false,
    refetch: () => set({ isRefetch: !get().isRefetch })
}))
