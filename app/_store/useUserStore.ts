import { IUser } from "@/_lib/interfaces"
import { create } from "zustand"

interface UserStore {
    userInfo: IUser | undefined | null
    setUserInfo: (userInfo: IUser | null) => void
}

export const useUserStore = create<UserStore>((set, get) => ({
    userInfo: undefined,
    setUserInfo: (userInfo: IUser | null) => set({ userInfo })
}))
