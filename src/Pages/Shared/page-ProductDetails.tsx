import { useScrollEffect } from "@/Hooks/useScrollEffect"
import { filterStore } from "@/Store/ClientStore/store-Filters"
import SearchBar, { searchValues } from "@/components/searchBar"
import { categoryBadges, defaultValues, tempPaymentNote } from "@/Store/ClientStore/store-Constants"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { useNavigate, useParams } from "react-router-dom"
import { useRef } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { BsFillLightningChargeFill } from "react-icons/bs"
import SellerCard from "./components/SellerCard"
import ReviewCard from "./components/ReviewCard"
import ProductSlider from "./components/ProductSlider"
import ShowReviewModal from "./components/Modal-ShowReview"
import React from "react"
import DeleteReviewModal from "./components/Modal-DeleteReview"
import EditReviewModal from "./components/Modal-EditReview"

const title = 'Noise Pulse 2 Max 1.85 Display, Bluetooth Calling Smart Watch, 10 Days Battery, 550 NITS Brightness, Smart'
const description = ['Powerful Performance – Take on everything from professional-quality editing to action-packed gaming with ease. The Apple M1 chip with an 8-core CPU delivers up to 3.5x faster performance than the previous generation while using way less power','Superfast Memory – 8GB of unified memory makes your entire system speedy and responsive. That way it can support tasks like memory-hogging multitab browsing and opening a huge graphic file quickly and easily.','The Apple M1 chip with an 8-core CPU delivers up to 3.5x faster performance than the previous generation while using way less power','Performance – Take on everything from professional-quality editing to action-packed gaming with ease. The Apple M1 chip with an 8-core CPU delivers up to 3.5x faster performance than the previous generation while using way less power']
const reviewCount = 4
const overallRatings = 4.5
const actualPrice = 1330000
const netPrice = 4300000
const discount = 77
const photos = [1,2,3,4]
const category = 'watch'
const seller = {
    name: "Ajanta electronics Ajanta electronics Ajanta electronics ",
    email: "gugia@pugiaelectronics.com",
    description: "we bring you the best of the world products with state of the art technology and great customer services, providing you benefits like 10 days replacement policies and 1 year warranty on every products you buy from us and many more such benefits",
    address:'62 H, LGF 2, Royal Apartments, HumayunPur Village, Safdarjung Enclave, New Delhi, near East Kailash Puri Akhbar Road - 110023, mve, New Delhi, near East Kailash Puri Akhbar',
    sellerScore: 4,
    joinedAt: new Date()
}

const sampleCurrent = {
     name : "Abhinav Singh",
     overallRating : 3,
     message : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cupiditate nisi, rem ea esse obcaecati dignissimos delectus corporis facilis asperiores quas velit vitae laboriosam dolor accusantium dolores, molestiae tempora fuga adipisci voluptas!'
}
const currentUserReview = sampleCurrent

const otherUsers = [{
    name : "other user",
    overallRating : 4.5,
    message : 'corporis facilis asperiores quas velit vitae laboriosam dolor accusantium dolores, molestiae tempora fuga adipisci voluptas!'
}]

export type reviewType = {
    userRating  : number
    userComment : string
}

