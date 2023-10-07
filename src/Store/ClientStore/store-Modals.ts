

import { create } from 'zustand'

type modalStoreType = {
    showDeleteReviewAlert:boolean
    toggleDeleteReviewAlert: () => void
    showReviewModal:boolean
    toggleShowReviewModal: () => void
    showEditReview:boolean
    toggleShowEditReview: () => void
}

export const modalStore = create<modalStoreType>((set,_get) => ({
    showDeleteReviewAlert:false,
    toggleDeleteReviewAlert: () => set((state)=> (
        { showDeleteReviewAlert:!state.showDeleteReviewAlert }
    )),
    showReviewModal:false,
    toggleShowReviewModal: () => set((state)=> (
        { showReviewModal:!state.showReviewModal }
    )),
    showEditReview:false,
    toggleShowEditReview: () => set((state)=> (
        { showEditReview:!state.showEditReview }
    )),
}))

