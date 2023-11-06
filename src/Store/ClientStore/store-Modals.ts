

import { create } from 'zustand'


type reviewerType = {
     name: string
     rating: number
     comment: string
}


type modalStoreType = {

    showIntroModal       : boolean
    toggleShowIntroModal : () => void

    reviewer              : reviewerType
    setReviewer           : (reviewer:reviewerType) => void
    showReviewModal       : boolean
    toggleShowReviewModal : () => void

    showDeleteReviewModal   : boolean
    toggleDeleteReviewModal : () => void

    showEditReviewModal       : boolean
    toggleShowEditReviewModal : () => void

    genericMessage     : string
    setGenericMessage  : (genericMessage:string) => void
    showGenericModal   : boolean
    toggleGenericModal : () => void

    genericTitle              : string | null
    setGenericTitle           : (genericTitle:string) => void
    genericSubtitle           : string | null
    setGenericSubtitle        : (genericSubtitle:string) => void
    genericFunction           : (...arg:any[]) => any
    setGenericFunction        : (genericFunction:(...arg:any[])=>any) => void
    showGenericConfirmModal   : boolean
    toggleGenericConfirmModal : () => void
    resetGenericConfirmModal  : () => void
    
    genericToastMessage     : string
    setGenericToastMessage  : (genericMessage:string) => void
    genericToastType        : 'success' | 'error' | 'warning'
    setGenericToastType     : (genericToastType:'success' | 'error' | 'warning') => void
    showGenericToast        : boolean
    toggleGenericToast      : (bool:boolean) => void
}





export const modalStore = create<modalStoreType>((set,_get) => ({

    showIntroModal : false,
    toggleShowIntroModal : () => set(state => (
        { showIntroModal : !state.showIntroModal } 
    )),

    reviewer : {name:'', rating:0, comment:''},
    setReviewer: (reviewer) => set(()=> ({reviewer})),
    showReviewModal:false,
    toggleShowReviewModal: () => set((state)=> (
        { showReviewModal:!state.showReviewModal }
    )),

    showDeleteReviewModal:false,
    toggleDeleteReviewModal: () => set((state)=> (
        { showDeleteReviewModal:!state.showDeleteReviewModal }
    )),

    showEditReviewModal:false,
    toggleShowEditReviewModal: () => set((state)=> (
        { showEditReviewModal:!state.showEditReviewModal }
    )),

    genericMessage:'',
    setGenericMessage: (genericMessage) => set(()=>({genericMessage})),
    showGenericModal:false,
    toggleGenericModal: () => set((state) => (
        { showGenericModal:!state.showGenericModal }
    )),
    
    genericTitle : '',
    setGenericTitle : (genericTitle) => set(()=>({genericTitle})),
    genericSubtitle : '',
    setGenericSubtitle : (genericSubtitle) => set(()=>({genericSubtitle})),
    genericFunction : () => {},
    setGenericFunction : (genericFunction) => set(()=>({genericFunction})),
    showGenericConfirmModal : false,
    toggleGenericConfirmModal : () => set((state) => (
        { showGenericConfirmModal:!state.showGenericConfirmModal }
    )),
    resetGenericConfirmModal: () => set(()=>({
        genericTitle: null,
        genericSubtitle: null,
        genericFunction: () => {}
    })),
    
    genericToastMessage:'',
    setGenericToastMessage: (genericToastMessage) => set(()=>({genericToastMessage})),
    genericToastType:'success',
    setGenericToastType: (genericToastType) => set(()=>({genericToastType})),
    showGenericToast:false,
    toggleGenericToast: (bool) => set(() => ({ showGenericToast:bool })),
}))

