import { useScrollEffect } from "@/Hooks/useScrollEffect"
import { filterStore } from "@/Store/ClientStore/store-Filters"
import SearchBar, { searchValues } from "@/components/searchBar"
import { categoryBadges, defaultValues, tempPaymentNote } from "@/Store/ClientStore/store-Constants"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { BsFillLightningChargeFill } from "react-icons/bs"
import SellerCard from "./components/SellerCard"
import ReviewCard from "./components/ReviewCard"
import ProductSlider from "./components/ProductSlider"
import ShowReviewModal from "./components/Modals/Modal-ShowReview"
import React from "react"
import DeleteReviewModal from "./components/Modals/Modal-DeleteReview"
import EditReviewModal from "./components/Modals/Modal-EditReview"
import ProductDetailsPageLoading from "./components/Loading-Ui/Loading-page-ProductDetails"
import ReviewCardLoading from "./components/Loading-Ui/Loading-ReviewCard"
import { syncAddReview, syncDeleteReview, syncFetchAllReviews, syncFetchProductDetails } from "@/Store/ServerStore/sync-Products"


export type reviewType = {
    userRating  : number
    userComment : string
}

function ProductDetailsPage() {

    const { id } = useParams()
    const Navigate = useNavigate()
    const { setSearchObject } = filterStore()
    const categoryBarRef = useRef<HTMLUListElement|null>(null)
    const { handleScrollX, leftScroll, rightScroll } = useScrollEffect({scrollBy:100,scrollPadRef:categoryBarRef})
    const { data:product, isLoading:productLoading } = syncFetchProductDetails(id!)
    const { data:reviews, isLoading:reviewLoading, isRefetching:reviewRefetching } = syncFetchAllReviews(id!)
    const { mutate:addRev } = syncAddReview(id!)
    const { mutate:deleteRev } = syncDeleteReview(id!)
    const categoryIndex = categoryBadges.values.indexOf(product ? product.category: 'watch')
    const categoryString = categoryBadges.strings[categoryIndex]
    const [Thumbnail, setThumbnail] = useState('')
    const [Quantity, setQuantity] = useState(0)

    useEffect(()=>{
        window.scrollTo({ top: 0 })
    },[])
    useEffect(()=>{
        if (product) {
            setThumbnail(product.images.thumbnail.url)
        }
    },[product])

    const handleSearch = (value: searchValues) => {
        setSearchObject({...defaultValues, keyword:value.search})
        window.scrollTo({ top: 0 })
        Navigate("/products")
    }

    const handleCategory = (categories:string[]) => {
        setSearchObject({...defaultValues, category:categories[0]})
        window.scrollTo({ top: 0 })
        Navigate("/products")
    }

    const deleteReview = () => {
        deleteRev()
    }
    const submitReview = (review:reviewType) => {
        addRev(review)
    }
    const changeThumbnail = (img:string) => {
        if (img !== Thumbnail) {
            setThumbnail(img)
        }
    } 

    if (!id) {
        Navigate(-1)
        return
    }


    return (
        <div className={`w-screen min-h-screen bg-slate-200 xxs:pt-12 sm:pt-10 max-w-[86rem] m-auto`}>

            <div className={`grow px-2 pl-4 bg-slate-800 self-stretch flex justify-center py-2 sm:hidden sticky top-14 xs:top-16 h-12 xs:h-14 sm:h-12 z-20`}>
                <SearchBar
                    onSearch={handleSearch}
                    placeHolder="Search Products"
                />
            </div>

            <nav className=" xs:top-4 relative top-2 h-8 xs:h-10 flex justify-center flex-nowrap cursor-pointer bg-white z-10 mb-4 xs:mb-6 rounded-md">
                <button className={`text-slate-800 text-3xl active:bg-slate-300 ${leftScroll ? 'opacity-100': 'opacity-0'}`}
                        onClick={() => handleScrollX(-1)}>
                    <BiChevronLeft/>
                </button>
                <ul className="px-2 flex font-semibold sm:text-base text-sm overflow-x-scroll scroll-smooth hide-scrollbar text-black max-w-[100%]"
                ref={categoryBarRef}>                    
                {
                categoryBadges.strings.map((category,index) => {
                    const value = categoryBadges.values[index]
                    return (
                    <li key={category} className="flex justify-center">
                        <button className="whitespace-nowrap active:bg-slate-300 text-slate-800 px-4 flex justify-center items-center py-0 xs:py-[0.2rem] sm:py-0 xs:text-lg sm:text-base"
                        onClick={()=>handleCategory([value])}>
                            {category}
                        </button>
                    </li>
                    )
                })
                }
                </ul>
                <button className={`text-slate-800 text-3xl active:bg-slate-300 ${rightScroll ? 'opacity-100': 'opacity-0'}`}
                        onClick={() => handleScrollX(1)}>
                    <BiChevronRight/>
                </button>
            </nav>


            { productLoading
            ? <ProductDetailsPageLoading/>
            :
                <>
                <div className={`flex flex-col md:flex-row items-start pt-4 sm:p-4 lg:p-8 bg-white rounded-md gap-x-3 lg:gap-x-8`}
                >
                    <div className={`w-full md:w-2/5 xl:w-[45%] aspect-square xs:h-96 sm:h-[30rem] md:h-auto md:aspect-square bg md:sticky top-20 flex-none flex justify-center gap-x-2 p-2 xs:p-0`}>
                        <div className={`bg-white h-full aspect-square relative flex justify-center`}>
                            <img
                                src={Thumbnail}
                                alt="product photo"
                                className="h-full w-full object-contain"
                            />
                            <p className={`inline-flex items-center gap-x-3 text-sm xl:text-lg font-semibold ${ +product.overallRating >= 4 ? 'bg-green-600' : +product.overallRating >= 3 ? 'bg-yellow-600 ' :'bg-red-600'} text-white px-4 py-1 rounded-md whitespace-nowrap md:hidden absolute top-2 left-2`}>
                                ★ {product.overallRating} 
                            </p>
                        </div>
                    </div>
                
                    <div className={`py-2 px-2 mt-2 mb-8 self-stretch flex justify-center gap-x-4 md:hidden rounded-md`}>
                        {
                            product.images.additional.map((img:any) => (
                                <img
                                key={img.url}
                                src={img.url}
                                alt="product photo"
                                className="w-1/6 xs:w-14 sm:w-16 aspect-square bg-slate-300"
                                onMouseOver={()=>changeThumbnail(img.url)}
                                onClick={()=>changeThumbnail(img.url)}
                                />
                            ))
                        }
                    </div>

                
                    <div className={`grow px-4 flex flex-col gap-y-10 pb-4`}
                    >
                        <div className={`flex flex-col gap-y-3`}>
                            <h1 className="text-xl sm:text-xl lg:text-2xl font-semibold sm:font-noral leading-7">
                                {product.title}
                            </h1>
                            <div className="flex gap-x-4 sm:gap-x-2 lg:gap-x-4 lg:text-lg items-center pt-4 sm:pt-2"
                            >
                                <p className="text-2xl xs:text-4xl sm:text-xl lg:text-2xl xl:text-3xl font-semibold leading-[1.875rem] text-green-800">
                                    ₹{product.price.net}
                                </p>
                                <p className="leading-[1.3rem] bg-red-500 px-2 py-[0.1rem] xs:py-1 sm:py-0 lg:px-4 text-white font-semibold text-base xs:text-lg sm:text-sm lg:text-lg whitespace-nowrap">
                                    {product.price.discount}% off
                                </p>
                                <p className="text-xl sm:text-base text-red-600 line-through leading-[1.3rem] sm:font-semibold ">
                                    ₹{product.price.actual}
                                </p>
                                <div className={`items-end hidden sm:flex`}>
                                    <p className={`inline-flex items-center gap-x-3 text-sm xl:text-lg font-semibold ${ +product.overallRating >= 4 ? 'bg-green-600' : +product.overallRating >= 3 ? 'bg-yellow-600 ' :'bg-red-600'} text-white px-2 py-1 xl:py-0 rounded-md ml-8 whitespace-nowrap`}>
                                        ★ {product.overallRating} 
                                    </p>
                                    <p className="pl-2">
                                        {
                                            !reviewRefetching && !reviewLoading &&
                                            `(${reviews.totalReviews} reviews)`
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className={`pt-8`}>
                                <select className="px-3 font-semibold py-1 rounded-md bg-white ring-1 ring-slate-300 shadow-md text-green-800"
                                        onChange={(e)=> setQuantity(+e.target.value)}>
                                {
                                    Array.from({length:Math.min(product.stock,5)})
                                    .map((_,i)=>(
                                        <option value={i+1}>{i+1} Items</option>
                                    ))
                                }
                               </select>
                            </div>
                                
                            <div className="flex gap-x-4 justify-center sm:justify-start min-w-0">
                                <button className="bg-green-600 text-white py-2 xs:px-8 xs:text-xl sm:text-base xl:text-xl font-semibold rounded-lg flex items-center justify-center gap-x-2 hover:shadow-md hover:bg-green-500 active:shadow-none active:bg-green-700 duration-75 grow sm:grow-0 whitespace-nowrap">
                                    <BsFillLightningChargeFill/>
                                    Buy Now
                                </button>
                                <button className="bg-white ring-1 ring-green-600 text-green-700 py-2 xs:px-8 xs:text-xl sm:text-base xl:text-xl font-semibold rounded-lg flex items-center justify-center gap-x-2 active:text-green-800 hover:bg-white hover:shadow-md hover:ring-green-500 active:shadow-none active:bg-slate-100 duration-75 grow sm:grow-0 whitespace-nowrap">
                                    <FaShoppingCart/>
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <p className="p-4 w-full bg-slate-100 rounded-md text-sm xl:text-base">
                            {tempPaymentNote}
                        </p>
                        
                        <div className={`flex gap-x-4`}>
                            <p className="text-lg xl:text-xl pb-1 font-semibold">
                                    Category:
                            </p>
                            <button className="px-4 rounded-md bg-green-100 active:bg-green-300 hover:bg-green-200 duration-75 text-sm xl:text-base font-semibold"
                                onClick={() => handleCategory([product.category])}>
                                {categoryString}
                            </button>
                        </div>

                        <div className={`hidden md:block`}>
                            <p className="text-lg xl:text-xl pb-1 font-semibold">
                                Photos
                            </p>
                            <div className="flex gap-x-4">
                            {
                                product.images.additional.map((img:any) => (
                                    <img
                                    key={img.url}
                                    src={img.url}
                                    alt="product photo"
                                    className="h-12 xl:h-14 aspect-square bg-slate-300 rounded-sm"
                                    onMouseOver={()=>changeThumbnail(img.url)}
                                    onClick={()=>changeThumbnail(img.url)}
                                    />
                                ))
                            }
                            </div>
                        </div>

                        <div>
                            <p className="text-lg xl:text-xl pb-1 font-semibold">
                                Discription
                            </p>
                            <ul className="xs:text-lg leading-6 sm:text-sm xl:text-base sm:leading-5 font-Roboto pl-4">
                                {
                                    product.description.map((point:string)=>(
                                        <li
                                        key={point}
                                        className="list-disc pb-4 md:pb-2">
                                            {point}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        
                        <SellerCard seller={product.seller}/>
                    </div>
                </div>


                <div className={`mt-2 p-4 bg-white rounded-md flex flex-col gap-y-4`}>
                    <p className="text-xl font-semibold">
                        {
                            !reviewRefetching && !reviewLoading &&
                            `Reviews (${reviews.totalReviews})`
                        }
                    </p>
                    <div className={` grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}>
                        {
                            (reviewRefetching || reviewLoading) &&
                            Array.from({length:6}).map((_,i)=>(
                                <React.Fragment key={i}>
                                    <ReviewCardLoading/>
                                </React.Fragment>
                            ))
                        }
                        {
                            !reviewRefetching && !reviewLoading &&
                            reviews.currentUserReview &&
                            <ReviewCard
                                currentUserReview
                                productId={id}
                                name={reviews.currentUserReview.name}
                                comment={reviews.currentUserReview.comment}
                                rating={+reviews.currentUserReview.rating}
                                />
                        }
                        {
                            !reviewRefetching && !reviewLoading &&
                            !reviews.currentUserReview &&
                            <ReviewCard
                            productId={''}
                            name={''}
                            comment={''}
                            rating = {4}
                            />
                        }
                        {
                            !reviewRefetching && !reviewLoading &&
                            reviews.allReviews.map((user:any) => (
                                <React.Fragment
                                    key={`${user.name}${user.rating}${Math.random()}`}>
                                    <ReviewCard
                                    productId={id}
                                    name={user.name}
                                    comment={user.comment}
                                    rating={+user.rating}
                                    />
                                </React.Fragment>
                            ))
                        }
                    </div>
                </div>
                
                <ShowReviewModal/>
                <DeleteReviewModal onConfirm={deleteReview}/>
                <EditReviewModal onConfirm={submitReview} />

                <div className={`py-2`}>
                <ProductSlider 
                    title={'Similar Products'}
                    value={product.category}/>
                </div>
            </>
            }
        </div>
    )
}
 
export default ProductDetailsPage










