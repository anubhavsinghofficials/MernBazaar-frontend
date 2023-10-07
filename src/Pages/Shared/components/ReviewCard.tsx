
import { reviewModalMessage, reviewModalTitle } from '@/Store/ClientStore/store-Constants'
import { MdEdit } from 'react-icons/md'
import { AiFillDelete, AiOutlinePlus } from 'react-icons/ai'
import { modalStore } from '@/Store/ClientStore/store-Modals'
import DialogueBox from "./DialogueBox"
import DialogueEditReview from './DialogueEditReview'

type ReviewCardPropsType = {
    name?              : string
    overallRating?     : number
    message?           : string
    currentUserReview? : boolean
    productId?         : string
}
export type reviewType = {
    userRating  : number
    userComment : string
}

function ReviewCard(props:ReviewCardPropsType) {
    
    const { name, overallRating, message, currentUserReview, productId } = props
    const { toggleDeleteReviewAlert, toggleShowReviewModal,
            showDeleteReviewAlert, showReviewModal, toggleShowEditReview } = modalStore()
    
    const deleteReview = () => {
        
    }
    const submitReview = (review:reviewType) => {
        console.log(review)
        
    }
    const handleDeleteReview = (e:React.MouseEvent) => {
        e.stopPropagation()
        toggleDeleteReviewAlert()
    }
    const handleEditReview = (e:React.MouseEvent) => {
        e.stopPropagation()
        toggleShowEditReview()
    }

     
    if (!name || !message || !overallRating || !productId) {
        return (
            <div className={`rounded-xl bg-slate-100 hover:bg-slate-200 duration-100 flex justify-center items-center gap-x-2 p-4 cursor-pointer border-dashed border-slate-400 border-2`}
            onClick={handleEditReview}>
                <AiOutlinePlus/>
                <p>Write your Review</p>
                <DialogueEditReview
                    onConfirm={submitReview}
                    />
            </div>
        )
    }
     

    return (
        <div className={`rounded-xl bg-slate-100 hover:bg-slate-200 duration-100 flex flex-col gap-y-2 p-4 cursor-pointer`}
        onClick={()=>toggleShowReviewModal()}>
           <div className={`flex items-center justify-between relative`}>

                <div className={`flex items-center whitespace-nowrap gap-x-4 w-3/4`}>
                    <p className={`${ +overallRating >= 4 ? 'bg-green-600' : +overallRating >= 3 ? 'bg-yellow-600 ' :'bg-red-600'} text-white px-3 rounded-md font-semibold`}>
                        ★ {overallRating}
                    </p>
                    <p className="font-semibold text-lg text-ellipsis overflow-hidden grow ">
                        {name}
                    </p>
                </div>

            {
                currentUserReview &&
                <>
                    <div className={`flex gap-x-1`}>
                        <MdEdit
                            className='p-1 rounded-md text-2xl hover:bg-slate-200 active:bg-slate-300 text-slate-600'
                            onClick={handleEditReview}/>
                        <AiFillDelete
                            className='p-1 rounded-md text-2xl hover:bg-slate-200 active:bg-slate-300 text-slate-600'
                            onClick={handleDeleteReview}/>
                    </div>
                    <DialogueBox
                    onConfirm={deleteReview}
                    title={reviewModalTitle}
                    message={reviewModalMessage}
                    showDialogue={showDeleteReviewAlert}
                    toggleShowDialogue={toggleDeleteReviewAlert}
                    />
                    <DialogueEditReview
                    onConfirm={submitReview}
                    defaultMessage={message}
                    defaultRating={overallRating}
                    />
                </>
            }
                <DialogueBox
                title={name}
                message={message}
                showDialogue={showReviewModal}
                toggleShowDialogue={toggleShowReviewModal}
                />
           </div>
           <p className="leading-[1.15rem] line-clamp-3">
            {message}
           </p>
        </div>
    )
}
 
export default ReviewCard