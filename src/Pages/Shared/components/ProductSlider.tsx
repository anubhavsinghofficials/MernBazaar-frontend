import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import ProductCardHome from "./ProductCard-Home"
import { filterStore } from "@/Store/ClientStore/store-Filters"
import { useNavigate } from "react-router-dom"
import { useScrollEffect } from "@/Hooks/useScrollEffect"
import React, { useRef } from "react"
import { syncFetchProducts } from "@/Store/ServerStore/store-Products"
import { categoryBadges, defaultValues } from "@/Store/ClientStore/store-Constants"
import { AxiosError } from "axios"
import ProductCardHomeLoading from "./Loading-Ui/Loading-ProductCard-Home"
import { IconType } from 'react-icons'

type productSliderType = {
    title:string,
    value:string
}

function ProductSlider(props:productSliderType) {
    const { title, value } = props
    const scrollPadRef = useRef(null)
    const Navigate = useNavigate()
    const { setSearchObject, searchObject} = filterStore()
    const categoryIndex = categoryBadges.values.indexOf(value)
    const CategoryIcon = categoryBadges.icons[categoryIndex] as IconType
    const categorySearchObject = {
        ...defaultValues,
        category   : value,
        pageLength : 10
    }
    const { data, isLoading, isRefetching, isError, error } =
    syncFetchProducts(categorySearchObject)

    const { handleScrollX, leftScroll, rightScroll }
    = useScrollEffect({scrollBy:500,scrollPadRef:scrollPadRef})
    
    const handleCategory = (categories:string[]) => {
        setSearchObject({...searchObject,category:categories[0]})
        Navigate("/products")
    }

    if (isError) {
      const errorData = (error as AxiosError).response?.data
      console.log(errorData)
    }

    return (
             
        <div className={`bg-white relative`}>

            <div className={`flex justify-between pt-4`}>
                <button
                className={`h-10 flex justify-start items-center gap-x-2 px-4 text-slate-800 text-lg xs:text-xl font-bold hover:text-green-700 active:text-green-900`}
                onClick={()=>handleCategory([value])}>
                     <CategoryIcon className="text-red-600"/> 
                     <span className="line-clamp-1 text-start">
                        {title}
                     </span>
                    <span className="text-2xl">
                            <BiChevronRight/>
                    </span>
                </button>

                <div className={`flex pr-4`}>
                    <button className={`text-slate-800 text-3xl active:bg-slate-200 rounded-md ${leftScroll ? 'opacity-100': 'opacity-40'}`}
                            onClick={() => handleScrollX(-1)}>
                        <BiChevronLeft/>
                    </button>
                    <button className={`text-slate-800 text-3xl active:bg-slate-200 rounded-md ${rightScroll ? 'opacity-100': 'opacity-40'}`}
                            onClick={() => handleScrollX(1)}>
                        <BiChevronRight/>
                    </button>
                </div>   
                
            </div>

            <div className={`p-4 flex flex-nowrap gap-x-3 overflow-x-scroll hide-scrollbar scroll-smooth`}
            ref={scrollPadRef}>
            {
                data &&
                data.products.map((product:any) => (
                    <React.Fragment key={product._id}>
                        <ProductCardHome
                        title={product.title}
                        thumbnail={product.images.thumbnail.url}
                        actualPrice={product.price.actual}
                        discountedPrice={product.price.net}
                        discount={product.price.discount}
                        productId={product._id}/>
                    </React.Fragment>
                ))
            }
            {
              (isLoading || isRefetching || isError) &&
              Array.from({ length: 10 }).map((_, index) => (
                <React.Fragment key={index}>
                    <ProductCardHomeLoading/>
                </React.Fragment>
                ))
            }
            </div>
        </div>
    )
}
 
export default ProductSlider