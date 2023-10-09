import { defaultValues } from "@/Store/ClientStore/store-Constants"
import { syncFetchProducts } from "@/Store/ServerStore/store-Products"
import { AxiosError } from "axios"
import FeatureProductCard from "./FeatureProductCard"
import FeatureProductCardLoading from "./FeatureProductCard-Loading"
import React from "react"
import { BsFire } from "react-icons/bs"
import { PiShootingStarFill } from "react-icons/pi"
import { HiTrendingUp } from "react-icons/hi"
import { IconType } from "react-icons"
import { TbIconsOff } from "react-icons/tb"


type FeatureFramePropsType = {
    sortBy : "ratings|-1" | "discount|-1" | "date|-1" 
    title  : string
    iconTag   : 'rating' | 'discount' | 'date'
}

function FeatureFrame(props:FeatureFramePropsType) {
    const { sortBy, title, iconTag } = props
    const categorySearchObject = {
        ...defaultValues,
        sort       : sortBy,
        pageLength : 4
    }
    const { data, isLoading, isRefetching, isError, error } =
    syncFetchProducts(categorySearchObject)
    let Icon:IconType 

    if (isError) {
        const errorData = (error as AxiosError).response?.data
        console.log(errorData)
    }  
    
    switch (iconTag) {
        case 'rating':
            Icon = PiShootingStarFill
            break;
        case 'discount':
            Icon = BsFire
            break;
        case 'date':
            Icon = HiTrendingUp
            break;
        default:
            Icon = TbIconsOff
            break;
    }

    return (
    <div className="bg-white aspect-[6/7] flex flex-col justify-end rounded-lg">
        <div className=" grow text-xl font-bold text-slate-800 pl-4 pt-2 flex items-center gap-x-4">
            <Icon className="bg-red-500 p-1 text-white text-2xl rounded-md"/>
            { title }
        </div>
        <div className={`aspect-square grid grid-cols-2 grid-rows-2 gap-2 p-2`}>
            {
                data &&
                data.products.map((product:any) => (
                    <React.Fragment key={product._id}>
                        <FeatureProductCard discount={product.price.discount}
                        thumbnail={product.images.thumbnail.url}
                        productId={product._id}/>
                    </React.Fragment>
                ))
            }
            {
              (isLoading || isRefetching || isError) &&
              Array.from({ length: 4 }).map((_, index) => (
                <React.Fragment key={index}>
                    <FeatureProductCardLoading/>
                </React.Fragment>
                ))
            }
        </div>
    </div>
    )
}
 
export default FeatureFrame