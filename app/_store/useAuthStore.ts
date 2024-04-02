import { LOCAL_STORAGE_KEYS } from "@/_constants"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
    isAuthenticated: boolean
    accessToken: string
    refreshToken: string
}

export interface AuthStore extends AuthState {
    setAuth: (auth: { accessToken: string; refreshToken: string }) => void
    setIsAuthenticated: (args: AuthState["isAuthenticated"]) => void
    logout: () => void
}

const initialState: Pick<AuthStore, keyof AuthState> = {
    isAuthenticated: false,
    accessToken: "",
    refreshToken: ""
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            ...initialState,
            setAuth: ({ accessToken, refreshToken }) => set({ accessToken, refreshToken }),
            setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
            logout: () => set(initialState)
        }),
        {
            name: LOCAL_STORAGE_KEYS.AUTH_STATE
        }
    )
)
