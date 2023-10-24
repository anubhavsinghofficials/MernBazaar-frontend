

import { create } from 'zustand'

type authStoreType = {
    cartCount    : number;
    setCartCount : (cartCount :number) => void;
}

export const siteDataStore = create<authStoreType>((set,_get) => ({
    cartCount:0,
    setCartCount: (cartCount) => set({ cartCount }),
}))

