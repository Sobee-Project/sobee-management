import { IRole } from "@/_lib/interfaces"
import { create } from "zustand"

interface RoleStore {
    roleList: IRole[]
    setRoleList: (roleList: IRole[]) => void
    addRole: (role: IRole) => Promise<void>
    updateRole: (role: IRole) => Promise<void>
    deleteRole: (roleId: string) => Promise<void>
}

export const useRoleStore = create<RoleStore>((set, get) => ({
    roleList: [],
    setRoleList: (roleList: IRole[]) => set({ roleList }),
    addRole: async (role: IRole) => {
        const newRoleList = [...get().roleList, role]
        set({ roleList: newRoleList })
    },
    updateRole: async (role: IRole) => {
        const newRoleList = get().roleList.map((r) => (r.role_name === role.role_name ? role : r))
        set({ roleList: newRoleList })
    },
    deleteRole: async (roleId: string) => {
        const newRoleList = get().roleList.filter((r) => r._id !== roleId)
        set({ roleList: newRoleList })
    }
}))
