import { BsFileImageFill } from "react-icons/bs"


function FeatureProductCardLoading() {
    return (    
    <div className="bg-white text-slate-300 aspect-square rounded-md flex justify-center items-center text-7xl shadow-md">
        <span className="animate-pulse">
            <BsFileImageFill/>
        </span>
    </div>
    )
}
 
export default FeatureProductCardLoading