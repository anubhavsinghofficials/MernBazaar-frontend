

import { create } from 'zustand'

export type AuthRoleType = "public" | "user" | "seller" | "admin";
type storeType = {
    role : AuthRoleType;
    setRole: (toThisRole :AuthRoleType) => void;
}


const UserRoleStore = create<storeType>((set,_get) => ({
    role:"public",
    setRole: (toThisRole) => set(() => {
        return { role:toThisRole }
    }),
}))


export default UserRoleStore


