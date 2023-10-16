import { NavLink } from "react-router-dom"


export type productCardHomePropsType = {
    title           : string
    thumbnail       : string
    discountedPrice : string
    actualPrice     : string
    discount        : string
    productId       : string
}


function ProductCardHome(props:productCardHomePropsType) {

    const { title, thumbnail, discountedPrice, discount, productId } = props

    return (    
    <NavLink className="flex-none bg-white h-60 xs:h-64 aspect-[7/11] rounded-md overflow-hidden relative hover:shadow-md cursor-pointer duration-100 flex flex-col justify-start active:shadow-none active:scale-100 group"
    to={`/product/${productId}`}>

        <div className="h-[73%] flex items-center">
            <img
            src={thumbnail}
            alt="Product"
            className="w-full h-full object-contain"
            />
        </div>

        <p className="text-sm md:text-xs xl:text-sm xs:text-sm xxs:text-xs font-semibold absolute right-0 top-0 bg-red-600 text-white px-2 rounded-sm">
            {discount}% off
        </p>

        <div className={`px-2 bg-white text-black w-full absolute flex flex-col justify-center bottom-0 h-[27%]`}>
            <p className={`line-clamp-2 font-semibold group-hover:text-green-800 group- active:text-green-900 leading-[0.9rem] text-xs xs:text-sm xs:leading-4 h-2/3 pt-2`}>
                {title}
            </p>
            <div className={`grow w-full flex items-baseline justify-end pb-1 pr-4`}>
                <p className="font-bold text-green-600 text-base">
                    ₹{discountedPrice}
                </p>
            </div>
        </div>
    </NavLink>

    )
}
 
export default ProductCardHome



