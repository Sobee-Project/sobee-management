import { IUser } from "@/_lib/interfaces"
import { clearCredentialsFromCookie, getCredentialsFromCookie } from "@/_utils/storage"
import { create } from "zustand"

interface AuthState {
    isAuthenticated: boolean
    userInfo: IUser | null
    isAuthenticating: boolean
}

export interface AuthStore extends AuthState {
    setUserInfo: (userInfo: IUser) => void
    // setAuthenticated: (isAuthenticated: boolean) => void
    setAuthenticating: (isAuthenticating: boolean) => void
    reset: () => void
}

const initialState: Pick<AuthStore, keyof AuthState> = {
    isAuthenticated: false,
    isAuthenticating: true,
    userInfo: {
        _id: "",
        email: "",
        phoneNumber: "",
        password: "",
        name: "",
        avatar: "",
        dateOfBirth: "",
        role: ""
    }
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
    ...initialState,
    setUserInfo: (userInfo) => {
        set({ userInfo })
        if (userInfo) {
            set({ isAuthenticated: true, isAuthenticating: false })
        }
    },
    setAuthenticating: (isAuthenticating) => {
        set({ isAuthenticating })
    },
    // setAuthenticated: () => {
    //     const { accessToken, refreshToken, user_id } = getCredentialsFromCookie()

    //     set({ isAuthenticated: !!(accessToken && refreshToken && user_id) })

    //     if (!accessToken || !refreshToken || !user_id) {
    //         clearCredentialsFromCookie()
    //     }
    // },

    reset: () => {
        set(initialState)
    }
}))
