import { useEffect, useState } from "react"
import { FaShoppingCart } from "react-icons/fa"



function MernBazaarLoader() {
    const [Loader, setLoader] = useState(false)
    const [Cart, setCart] = useState(false)
    const [Title, setTitle] = useState(false)
    const [Tag, setTag] = useState(false)

    useEffect(()=>{
        setTitle(true)
        const tagTimer = setTimeout(() => {
            setTag(true)
        }, 800);
        const cartTimer = setTimeout(() => {
            setCart(true)
        }, 2000);
        const loaderTimer = setTimeout(() => {
            setLoader(true)
        }, 3500);
        return () => {
            clearInterval(loaderTimer)
            clearInterval(cartTimer)
            clearInterval(tagTimer)
        }
    },[])

    return (
    <div className={`w-screen h-screen bg-white text-slate-800 flex justify-center items-center`}>
        <div className={`flex justify-center items-center gap-x-4 sm:gap-x-5 -translate-y-12 overflow-hidden`}>
            <p className="relative">
                <FaShoppingCart className={`text-6xl sm:text-7xl ${Cart ? 'scale-100' :'scale-0'} duration-500`}/>
                <span className={`${Loader ? 'opacity-100' : 'opacity-0'} duration-500`}>
                    <span className={`w-4 h-4 rounded-full border-b-white border-l-white border-[0.24rem] border-slate-800 animate-spin absolute top-[25%] left-[50%] `}/>
                </span>
            </p>
            <div className={`font-bold ${Cart?'-translate-x-[0%]':'-translate-x-[16%]'} duration-500`}>
                <p className={`text-4xl sm:text-5xl ${Title ? 'opacity-100' : 'opacity-0'} duration-1000`}>
                    MernBazaar
                </p>
                <p className={`text-sm sm:text-base flex items-center gap-x-1 font-semibold ${Tag ? 'opacity-100' : 'opacity-0'} duration-1000`}>
                    Made with Mern Stack & ❤
                </p>
            </div>
        </div>
    </div>
    )
}
 
export default MernBazaarLoader


{/* <div className="mt-2 h-2 w-full bg-slate-500 animate-lineLoader rounded-full origin-right"/> */}