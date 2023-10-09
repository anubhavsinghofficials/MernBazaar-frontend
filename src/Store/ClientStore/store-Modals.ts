

import { create } from 'zustand'



type reviewerType = {
     name: string
     rating: number
     message: string
}

type modalStoreType = {
    reviewer                : reviewerType
    setReviewer             : (reviewer:reviewerType) => void

    showReviewModal         : boolean
    toggleShowReviewModal   : () => void

    showDeleteReviewModal   : boolean
    toggleDeleteReviewModal : () => void

    showEditReviewModal       : boolean
    toggleShowEditReviewModal : () => void
}





export const modalStore = create<modalStoreType>((set,_get) => ({
    reviewer : {name:'', rating:0, message:''},
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
}))

