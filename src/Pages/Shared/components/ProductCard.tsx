

type productCardPropsType = {
    title           : string
    thumbnail       : string
    overallRating   : string
    discountedPrice : string
    actualPrice     : string
    discount        : string
}


function ProductCard(props:productCardPropsType) {

    const { title, thumbnail, overallRating,
            discountedPrice, actualPrice, discount} = props

    return (    
    <div className="bg-slate-400 aspect-[3/5] rounded-sm rounded-b-md overflow-hidden relative shadow-md hover:shadow-lg cursor-pointer sm:hover:scale-[1.005] duration-100 hover:ring-4 ring-slate-300">

        <div className={`absolute w-full h-[70%] bg-white xs:h-3/4`}>
            <img
            src={thumbnail}
            alt="Product"
            className="w-full h-full object-contain"
            />
        </div>
 
        <p className={`absolute top-2 left-2 ${ +overallRating >= 4 ? 'bg-green-600' : +overallRating >= 3 ? 'bg-yellow-600 ' :'bg-red-600'} text-white font-bold inline-flex items-center justify-around rounded-full xs:w-14 xs:text-base xxs:text-xs xxs:w-10 px-3 gap-x-1`}>
            <span className="leading-5">
                ★
            </span>
            <span className="leading-4 sm:leading-5">
                {overallRating}
            </span>
        </p> 
        

        <div className={`bg-white p-2 text-black w-full xs:h-1/4 h-1/3 absolute top-[70%] xs:top-[75%] flex flex-col`}>
            
            <div className={` h-1/2 `}>
                <p className={`line-clamp-2 2xl:text-[95%] 2xl:leading-5 xl:text-[90%] xl:leading-4 md:text-[90%] sm:leading-4 xxs:text-sm xxs:leading-4 font-semibold hover:text-green-700 active:text-green-900`}>
                    {title}
                </p>
            </div>
            
            <div className={`grow w-full flex items-baseline justify-end gap-x-2 pr-2 md:pt-1`}>

                <p className="text-sm md:text-xs xl:text-sm xs:text-sm xxs:text-xs font-semibold">
                    {discount}%off
                </p>

                <p className="text-sm md:text-xs xl:text-sm xs:text-sm xxs:text-xs font-semibold text-red-800 line-through">
                    ₹{actualPrice}
                </p>

                <p className="font-bold text-green-600 2xl:text-2xl xl:text-xl lg:text-base md:text-xl xs:text-2xl xxs:text-sm">
                    ₹{discountedPrice}
                </p>
                
            </div>

        </div>
    </div>

    )
}
 
export default ProductCard
