import { LOCAL_STORAGE_KEYS } from "@/_constants"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SidebarState {
  isOpen: boolean
}

interface SidebarStore extends SidebarState {
  toggleSidebar: () => void
}

const initialState: Pick<SidebarStore, keyof SidebarState> = {
  isOpen: false
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      toggleSidebar: () => set({ isOpen: !get().isOpen })
    }),
    {
      name: LOCAL_STORAGE_KEYS.SIDEBAR_DEFAULT_OPEN
    }
  )
)
