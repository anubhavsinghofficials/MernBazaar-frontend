

import { create } from 'zustand'
import { defaultValues } from './store-Constants'

export type searchObjectType = {
    category    : string   | null
    ratings     : string   | null
    discount    : string   | null
    sort        : string   | null
    price       : number[] | null
    keyword     : string   | null
    pageNo      : number
    pageLength  : number
}

type filterStoreType = {
    searchObject        : searchObjectType
    setSearchObject     : (newSearchObject:searchObjectType) => void
    resetBadgeToken     : boolean
    setResetBadgeToken  : () => void
}


export const filterStore = create<filterStoreType>((set,_get) => ({
    
    searchObject    : defaultValues,
    setSearchObject : (newSearchObject) => (
        set(() => ({ searchObject:newSearchObject }))
    ),

    resetBadgeToken     : false,
    setResetBadgeToken  : () => (
        set((state) => ({ resetBadgeToken:!state.resetBadgeToken }))
    )
}))