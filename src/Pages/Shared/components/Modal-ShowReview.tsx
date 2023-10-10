import { modalStore } from "@/Store/ClientStore/store-Modals"
import React, { useEffect, useRef } from "react"
import { ImCross } from 'react-icons/im'


function ShowReviewModal() {

    const { reviewer:{ name, rating, message },showReviewModal,
            toggleShowReviewModal } = modalStore()
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        setTimeout(() => {
            if (modalRef.current && showReviewModal) {
                modalRef.current.classList.remove('modalClose')
                modalRef.current.classList.add('modalOpen')
            }
        }, 100);
    },[showReviewModal])

    const handleCancel = (e:React.MouseEvent) => {
        e.stopPropagation()
        if (modalRef.current) {
            modalRef.current.classList.remove('modalOpen')
            modalRef.current.classList.add('modalClose')
        }
        setTimeout(() => {
            toggleShowReviewModal()
        }, 100);
    }

    if (!showReviewModal) {
        return
    }
     
    return (
        <div className={`fixed w-screen h-screen flex justify-center items-center top-0 left-0 bg-black z-[1000] bg-opacity-70 backdrop-blur-sm duration-1000 modalClose`}
        ref={modalRef}
        onClick={handleCancel}
        >
            <div className={`max-w-[80%] sm:max-w-[30rem] rounded-lg p-6 flex flex-col gap-y-2 bg-slate-50 relative`}
                 onClick={(e)=> e.stopPropagation()}
            >
                <div className={`flex items-start gap-x-4`}>
                    <p className={`${ +rating >= 4 ? 'bg-green-600' : +rating >= 3 ? 'bg-yellow-600 ' :'bg-red-600'} text-white px-3 rounded-md font-semibold whitespace-nowrap`}>
                        ★ {rating}
                    </p>
                    <p className="text-lg xs:text-2xl text-slate-800 font-semibold leading-7 font-Roboto break-all">
                        {name}
                    </p>
                </div>
                <p className="text-slate-600 font-semibold leading-5 pr-4 max-h-80 overflow-y-auto py-1">
                    {message}
                </p>
                <button className="font-semibold bg-slate-50 hover:bg-slate-200 active:bg-slate-300 duration-100 absolute -right-2 -top-2 rounded-full p-[0.3rem] text-xs"
                onClick={handleCancel}>
                    <ImCross/>
                </button>
            </div>
        </div>
    )
}
 
export default ShowReviewModal