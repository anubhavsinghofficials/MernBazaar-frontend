import { modalStore } from "@/Store/ClientStore/store-Modals"
import React, { useEffect, useRef } from "react"

type DeleteReviewModalPropsType = {
    onConfirm : () => void
}

function DeleteReviewModal(props:DeleteReviewModalPropsType) {

    const { onConfirm } = props
    const { showDeleteReviewModal, toggleDeleteReviewModal } = modalStore()
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        setTimeout(() => {
            if (modalRef.current && showDeleteReviewModal) {
                modalRef.current.classList.remove('modalClose')
                modalRef.current.classList.add('modalOpen')
            }
        }, 100);
    },[showDeleteReviewModal])

    const handleConfirm = (e:React.MouseEvent) =>{
        e.stopPropagation()
        if (modalRef.current) {
            modalRef.current.classList.remove('modalOpen')
            modalRef.current.classList.add('modalClose')
        }
        setTimeout(() => {
            toggleDeleteReviewModal()
            onConfirm()
        }, 100);
    }
    const handleCancel = (e:React.MouseEvent) => {
        e.stopPropagation()
        if (modalRef.current) {
            modalRef.current.classList.remove('modalOpen')
            modalRef.current.classList.add('modalClose')
        }
        setTimeout(() => {
            toggleDeleteReviewModal()
        }, 100);
    }

    if (!showDeleteReviewModal) {
        return
    }
     
    return (
        <div className={`fixed w-screen h-screen flex justify-center items-center top-0 left-0 bg-black z-[1000] bg-opacity-70 backdrop-blur-sm duration-1000 modalClose`}
        ref={modalRef}
        onClick={handleCancel}
        >
            <div className={`max-w-[80%] sm:max-w-[30rem] rounded-lg p-6 pb-4 flex flex-col gap-y-2 bg-slate-50 relative`}
                 onClick={(e)=> e.stopPropagation()}
            >
                <p className="leading-6 xs:text-2xl xs:leading-7 text-slate-800 font-semibold font-Roboto">
                    Confirm to delete your review
                </p>
                <p className="text-slate-600 xs:font-semibold leading-[1.15rem] xs:leading-5 pr-4 max-h-80 overflow-y-auto py-1 text-sm xs:text-base">
                    Your review will be permanently deleted for this product. You can review it again after that
                </p>
                <div className={`self-end flex items-end gap-x-4`}>
                    <button
                        className="px-3 py-2 font-semibold hover:bg-slate-200 active:bg-slate-300 duration-100 text-sm xs:text-base"
                        onClick={handleCancel}>
                        cancel
                    </button>
                    <button
                        className="px-3 py-2 font-semibold hover:bg-red-100 active:bg-red-200 duration-100 text-red-700 text-sm xs:text-base"
                        onClick={handleConfirm}>
                        confirm
                    </button>
                </div>
           </div>
        </div>
    )
}
 
export default DeleteReviewModal