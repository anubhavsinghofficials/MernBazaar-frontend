import { BsFileImageFill } from "react-icons/bs"


function ProductCardLoading() {

    return (    
    <div className="bg-white aspect-[3/5] rounded-sm rounded-b-md overflow-hidden relative shadow-md cursor-pointer">

        <div className={`w-full h-[70%] bg-slate-400 text-slate-500 xs:h-3/4 flex justify-center items-center text-8xl`}>
                <BsFileImageFill/>
        </div>        

        <div className={`bg-white p-2 text-black w-full xs:h-1/4 h-1/3 absolute top-[70%] xs:top-[75%] flex flex-col pt-3`}>
            
            <div className={`h-1/3 sm:h-2/5 flex flex-col justify-between`}>
                <div className={`h-[40%] bg-slate-400`}/>
                <div className={`h-[40%] bg-slate-400`}/>
            </div>
            
            <div className={`w-full grow flex items-center`}>
                <div className={`w-full h-2/5 sm:h-2/4 flex items-end justify-end gap-x-2 pr-2`}>
                    <div className="h-2/3 w-2/5 bg-slate-400"/>
                    <div className="h-full w-9 bg-slate-400"/>               
                </div>
            </div>
            
        </div>

    </div>

    )
}
 
export default ProductCardLoading






{/* 
<div className={`flex items-baseline gap-x-2 bg-blue-300`}>
<p className="text-sm bg-red-500" style={{ lineHeight: '1' }}>
    40% off
</p> 
*/}
