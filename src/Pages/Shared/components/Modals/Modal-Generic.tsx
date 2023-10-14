import { modalStore } from "@/Store/ClientStore/store-Modals"
import React, { useEffect, useRef } from "react"



function GenericModal() {

    const { showGenericModal, toggleGenericModal, genericMessage } = modalStore()
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        setTimeout(() => {
            if (modalRef.current && showGenericModal) {
                modalRef.current.classList.remove('modalClose')
                modalRef.current.classList.add('modalOpen')
            }
        }, 100);
    },[showGenericModal])

    const handleConfirm = (e:React.MouseEvent) =>{
        e.stopPropagation()
        if (modalRef.current) {
            modalRef.current.classList.remove('modalOpen')
            modalRef.current.classList.add('modalClose')
        }
        setTimeout(() => {
            toggleGenericModal()
        }, 100);
    }
    const handleCancel = (e:React.MouseEvent) => {
        e.stopPropagation()
        if (modalRef.current) {
            modalRef.current.classList.remove('modalOpen')
            modalRef.current.classList.add('modalClose')
        }
        setTimeout(() => {
            toggleGenericModal()
        }, 100);
    }

    if (!showGenericModal) {
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
                <p className="text-slate-600 xs:font-semibold leading-[1.15rem] xs:leading-5 pr-4 max-h-80 overflow-y-auto py-1 sm:text-lg">
                    {genericMessage}
                </p>
                <div className={`self-end flex items-end gap-x-4`}>
                    <button
                        className="px-3 py-2 font-semibold hover:bg-green-100 active:bg-green-200 duration-100 text-green-700"
                        onClick={handleConfirm}>
                        ok
                    </button>
                </div>
           </div>
        </div>
    )
}
 
export default GenericModal