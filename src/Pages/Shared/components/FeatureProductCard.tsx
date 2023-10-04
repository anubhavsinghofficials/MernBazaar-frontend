import { productCardHomePropsType } from "./ProductCard-Home"


type FeatureProductCardPropsType = Pick<productCardHomePropsType,"thumbnail" | "discount">

function FeatureProductCard(props:FeatureProductCardPropsType) {

    const { thumbnail, discount } = props

    return (    
    <div className=" aspect-square rounded-md overflow-hidden relative hover:shadow-md cursor-pointer duration-100 active:shadow-none">
        <img
        src={thumbnail}
        alt="Product"
        className="w-full h-full object-contain"
        />
        <p className="text-sm md:text-xs xl:text-sm xs:text-sm xxs:text-xs font-semibold absolute right-0 top-0 bg-red-600 text-white px-2 rounded-sm">
            {discount}% off
        </p>
    </div>

    )
}
 
export default FeatureProductCard