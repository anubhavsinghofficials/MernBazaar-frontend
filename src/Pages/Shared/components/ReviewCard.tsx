
import { MdEdit } from 'react-icons/md'
import { AiFillDelete, AiOutlinePlus } from 'react-icons/ai'
import { modalStore } from '@/Store/ClientStore/store-Modals'

type ReviewCardPropsType = {
    name               : string
    rating             : number
    comment            : string
    currentUserReview? : boolean
    productId?         : string
}

function ReviewCard(props:ReviewCardPropsType) {
    
    const { name, rating, comment, currentUserReview, productId } = props
    const { toggleDeleteReviewModal, toggleShowReviewModal,
            toggleShowEditReviewModal, setReviewer }
            = modalStore()

    const handleDeleteReview = (e:React.MouseEvent) => {
        e.stopPropagation()
        toggleDeleteReviewModal()
    }
    const handleEditReview = (e:React.MouseEvent) => {
        e.stopPropagation()
        if (name && rating && comment) {
            setReviewer({name,rating,comment})
        } else {
            setReviewer({name:'',rating:0,comment:''})
        }
        toggleShowEditReviewModal()
    }
    const openReviewFullCard = (e:React.MouseEvent) => {
        e.stopPropagation()
        setReviewer({name,rating,comment})
        toggleShowReviewModal()
    }
     
    
    if (!name || !comment || !rating || !productId) {
        return (
            <div className={`rounded-xl bg-slate-100 hover:bg-slate-200 duration-100 flex justify-center items-center gap-x-2 p-4 cursor-pointer border-dashed border-slate-400 border-2`}
            onClick={handleEditReview}>
                <AiOutlinePlus/>
                <p>Write your Review</p>
            </div>
        )
    }
     

    return (
        <div className={`rounded-xl bg-slate-100 hover:bg-slate-200 duration-100 flex flex-col gap-y-2 p-4 cursor-pointer shadow-md`}
        onClick={openReviewFullCard}>
           <div className={`flex items-center justify-between relative`}
           >
                <div className={`flex items-center whitespace-nowrap gap-x-4 w-3/4`}>
                    <p className={`${ +rating >= 4 ? 'bg-green-600' : +rating >= 3 ? 'bg-yellow-600 ' :'bg-red-600'} text-white px-3 rounded-md font-semibold`}>
                        ★ {rating}
                    </p>
                    <p className="font-semibold text-lg text-ellipsis overflow-hidden grow ">
                        {`${currentUserReview? 'You' :name}`}
                    </p>
                </div>

            {
                currentUserReview &&
                <div className={`flex gap-x-1`}>
                    <MdEdit
                        className='p-1 rounded-md text-2xl hover:bg-slate-200 active:bg-slate-300 text-slate-600'
                        onClick={handleEditReview}/>
                    <AiFillDelete
                        className='p-1 rounded-md text-2xl hover:bg-slate-200 active:bg-slate-300 text-slate-600'
                        onClick={handleDeleteReview}/>
                </div>
            }
           </div>
           <p className="leading-[1.15rem] line-clamp-3">
            {comment}
           </p>
        </div>
    )
}
 
export default ReviewCard