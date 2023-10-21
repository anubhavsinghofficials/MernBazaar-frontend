import { useEffect, useState } from "react"
import { FaShoppingCart } from "react-icons/fa"

function MernBazaarLoaderStatic() {
    const [Loader, setLoader] = useState(false)

    useEffect(()=>{
        const loaderTimer = setTimeout(() => {
            setLoader(true)
        }, 1500);
        return () => {
            clearInterval(loaderTimer)
        }
    },[])

    return (
    <div className={`w-screen h-screen bg-white text-slate-800 flex justify-center items-center`}>
        <div className={`flex justify-center items-center gap-x-4 sm:gap-x-5 -translate-y-12 overflow-hidden`}>
            <p className="relative">
                <FaShoppingCart className={`text-6xl sm:text-7xl`}/>
                <span className={`${Loader ? 'opacity-100' : 'opacity-0'} duration-500`}>
                    <span className={`w-4 h-4 rounded-full border-b-slate-200 border-l-white border-[0.24rem] border-slate-800 animate-spin absolute top-[25%] left-[50%] `}/>
                </span>
            </p>
            <div>
                <p className={`text-4xl sm:text-5xl font-bold`}>
                    MernBazaar
                </p>
                <p className={`text-sm sm:text-base flex items-center gap-x-1 font-semibold duration-1000`}>
                    Made with Mern Stack & ❤
                </p>
            </div>
        </div>
    </div>
    )
}
 
export default MernBazaarLoaderStatic


{/* <div className="mt-2 h-2 w-full bg-slate-500 animate-lineLoader rounded-full origin-right"/> */}