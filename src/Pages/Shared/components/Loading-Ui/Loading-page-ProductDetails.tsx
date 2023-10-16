
import { BsFileImageFill } from "react-icons/bs"

function ProductDetailsPageLoading() {


    return (
            <div className={`flex flex-col md:flex-row items-start pt-4 sm:p-4 lg:p-10 bg-white rounded-md`}
            >
               <div className={` w-full md:w-2/5 xl:w-[45%] aspect-square bg md:sticky top-20 flex-none flex justify-center items-center gap-x-2 p-2 xs:p-0 bg-slate-100 mx-auto`}>
                    <BsFileImageFill className='text-8xl text-slate-300 animate-pulse'/>
               </div>
               
               <div className={`py-2 px-2 mt-2 mb-8 self-stretch flex justify-center gap-x-2 md:hidden rounded-md`}>
                    {
                        Array.from({length:6}).map((_,i) => (
                            <div
                            key={i}
                            className="h-12 xl:h-14 aspect-square bg-slate-300 rounded-sm animate-pulse"/>
                            ))
                    }
                </div>

               
               <div className={`grow px-4 flex flex-col gap-y-10 pb-4 self-stretch`}
               >
                    <div className={`flex flex-col gap-y-3`}>
                        <div className={`flex flex-col gap-y-2`}>
                            <div className="h-6 bg-gray-300 animate-pulse"/>
                            <div className="h-6 bg-gray-300 animate-pulse"/>
                            <div className="h-6 bg-gray-300 animate-pulse"/>
                        </div>
                        <div className="flex gap-x-4 justify-center sm:justify-start pt-8 min-w-0 sm:w-[22rem] lg:w-[22rem] xl:w-[25rem]">
                            <div className="h-12 sm:h-11 w-[46%] bg-gray-300 rounded-md animate-pulse"/>
                            <div className="h-12 sm:h-11 w-[54%] bg-gray-300 rounded-md animate-pulse"/>
                        </div>
                    </div>

                    <div className={`h-24 bg-slate-300 animate-pulse`}/>

                    
                    <div className={`flex gap-x-4`}>
                        <div className="h-8 w-[5.5rem] bg-gray-300 rounded-md animate-pulse"/>
                        <div className="h-8 w-20 bg-gray-300 rounded-md animate-pulse"/>
                    </div>

                    <div className={`hidden md:block`}>
                        <p className="text-lg xl:text-xl pb-1 font-semibold">
                            Photos
                        </p>
                        <div className="flex gap-x-4">
                        {
                            Array.from({length:6}).map((_,i) => (
                                <div
                                key={i}
                                className="h-12 xl:h-14 aspect-square bg-slate-300 rounded-sm animate-pulse"/>
                                ))
                        }
                        </div>
                    </div>

                    

                    <div className={``}>
                        <p className="text-lg xl:text-xl pb-1 font-semibold">
                            Discription
                        </p>
                    {
                        Array.from({length:3}).map((_,i)=> (
                            <div
                            className={`flex flex-col gap-y-2 pb-6`}
                            id={`${i}`}
                            key={i}>
                            { Array.from({length:4}).map((_,i) => (
                                <div className="h-4 bg-gray-300 animate-pulse" key={i}/>
                                )) }
                            </div>
                        ))
                    }
                    </div>
                    
                    <div className={`text-xl font-semibold`}>
                        Seller
                        <div className={`h-40 md:h-44 xl:h-52 bg-slate-300 animate-pulse`}/>
                    </div>
               </div>
            </div>
    )
}
 
export default ProductDetailsPageLoading










