import { BsFileImageFill } from "react-icons/bs"




function ProductCardHomeLoading() {


    return (    
    <div className="flex-none bg-white h-60 xs:h-64 aspect-[7/11] rounded-sm rounded-b-md overflow-hidden relative cursor-pointer flex flex-col justify-start group">

        
        <div className={`w-full h-[73%] bg-white text-slate-300 xs:h-3/4 flex justify-center items-center text-8xl animate-pulse`}>
                <BsFileImageFill/>
        </div>        

        <div className={`px-2  text-black w-full absolute flex flex-col justify-center bottom-0 h-[27%] animate-pulse`}>
            
            <div className={`h-2/3 sm:h-3/5 flex flex-col justify-center`}>
                <div className={`h-[30%] mb-1 sm:mb-1 bg-slate-300`}/>
                <div className={`h-[30%] bg-slate-300`}/>
            </div>
            
            <div className={`grow w-full flex items-end justify-end pb-1 pr-4 `}>
                <div className="bg-slate-300 w-10 h-4"/>
            </div>
        </div>
    </div>

    )
}
 
export default ProductCardHomeLoading

