import { modalStore } from "@/Store/ClientStore/store-Modals"
import React, { useEffect, useState } from "react"


function GenericConfirmModal() {

    const { showGenericConfirmModal, toggleGenericConfirmModal,
            genericTitle, genericSubtitle, genericFunction,
            resetGenericConfirmModal } = modalStore()
    const [fadeOut, setFadeOut] = useState(true)

console.log({genericTitle, genericSubtitle, genericFunction, showGenericConfirmModal})

    useEffect(()=>{
        if (showGenericConfirmModal) {
            setFadeOut(false)
        } else {
            setFadeOut(true)
        }
    },[showGenericConfirmModal])

    const handleConfirm = (e:React.MouseEvent) =>{
        e.stopPropagation()
        setFadeOut(true)
        setTimeout(() => {
            toggleGenericConfirmModal()
            genericFunction()
        }, 100);
        setTimeout(() => {
            resetGenericConfirmModal()
        }, 200);
    }
    const handleCancel = (e:React.MouseEvent) => {
        e.stopPropagation()
        setFadeOut(true)
        setTimeout(() => {
            toggleGenericConfirmModal()
        }, 100);
        setTimeout(() => {
            resetGenericConfirmModal()
        }, 200);
    }

    if (!showGenericConfirmModal) {
        return
    }
     
    return (
        <div className={`fixed w-screen h-screen flex justify-center items-center top-0 left-0 bg-black z-[1000] bg-opacity-70 backdrop-blur-sm duration-[80ms] ${fadeOut?'opacity-0':'opacity-100'} transition-opacity`}
        onClick={handleCancel}
        >
            <div className={`max-w-[80%] sm:max-w-[30rem] rounded-lg p-6 pb-4 flex flex-col ${genericSubtitle&&'gap-y-2'} bg-slate-50 relative`}
                 onClick={(e)=> e.stopPropagation()}
            >
                <p className={`leading-6 ${genericSubtitle?'xs:text-2xl':'xs:text-xl'} xs:leading-7 text-slate-800 font-semibold font-Roboto`}>
                    {genericTitle}
                </p>
                <p className="text-slate-600 xs:font-semibold leading-[1.15rem] xs:leading-5 pr-4 max-h-80 overflow-y-auto py-1 text-sm xs:text-base -translate-y-2 xs:-translate-y-1">
                    {genericSubtitle}
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
 
export default GenericConfirmModal