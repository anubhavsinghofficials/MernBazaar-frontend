import { modalStore } from "@/Store/ClientStore/store-Modals"
import { useEffect, useState } from "react"
import { MdOutlineReportGmailerrorred } from "react-icons/md"
import { TiTick } from "react-icons/ti"
import { VscError } from "react-icons/vsc"


function GenericToast() {

    const { genericToastMessage, genericToastType, toggleGenericToast, showGenericToast } = modalStore()
    const [fadeOut, setFadeOut] = useState(false)

    useEffect(()=>{
        if (showGenericToast) {
            setFadeOut(false)
            setTimeout(() => {
                setFadeOut(true)
            }, 3000)
            setTimeout(() => {
                toggleGenericToast(false)
            }, 3400);
        } else {
            setFadeOut(true)
        }
    },[showGenericToast])


    if (!showGenericToast) {
        return
    }

    return (
        <div className={`${genericToastType==='success' &&'bg-green-50 shadow-[#6ae67843]'} ${genericToastType==='error' &&'bg-red-50 shadow-[#e66a6a43]'} ${genericToastType==='warning' &&'bg-yellow-50 shadow-[#e6d86a43]'} max-w-[18rem] xs:max-w-[24rem] md:max-w-[28rem] xs:min-h-[3rem] fixed bottom-0 right-[50%] translate-x-[50%] z-50 rounded-full shadow-lg ${!fadeOut ?'-translate-y-6 opacity-100 scale-100' : '-translate-y-0 opacity-0 scale-50'} duration-150 flex items-center gap-x-2 xs:gap-x-4 p-3 pr-4 xs:pr-8`}>
            <div className={`h-full aspect-square`}>
                <MdOutlineReportGmailerrorred className={`${genericToastType==='warning' ? 'block':'hidden'} bg-yellow-600 text-yellow-50 rounded-full text-3xl xs:text-[2rem]`}/>
                <TiTick className={`${genericToastType==='success' ? 'block':'hidden'} bg-green-600 text-green-50 rounded-full text-3xl xs:text-[2rem]`}/>
                <VscError className={`${genericToastType==='error' ? 'block':'hidden'} bg-red-600 text-red-50 rounded-full text-3xl xs:text-[2rem]`}/>
            </div>
            <p className={`font-semibold xs:text-xl ${genericToastType==='success' &&'text-green-800'} ${genericToastType==='error' &&'text-red-800'} ${genericToastType==='warning' &&'text-yellow-800'} whitespace-nowrap text-ellipsis overflow-hidden`}>
                {genericToastMessage}
            </p>
        </div>
    )
}
 
export default GenericToast