function ProductDetailsPage() {

    const { id } = useParams()
    const Navigate = useNavigate()
    const { setSearchObject } = filterStore()
    const categoryBarRef = useRef<HTMLUListElement | null>(null)
    const { handleScrollX, leftScroll, rightScroll }
    = useScrollEffect({scrollBy:100,scrollPadRef:categoryBarRef})
    const categoryIndex = categoryBadges.values.indexOf(category)
    const categoryString = categoryBadges.strings[categoryIndex]
   
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
        // set reviewer to default
    }
    const submitReview = (review:reviewType) => {
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


            <div className={`flex flex-col md:flex-row items-start pt-4 sm:p-4 lg:p-10 bg-white rounded-md`}
            >
               <div className={`w-full md:w-2/5 xl:w-1/2 aspect-square xs:h-96 sm:h-[30rem] md:h-auto md:aspect-square bg md:sticky top-20 flex-none flex justify-center gap-x-2 p-2 xs:p-0`}>

                <div className={`bg-slate-300 h-full aspect-square relative`}>
                    <p className={`inline-flex items-center gap-x-3 text-sm xl:text-lg font-semibold ${ +overallRatings >= 4 ? 'bg-green-600' : +overallRatings >= 3 ? 'bg-yellow-600 ' :'bg-red-600'} text-white px-4 py-1 rounded-md whitespace-nowrap md:hidden absolute top-2 left-2`}>
                        ★ {overallRatings} 
                    </p>
                </div>
               </div>
               
               <div className={`py-2 px-2 mt-2 mb-8 self-stretch flex justify-center gap-x-2 md:hidden rounded-md`}>
                    <div className={`w-12 xs:w-16 aspect-square bg-slate-300`}/>
                    <div className={`w-12 xs:w-16 aspect-square bg-slate-300`}/>
                    <div className={`w-12 xs:w-16 aspect-square bg-slate-300`}/>
                    <div className={`w-12 xs:w-16 aspect-square bg-slate-300`}/>
                    <div className={`w-12 xs:w-16 aspect-square bg-slate-300`}/>
                    <div className={`w-12 xs:w-16 aspect-square bg-slate-300`}/>
                </div>

               
               <div className={`grow px-4 flex flex-col gap-y-10 pb-4`}
               >
                    <div className={`flex flex-col gap-y-3`}>
                        <h1 className="text-xl xs:text-2xl sm:text-xl lg:text-2xl xl:text-3xl font-Roboto font-semibold sm:font-normal leading-7">
                            {title}
                        </h1>
                        <div className="flex gap-x-4 sm:gap-x-2 lg:gap-x-4 lg:text-lg items-center pt-4 sm:pt-0"
                        >
                            <p className="text-2xl xs:text-4xl sm:text-xl lg:text-2xl xl:text-3xl font-semibold leading-[1.875rem] text-green-800">
                                ₹{netPrice}
                            </p>
                            <p className="leading-[1.3rem] bg-red-500 px-2 py-[0.1rem] xs:py-1 sm:py-0 lg:px-4 text-white font-semibold text-base xs:text-lg sm:text-sm lg:text-lg whitespace-nowrap">
                                {discount}% off
                            </p>
                            <p className="text-xl sm:text-base text-red-600 line-through leading-[1.3rem] sm:font-semibold ">
                                ₹{actualPrice}
                            </p>
                            <p className={`inline-flex items-center gap-x-3 text-sm xl:text-lg font-semibold ${ +overallRatings >= 4 ? 'bg-green-600' : +overallRatings >= 3 ? 'bg-yellow-600 ' :'bg-red-600'} text-white px-2 py-1
                            rounded-md ml-8 whitespace-nowrap hidden sm:block`}>
                                ★ {overallRatings} 
                                <span className="pl-2">
                                    ({reviewCount} reviews)
                                </span>
                            </p>
                        </div>
                            
                        <div className="flex gap-x-4 justify-center sm:justify-start pt-8 min-w-0">
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
                       <button
                        className="px-4 rounded-md bg-green-100 active:bg-green-300 hover:bg-green-200 duration-75 text-sm xl:text-base font-semibold"
                        onClick={() => handleCategory([category])}>
                         {categoryString}
                       </button>
                    </div>

                    <div className={`hidden md:block`}>
                        <p className="text-lg xl:text-xl pb-1 font-semibold">
                            Photos
                        </p>
                        <div className="flex gap-x-4">
                        {
                            photos.map(photo => (
                                <div
                                key={photo}
                                className="h-12 xl:h-14 aspect-square bg-slate-300 rounded-sm"/>
                                ))
                        }
                        </div>
                    </div>

                    <div className={``}>
                        <p className="text-lg xl:text-xl pb-1 font-semibold">
                            Discription
                        </p>
                        <ul className="xs:text-lg leading-6 sm:text-sm xl:text-base sm:leading-5 font-Roboto pl-4">
                            {
                                description.map(point=>(
                                    <li
                                    key={point}
                                    className="list-disc pb-4 md:pb-2">
                                        {point}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    
                    <div className={``}>
                       <SellerCard seller={seller}/>
                    </div>
               </div>
            </div>


            <div className={`mt-2 p-4 bg-white rounded-md flex flex-col gap-y-4`}>
               <p className="text-xl font-semibold">
                    Reviews ({reviewCount})
               </p>
               <p className="font-Roboto text-slate-800 text-lg">
                            
                        </p>
               <div className={` grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}>
                {
                    currentUserReview
                    ?
                    <ReviewCard
                        currentUserReview
                        productId={id}
                        name={currentUserReview.name}
                        message={currentUserReview.message}
                        rating={+currentUserReview.overallRating}
                        />
                    :
                    <ReviewCard
                        productId={''}
                        name={''}
                        message={''}
                        rating = {4}
                        />
                }
                {
                    otherUsers.map(user => (
                        <React.Fragment key={`${user.name}${user.message}${user.overallRating}`}>
                            <ReviewCard
                            productId={id}
                            name={user.name}
                            message={user.message}
                            rating={+user.overallRating}
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
                value={category}/>
            </div>
        </div>
    )
}
 
export default ProductDetailsPage










