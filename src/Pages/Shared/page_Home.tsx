import SearchBar, { searchValues } from "@/components/searchBar"
import { categoryBadges, defaultValues } from "@/Store/ClientStore/store-Constants"
import { filterStore } from "@/Store/ClientStore/store-Filters"
import { useNavigate } from "react-router-dom"
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import React, { useRef } from "react";
import { useScrollEffect } from "@/Hooks/useScrollEffect";
import ProductSlider from "./components/ProductSlider";
import FeatureFrame from "./components/FeatureFrame";


function HomePage() {
    
    const categoryBarRef = useRef<HTMLUListElement | null>(null)
    const Navigate = useNavigate()
    const { searchObject, setSearchObject } = filterStore()
    const { handleScrollX, leftScroll, rightScroll }
    = useScrollEffect({scrollBy:100,scrollPadRef:categoryBarRef})
    
    const handleSearch = (value: searchValues) => {
        setSearchObject({...defaultValues, keyword:value.search})
        window.scrollTo({ top: 0 })
        Navigate("/products")
    }
    
    const handleCategory = (categories:string[]) => {
        setSearchObject({...searchObject, category:categories[0]})
        Navigate("/products")
    }

    return (
        <div className={`w-screen min-h-screen bg-slate-200 xxs:pt-12 sm:pt-14 xl:px-2 xl:pr-6 lg:pr-4 max-w-[96rem] m-auto`}>

            <div className={`grow px-2 pl-4 bg-slate-600 self-stretch flex justify-center py-2 sm:hidden sticky top-14 xs:top-16 h-12 z-20`}>
                <SearchBar
                    onSearch={handleSearch}
                    placeHolder="Search Products"
                />
            </div>

            <nav className="sm:sticky sm:top-14 xs:top-4 relative top-2 h-8 xs:h-10 flex justify-center flex-nowrap cursor-pointer bg-slate-600 z-10 mb-2 xs:mb-4 sm:mb-0">
                <button className={`text-slate-200 text-3xl active:bg-slate-700 ${leftScroll ? 'opacity-100': 'opacity-0'}`}
                        onClick={() => handleScrollX(-1)}>
                    <BiChevronLeft/>
                </button>
                <ul className="px-2 flex gap-x-4 font-semibold sm:text-base text-sm overflow-x-scroll scroll-smooth hide-scrollbar text-black max-w-[100%]"
                ref={categoryBarRef}>                    
                {
                categoryBadges.strings.map((category,index) => {
                    const value = categoryBadges.values[index]
                    return (
                    <li key={category} className="flex justify-center items-center">
                        <button className="whitespace-nowrap active:bg-slate-400 bg-slate-200 text-slate-800 px-4 rounded-full flex justify-center items-center py-0 xs:py-[0.2rem] sm:py-0"
                        onClick={()=>handleCategory([value])}>
                            {category}
                        </button>
                    </li>
                    )
                })
                }
                </ul>
                <button className={`text-slate-200 text-3xl active:bg-slate-700 ${rightScroll ? 'opacity-100': 'opacity-0'}`}
                        onClick={() => handleScrollX(1)}>
                    <BiChevronRight/>
                </button>
            </nav>

            <div className={`h-40 bg-slate-500 text-white`}>
                My Portfolio Ad
            </div>
            
            <div className="py-2 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <FeatureFrame
                    sortBy="ratings|-1"
                    title="Top Rated Products"/>
                <FeatureFrame
                    sortBy="discount|-1"
                    title="Deals of the Day"/>
                <FeatureFrame
                    sortBy="date|-1"
                    title="New Arrivals"/>
                <div className="bg-slate-500 aspect-[5/6] text-xl text-white lg:hidden xl:block">
                    My portfolio ad
                </div>
            </div>
            
            <div className={`flex flex-col gap-y-2`}>
               {
                categoryBadges.strings.map((category,index) => (
                    <React.Fragment key={category}>
                        <ProductSlider 
                        title={category}
                        value={categoryBadges.values[index]}/>
                    </React.Fragment>
                ))
               }
            </div>
        </div>
    )
}
 
export default HomePage

