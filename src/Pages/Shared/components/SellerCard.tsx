
import { months } from '@/Store/ClientStore/store-Constants'
import { Circle } from 'rc-progress'
import { useState } from 'react'

type sellerCardType = {
    seller:{
        name: string
        email:string
        address:string
        description:string
        sellerScore:number
        joinedAt:Date
    }
}


function SellerCard(props:sellerCardType) {
    
    const { seller:{name,email,address,description,
            joinedAt, sellerScore} } = props
    const sellerScorePercentage = (sellerScore/5)*100
    const joinedAtDate = new Date(joinedAt)
    const [showMore, setShowMore] = useState(false)

    const handleShowMore = (e:React.MouseEvent) => {
        e.stopPropagation()
        setShowMore( prev =>!prev )
    }
     
    return (
        <div className='cursor-pointer mb-4 lg:m-0'
            onClick={handleShowMore}>
            <div className="text-xl pb-1 font-semibold flex  items-center">
                <span className='pr-4'>
                    Seller
                </span>
                <p className={`inline-flex items-center gap-x-3 text-sm xl:text-lg font-semibold ${ +sellerScore >= 4 ? 'bg-green-600' : +sellerScore >= 3 ? 'bg-yellow-600 ' :'bg-red-600'} text-white px-2 rounded-md whitespace-nowrap xs:hidden`}>
                    ★ {sellerScore} 
                </p>
            </div>
            <div className={`ring-slate-200 rounded-md flex flex-col gap-y-2 lg:p-2 relative bg-gradient-to-br bg-slate-100 ring-2 group`}>
                <button className='absolute -bottom-6 right-0 lg:bg-none lg:right-4 lg:bottom-2 text-green-800 hover:bg-slate-100 px-2 rounded-md duration-75 hover:ring-1 ring-slate-300'
                        onClick={handleShowMore}>
                    {`${showMore?'see less':'see more'}`}
                </button>
                <div className={`flex lg:gap-x-2`}>
                    <div className={`hidden xs:block h-20 xs:h-32 lg:h-36 xl:h-40 aspect-square rounded-full p-4 relative`}>
                        <span className='hidden xs:block'>
                            <Circle
                            strokeWidth={10}
                            strokeColor={"#22c55e"}
                            trailWidth={10}
                            trailColor='#e2e8f0'
                            percent={sellerScorePercentage}
                            />
                        </span>
                        {
                            sellerScore === 0
                            ?
                            <p className='absolute w-full h-full bottom-1 left-0 flex justify-center items-center flex-col text-green-700'>
                                ★ Unrated
                            </p>
                            :
                            <div className={`absolute w-full h-full bottom-1 left-0 flex justify-center items-center flex-col text-green-700`}>
                                <p className='text-xl lg:text-2xl xl:text-3xl leading-5 pt-1 pr-1'>
                                    ★{sellerScore}
                                </p>
                                <p className='text-xs xl:text-sm font-semibold absolute xs:static -bottom-2'>
                                    Seller Score
                                </p>
                            </div>
                        }
                    </div>
                    <div className={`px-1 lg:px-2 p-2 flex flex-col gap-y-1 lg:gap-y-2`}>
                        <p className="text-lg xl:text-xl leading-6 font-semibold text-green-700 group-hover:text-green-600 line-clamp-2 flex gap-x-2">
                            <span className={`leading-[1.4rem] xs:leading-6 pb-2 xs:pb-0 ${!showMore && 'line-clamp-2'}`}>
                                {name}
                            </span>
                        </p>
                        <div className={`lg:p-0`}>
                            <p className={`${!showMore && 'line-clamp-3'} pr-2 leading-[1.15rem] lg:leading-5 text-sm lg:text-base`}>
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
                
                {
                showMore &&
                <>
                <div className={`flex flex-col px-2 lg:p-0`}>
                    <p className="flex-none font-semibold">
                        contact
                    </p>
                    <p className="leading-[1.15rem] lg:leading-5 text-sm lg:text-base">
                        {email}
                    </p>
                </div>
                <div className={`flex flex-col px-2 lg:p-0`}>
                    <p className="font-semibold">
                        address
                    </p>
                    <p className={`pr-2 leading-[1.15rem] lg:leading-5 text-sm lg:text-base`}>
                        {address}
                    </p>
                </div>
                <div className={`px-2 pb-2 lg:p-0`}>
                    <p className="font-semibold">
                        Seller since
                    </p>
                    <p className="leading-[1.15rem] lg:leading-5 text-sm lg:text-base">
                        {`${months[joinedAtDate.getMonth()-1]} ${joinedAtDate.getFullYear()}`}
                    </p>
                </div>
                </>
                }

            </div>
        </div>
    )
}
 
export default SellerCard