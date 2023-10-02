

import { create } from 'zustand'

export type AuthRoleType = "public" | "user" | "seller" | "admin";
type authStoreType = {
    role : AuthRoleType;
    setRole: (newRole :AuthRoleType) => void;
}

export const userRoleStore = create<authStoreType>((set,_get) => ({
    role:"public",
    setRole: (newRole) => set({ role:newRole }),
}))

