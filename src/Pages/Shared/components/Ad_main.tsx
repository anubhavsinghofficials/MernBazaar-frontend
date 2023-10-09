import useCountDown from "@/Hooks/useCountDown"


type Ad_MainPropsType = {
     isProductPage? : boolean
}

function Ad_main(props:Ad_MainPropsType) {
    const { isProductPage=false } = props
    const TimeStamps = useCountDown()
    const TimeStampsArray = Object.keys(TimeStamps) as (keyof typeof TimeStamps)[];

    return (
        <div className={`h-40 bg-black text-white ${!isProductPage && "sm:bg-[url('@/assets/Ad_main_Img.png')]"} bg-[url('@/assets/Ad_main_Img_mobile.png')] bg-center bg-cover bg-no-repeat relative`}>
            <div className={`absolute w-1/2 md:w-3/5 lg:w-1/2 bg-gradient-to-l from-black from-70% to-transparent h-full top-0 right-0 flex justify-center items-center xs:gap-x-2 lg:gap-x-4`}>
                {
                    isProductPage
                ?
                    TimeStampsArray.map(element => (
                        <div className="px-2 py-2 text-center xs:rounded-md bg-slate-800 tracking-wider"
                        key={element}>
                            <div className="text-xl xs:text-3xl sm:text-3xl font-bold font-BebasNeue text-red-500">
                                {TimeStamps[element]}
                            </div>
                            <div className="text-sm xs:text-base font-BebasNeue text-slate-300">
                                {element}
                            </div>
                        </div>
                    ))
                :
                    TimeStampsArray.map(element => (
                        <div className="px-2 py-2 text-center xs:rounded-md bg-slate-800 tracking-wider"
                        key={element}>
                            <div className="text-xl xs:text-3xl sm:text-5xl font-bold font-BebasNeue text-red-500">
                                {TimeStamps[element]}
                            </div>
                            <div className="text-sm xs:text-lg font-BebasNeue text-slate-300">
                                {element}
                            </div>
                        </div>
                    ))
                }
            </div>            
        </div>
    )
}
 
export default Ad_main











{/* <div className={`h-40 bg-white text-white overflow-hidden relative`}> */}
{/* <img
className="hidden sm:block object-cover object-center h-full"
src={Ad_main_Img}
alt="ad image" />            
<img
className="sm:hidden object-cover object-center h-full"
src={Ad_main_Img_mobile}
alt="ad image" /> */}