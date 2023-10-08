import { useScrollEffect } from "@/Hooks/useScrollEffect"
import { filterStore } from "@/Store/ClientStore/store-Filters"
import SearchBar, { searchValues } from "@/components/searchBar"
import { categoryBadges, defaultValues, tempPaymentNote } from "@/Store/ClientStore/store-Constants"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { useNavigate, useParams } from "react-router-dom"
import { useRef } from "react"
import { Rating } from '@mui/material'
import { FaShoppingCart } from "react-icons/fa"
import { BsFillLightningChargeFill } from "react-icons/bs"
import SellerCard from "./components/SellerCard"
import ReviewCard from "./components/ReviewCard"
import ProductSlider from "./components/ProductSlider"

const title = 'Noise Pulse 2 Max 1.85 Display, Bluetooth Calling Smart Watch, 10 Days Battery, 550 NITS Brightness, Smart'
const description = ['Powerful Performance – Take on everything from professional-quality editing to action-packed gaming with ease. The Apple M1 chip with an 8-core CPU delivers up to 3.5x faster performance than the previous generation while using way less power','Superfast Memory – 8GB of unified memory makes your entire system speedy and responsive. That way it can support tasks like memory-hogging multitab browsing and opening a huge graphic file quickly and easily.','The Apple M1 chip with an 8-core CPU delivers up to 3.5x faster performance than the previous generation while using way less power','Performance – Take on everything from professional-quality editing to action-packed gaming with ease. The Apple M1 chip with an 8-core CPU delivers up to 3.5x faster performance than the previous generation while using way less power']
const reviewCount = 4
const overallRatings = 4.5
const actualPrice = 133
const netPrice = 43
const discount = 77
const photos = [1,2,3,4]
const category = 'watch'
const seller = {
    name: "Ajanta electronics ",
    email: "gugia@pugia.com",
    description: "we bring you the best of the world products with state of the art technology and great customer services, providing you benefits like 10 days replacement policies and 1 year warranty on every products you buy from us and many more such benefits",
    address:'62 H, LGF 2, Royal Apartments, HumayunPur Village, Safdarjung Enclave, New Delhi, near East Kailash Puri Akhbar Road - 110023, mve, New Delhi, near East Kailash Puri Akhbar',
    sellerScore: 4,
    joinedAt: new Date()
}

const sampleCurrent = {
     name : "gugiaasdfasdfsdfasdf",
     overallRating : 3,
     message : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cupiditate nisi, rem ea esse obcaecati dignissimos delectus corporis facilis asperiores quas velit vitae laboriosam dolor accusantium dolores, molestiae tempora fuga adipisci voluptas!'
}
const currentUserReview = sampleCurrent


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

    if (!id) {
        Navigate(-1)
        return
    }
    

    return (
        <div className={`w-screen min-h-screen bg-slate-200 xxs:pt-12 sm:pt-10 max-w-[86rem] m-auto`}>

            <div className={`grow py-2 px-2 pl-4 bg-slate-600 self-stretch flex justify-center sm:hidden sticky top-14 xs:top-16 h-12 z-20 rounded-md`}>
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
                        <button className="whitespace-nowrap active:bg-slate-300 text-slate-800 px-4 flex justify-center items-center py-0 xs:py-[0.2rem] sm:py-0"
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


            <div className={`flex items-start gap-x-4 p-10 bg-white rounded-md`}>
               <div className={`w-1/2 aspect-square bg-slate-200 sticky top-20 flex-none`}>
               </div>
               
               <div className={`grow p-4`}>
                    <h1 className="text-3xl font-Roboto">
                        {title}
                    </h1>
                    <div className="flex gap-x-4 text-lg pt-2">
                        <p className="flex gap-x-2 items-center">
                            {overallRatings}
                            <Rating
                            precision={0.5}
                            defaultValue={overallRatings}
                            readOnly/>
                        </p>
                        <p>
                            {reviewCount} reviews
                        </p>
                    </div>
                    <div className="flex gap-x-4 text-lg pt-2 items-end">
                        <p className="text-3xl font-semibold leading-[1.875rem] text-green-800">
                            ₹{netPrice}
                        </p>
                        <p className="text-red-600 line-through leading-[1.3rem] font-semibold">
                            ₹{actualPrice}
                        </p>
                        <p className="leading-[1.3rem] bg-red-500 px-4 py-1 text-white font-semibold">
                            {discount}% off
                        </p>
                    </div>
                    <div className="flex gap-x-4 pt-12">
                        <button className="bg-green-600 text-white py-2 px-8 text-xl font-semibold rounded-lg flex items-center gap-x-2 hover:shadow-md hover:bg-green-500 active:shadow-none active:bg-green-700 duration-75">
                            <BsFillLightningChargeFill/> Buy Now
                        </button>
                        <button className="bg-white ring-1 ring-green-600 text-green-700 py-2 px-8 text-xl font-semibold rounded-lg flex items-center gap-x-2 active:text-green-800 hover:bg-white hover:shadow-md hover:ring-green-500 active:shadow-none active:bg-slate-100 duration-75">
                            <FaShoppingCart/> Add to Cart
                        </button>
                    </div>
                    <p className="mt-12 p-4 w-full bg-slate-100 rounded-md">
                        {tempPaymentNote}
                    </p>
                    <div className={`pt-10 flex gap-x-4`}>
                       <p className="text-xl pb-1 font-semibold">
                            Category:
                       </p>
                       <button
                        className="px-4 rounded-md  ring-slate-300 bg-slate-100 active:bg-slate-200 hover:ring-1"
                        onClick={() => handleCategory([category])}>
                         {categoryString}
                       </button>
                    </div>

                    <div className={`pt-8`}>
                        <p className="text-xl pb-1 font-semibold">
                            Photos
                        </p>
                        <div className="flex gap-x-4">
                        {
                            photos.map(photo => (
                                <div
                                key={photo}
                                className="h-14 w-14 bg-slate-300 rounded-sm"/>
                                ))
                        }
                        </div>
                    </div>
                    <div className={`pt-8`}>
                        <p className="text-xl pb-1 font-semibold">
                            Discription
                        </p>
                        <ul className="leading-5 font-Roboto pl-4">
                            {
                                description.map(point=>(
                                    <li
                                    key={point}
                                    className="list-disc pb-1">
                                        {point}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className={`pt-8`}>
                       <SellerCard seller={seller}/>
                    </div>
               </div>
            </div>


            <div className={`mt-2 p-4 bg-white rounded-md flex flex-col gap-y-4`}>
               <p className="text-xl font-semibold">
                 Reviews
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
                        overallRating={+currentUserReview.overallRating}
                        />
                    :
                    <ReviewCard/>
                }

                  <ReviewCard
                    productId={id}
                    name={sampleCurrent.name}
                    message={sampleCurrent.message}
                    overallRating={+sampleCurrent.overallRating}
                    />
               </div>
            </div>

            <div className={`py-2`}>
            <ProductSlider 
                title={'Similar Products'}
                value={category}/>
            </div>
        </div>
    )
}
 
export default ProductDetailsPage










