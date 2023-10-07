import React, { useEffect, useRef } from "react"
import { ImCross } from 'react-icons/im'

type dialogueBoxPropsType = {
    title?             : string
    message?           : string
    onConfirm?         : () => void
    showDialogue       : boolean
    toggleShowDialogue : () => void
}

function DialogueBox(props:dialogueBoxPropsType) {

    const { title, message, onConfirm, showDialogue, toggleShowDialogue } = props
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        setTimeout(() => {
            if (modalRef.current && showDialogue) {
                modalRef.current.classList.remove('modalClose')
                modalRef.current.classList.add('modalOpen')
            }
        }, 100);
    },[showDialogue])

    const handleConfirm = (e:React.MouseEvent) =>{
        e.stopPropagation()
        if (modalRef.current) {
            modalRef.current.classList.remove('modalOpen')
            modalRef.current.classList.add('modalClose')
        }
        setTimeout(() => {
            toggleShowDialogue()
            if (onConfirm) {
                onConfirm()
            }
        }, 100);
    }
    const handleCancel = (e:React.MouseEvent) => {
        e.stopPropagation()
        if (modalRef.current) {
            modalRef.current.classList.remove('modalOpen')
            modalRef.current.classList.add('modalClose')
        }
        setTimeout(() => {
            toggleShowDialogue()
        }, 100);
    }

    if (!showDialogue) {
        return
    }
     
    return (
        <div className={`fixed w-screen h-screen flex justify-center items-center top-0 left-0 bg-black z-[1000] bg-opacity-90 backdrop-blur-sm duration-1000 modalClose`}
        ref={modalRef}
        onClick={handleCancel}
        >
           <div className={`max-w-[30rem] rounded-lg p-6 ${onConfirm && 'pb-4'} flex flex-col gap-y-2 bg-slate-50 relative`}
           onClick={(e)=> e.stopPropagation()}>
              <p className="text-2xl text-slate-800 font-semibold leading-7 font-Roboto">
                {title}
              </p>
              <p className="text-slate-600 font-semibold leading-5 pr-4 max-h-80 overflow-y-auto py-1">
                {message}
              </p>
              {
                onConfirm
                ?
                <div className={`self-end flex items-end gap-x-4`}>
                    <button
                        className="px-3 py-2 font-semibold hover:bg-slate-200 active:bg-slate-300 duration-100"
                        onClick={handleCancel}>
                        cancel
                    </button>
                    <button
                        className="px-3 py-2 font-semibold hover:bg-red-100 active:bg-red-200 duration-100 text-red-700"
                        onClick={handleConfirm}>
                        confirm
                    </button>
                </div>
                :
                <button className="font-semibold bg-slate-50 hover:bg-slate-200 active:bg-slate-300 duration-100 absolute -right-2 -top-2 rounded-full p-[0.3rem] text-xs"
                onClick={handleCancel}>
                    <ImCross/>
                </button>
              }
           </div>
        </div>
    )
}
 
export default DialogueBox