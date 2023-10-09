import GithubBg from '@/assets/GithubBg.gif'
import { useScrollEffect } from "@/Hooks/useScrollEffect";
import { filterStore } from "@/Store/ClientStore/store-Filters"
import SearchBar, { searchValues } from "@/components/searchBar"
import { categoryBadges, defaultValues, myGitHub } from "@/Store/ClientStore/store-Constants"
import { useNavigate } from "react-router-dom"
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import React, { useRef } from "react";
import ProductSlider from "./components/ProductSlider";
import FeatureFrame from "./components/FeatureFrame";
import Ad_main from "./components/Ad_main";
import { AiFillGithub } from "react-icons/ai";


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

            <div className={`grow px-2 pl-4 bg-slate-800 self-stretch flex justify-center py-2 sm:hidden sticky top-14 xs:top-16 h-12 xs:h-14 sm:h-12 z-20`}>
                <SearchBar
                    onSearch={handleSearch}
                    placeHolder="Search Products"
                />
            </div>

            <nav className="sm:sticky sm:top-14 xs:top-4 relative top-2 h-8 xs:h-10 flex justify-center flex-nowrap cursor-pointer bg-slate-800 z-10 mb-2 xs:mb-4 sm:mb-0">
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
                    <li key={category} className="flex justify-center">
                        <button className="whitespace-nowrap active:bg-slate-700 text-slate-200 px-4 flex justify-center items-center py-0 xs:py-[0.2rem] sm:py-0 xs:text-lg sm:text-base"
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

            <Ad_main/>
            
            <div className="p-4 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-gradient-to-b from-black to-transparent">
                <FeatureFrame
                    sortBy="ratings|-1"
                    title="Top Rated Products"
                    iconTag="rating"/>
                <FeatureFrame
                    sortBy="discount|-1"
                    title="Deals of the Day"
                    iconTag="discount"/>
                <FeatureFrame
                    sortBy="date|-1"
                    title="New Arrivals"
                    iconTag="date"/>
                <div className="bg-white aspect-[6/7] text-lg lg:hidden xl:block p-[0.2rem] relative rounded-lg">
                    <div className={`bg-black h-full rounded-xl`}>
                    <img
                        className="object-cover w-full h-full rounded-lg opacity-50"
                        src={GithubBg}
                        alt="GithubBg" />
                    </div>
                    <div className={`absolute w-full h-full top-0 left-0 flex justify-center items-center flex-col`}>
                        <AiFillGithub className='text-red-700 opacity-40 absolute text-9xl scale-[2]'/>
                        <p className="flex gap-x-2 items-center text-red-400 font-Roboto z-[1] leading-4 text-xl font-semibold">
                            <AiFillGithub className='inline text-2xl'/>
                            View Source Code 
                        </p>
                        
                        <a className="px-4 rounded-lg w-3/5 text-ellipsis whitespace-nowrap overflow-hidden text-slate-200 font-Roboto hover:shadow-md shadow-red-400 hover:text-white duration-100 z-[1] group"
                          target="_blank"
                          href={myGitHub}>
                            <BiChevronRight className='inline text-3xl text-white animate-hoverWaveLR pb-1'/>
                            {myGitHub} 
                        </a>
                    </div>
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

