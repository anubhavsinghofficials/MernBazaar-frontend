import { modalStore } from "@/Store/ClientStore/store-Modals"
import { Rating } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import { ImCross } from 'react-icons/im'
import { reviewType } from "../../page-ProductDetails"


type EditReviewModalPropsType = {
    onConfirm       : (review:reviewType) => void
}
type formSubmitType = React.FormEvent<HTMLFormElement>
type textAreaType = React.ChangeEvent<HTMLTextAreaElement>


function EditReviewModal(props:EditReviewModalPropsType) {

    const { onConfirm } = props
    const { showEditReviewModal, toggleShowEditReviewModal, reviewer } = modalStore()

    const [ rating, setRating ] = useState<number|null>()
    const [ message, setMessage ] = useState<string>('')
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        setMessage(reviewer.comment)
        setRating(reviewer.rating)
        setTimeout(() => {
            if (modalRef.current && showEditReviewModal) {
                modalRef.current.classList.remove('modalClose')
                modalRef.current.classList.add('modalOpen')
            }
        }, 100);
    },[showEditReviewModal])

    const handleCancel = (e:React.MouseEvent) => {
        e.stopPropagation()
        if (modalRef.current) {
            modalRef.current.classList.remove('modalOpen')
            modalRef.current.classList.add('modalClose')
        }
        setTimeout(() => {
            toggleShowEditReviewModal()
        }, 100);
    }

    const handleMessage = (e:textAreaType) => {
        if (message.length < 500) {
            setMessage(e.target.value)
        }
    }

    const handleSubmit = (e:formSubmitType) => {
        e.stopPropagation()
        e.preventDefault()

        if (!rating || message.length === 0) {
            return
        }

        if (modalRef.current) {
            modalRef.current.classList.remove('modalOpen')
            modalRef.current.classList.add('modalClose')
        }
        setTimeout(() => {
            toggleShowEditReviewModal()
            if (onConfirm) {
                onConfirm({userRating:rating, userComment:message})
            }
        }, 100);
    }
     
    if (!showEditReviewModal) {
        return
    }
     
    return (
        <div className={`fixed w-screen h-screen flex justify-center items-center top-0 left-0 bg-black z-[1000] bg-opacity-70 backdrop-blur-sm duration-1000 modalClose`}
        ref={modalRef}
        onClick={handleCancel}
        >
           <div className={`w-[80%] max-w-[24rem] h-96 rounded-lg p-6 pb-4 flex flex-col gap-y-2 bg-slate-50 relative`}
           onClick={(e)=> e.stopPropagation()}>
            <button className="font-semibold bg-slate-50 hover:bg-slate-200 active:bg-slate-300 duration-100 absolute -right-2 -top-2 rounded-full p-[0.3rem] text-xs flex flex-col"
            onClick={handleCancel}>
                <ImCross/>
            </button>
            <form
                onSubmit={handleSubmit}
                className="grow flex flex-col gap-y-4">
              <label className="text-xl xs:text-2xl text-slate-800 font-semibold leading-7  flex flex-col gap-y-1">
                Ratings
              <Rating
                onChange={(_e, newValue) => setRating(newValue)}
                value={rating}
                precision={0.5}
                size="large"
                />
              </label>
              <label className="text-xl xs:text-2xl text-slate-800 font-semibold leading-7  flex flex-col gap-y-1 h-full grow">
                Review
              <textarea className={`w-full h-full leading-5 outline-none p-3 resize-none text-slate-800 formScrollbar rounded-lg bg-slate-200 ring-2 ring-transparent focus-within:ring-slate-300 text-base font-normal`}
              spellCheck={false}
              value={message}
              onChange={handleMessage}
              placeholder="Write your review here"
              autoFocus
              />
              </label>
              <button className="self-end py-1 px-4 bg-green-600 text-white hover:bg-green-500 active:bg-green-700 hover:shadow-md rounded-md duration-100">
                Submit Review
              </button>
            </form>
           </div>
        </div>
    )
}
 
export default EditReviewModal