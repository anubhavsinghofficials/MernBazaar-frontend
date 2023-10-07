import { defaultValues } from "@/Store/ClientStore/store-Constants"
import { syncFetchProducts } from "@/Store/ServerStore/store-Products"
import { AxiosError } from "axios"
import FeatureProductCard from "./FeatureProductCard"
import FeatureProductCardLoading from "./FeatureProductCard-Loading"
import React from "react"


type FeatureFramePropsType = {
    sortBy : "ratings|-1" | "discount|-1" | "date|-1" 
    title  : string
}

function FeatureFrame(props:FeatureFramePropsType) {
    const { sortBy, title } = props
    const categorySearchObject = {
        ...defaultValues,
        sort       : sortBy,
        pageLength : 4
    }
    const { data, isLoading, isRefetching, isError, error } =
    syncFetchProducts(categorySearchObject)

    if (isError) {
        const errorData = (error as AxiosError).response?.data
        console.log(errorData)
    }  
    

    return (
    <div className="bg-white aspect-[5/6] flex flex-col justify-end">
        <div className=" grow text-xl font-bold text-slate-800 pl-4 flex items-center">
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