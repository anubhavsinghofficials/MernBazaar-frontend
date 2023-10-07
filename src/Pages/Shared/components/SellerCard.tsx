
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
    const [showMore, setShowMore] = useState(false)

    const handleShowMore = (e:React.MouseEvent) => {
        e.stopPropagation()
        setShowMore( prev =>!prev )
    }
     
    return (
        <div
            className='cursor-pointer'
            onClick={handleShowMore}>
            <p className="text-xl pb-1 font-semibold">
                Seller
            </p>
            <div className={`ring-slate-200 rounded-md flex flex-col gap-y-2 p-4 relative bg-gradient-to-br bg-slate-100 ring-2 group`}>
                <button className='absolute right-4 bottom-2 text-green-800 hover:bg-slate-200 px-2 rounded-md duration-75'
                        onClick={handleShowMore}>
                    {`${showMore?'see less':'see more'}`}
                </button>
                <div className={`flex gap-x-2`}>
                    <div className={`h-40 aspect-square rounded-full p-4 relative`}>
                        <Circle
                        strokeWidth={10}
                        strokeColor={"#22c55e"}
                        trailWidth={10}
                        trailColor='#e2e8f0'
                        percent={sellerScorePercentage}
                        />
                        <div className={`absolute w-full h-full top-0 left-0 flex justify-center items-center flex-col text-green-700 gap-y-1`}>
                            <p className='text-3xl leading-5'>
                                ★{sellerScore}
                            </p>
                            <p className='text-sm font-semibold'>
                                Seller Score
                            </p>
                        </div>
                    </div>
                    <div className={`p-2 flex flex-col gap-y-2`}>
                        <p className="text-xl leading-6 font-semibold text-green-700 group-hover:text-green-600 line-clamp-2">
                        {name}
                        </p>
                        <div className="flex flex-col gap-y-1">
                            <div className={`flex gap-x-2`}>
                                <p className="w-1/6 flex-none font-semibold leading-[1.4rem]">
                                    contact:
                                </p>
                                <p className="text-sm">
                                    {email}
                                </p>
                            </div>
                            <div className={`flex gap-x-2`}>
                                <p className="w-1/6 flex-none font-semibold leading-[1rem]">
                                    address:
                                </p>
                                <p className={`${!showMore && 'line-clamp-3'} text-sm leading-[1.1rem]`}>
                                    {address}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {
                showMore &&
                <>
                <div className={``}>
                    <p className="font-semibold">
                        Discription
                    </p>
                    <p className="text-sm leading-[1.1rem]">
                        {description}
                    </p>
                </div>
                
                <div className={``}>
                    <p className="font-semibold">
                        Seller since
                    </p>
                    <p className="text-sm leading-[1.1rem]">
                        {`${months[joinedAt.getMonth()-1]} ${joinedAt.getFullYear()}`}
                    </p>
                </div>
                </>
                }

            </div>
        </div>
    )
}
 
export default SellerCard