import { syncFetchProducts } from "@/Store/ServerStore/sync-Products"
import { sortingBadges } from "@/Store/ClientStore/store-Constants"
import PageSlider_Lite from "@/components/PageSlider-Lite"
import NoProductsFound from "@/assets/noProductFound.png"
import { filterStore } from "@/Store/ClientStore/store-Filters"
import BadgePicker from "@/components/BadgePicker"
import { AxiosError } from "axios"
import { FaSort } from "react-icons/fa"
import { TbFaceIdError } from "react-icons/tb"
import DesktopFilters from "./components/DesktopFilters"
import MobileFilters from "./components/MobileFilters"
import ProductCard from "./components/ProductCard"
import ProductCardLoading from "./components/Loading-Ui/Loading-ProductCard"
import React, { useEffect, useRef } from "react"
import Ad_main from "./components/Ad_main"

function ProductsPage() {

  useEffect(()=>{
    window.scrollTo({ top: 0 })
  },[])
  
  const totalPagesRef = useRef(1)
  const { searchObject, setSearchObject, setResetPages } = filterStore()
  const { data, isLoading, isRefetching, isError, error, refetch } = syncFetchProducts(searchObject)

  const handlePage = (page: number) => {
    setSearchObject({ ...searchObject, pageNo: page })
  }

  const handleSort = (sorts: string[]) => {
    setSearchObject({ ...searchObject, sort: sorts[0] })
    setResetPages()
  }

  if (isError) {
    const errorData = (error as AxiosError).response?.data
    console.log(errorData)
  }

  if (data) {
    // this value of totalPages will be sent in the pageSlider
    // the reason we are not directly sending the data.totalProducts
    // /searchObject.pageLength is because data would come in and out
    // of existence while react query fetching & fetched
    const newTotal = data.totalProducts/searchObject.pageLength
    if (newTotal !== totalPagesRef.current) {
      totalPagesRef.current = newTotal
    }
  }

  return (
    <>
      <div className={`w-screen min-h-screen bg-slate-200 flex justify-center xxs:pt-12 sm:pt-14 sm:gap-x-2 lg:gap-x-4 xl:px-2 xl:pr-6 lg:pr-4`}>
        <div className="sticky top-16 self-start rounded-lg overflow-hidden hover:shadow-lg duration-100 mb-4">
          <div className={`h-[40rem] overflow-scroll overscroll-contain hide-scrollbar bg-white`}>
            <DesktopFilters />
            <div className={`h-20 w-full`} />
          </div>
          <div className="bg-gradient-to-b from-transparent to-white flex justify-center items-end font-bold py-1 gap-x-2 h-20 text-slate-600 absolute bottom-0 w-full">
            <p> Scroll </p>
            <div className={`text-xl`}>
              <FaSort />
            </div>
          </div>
        </div>

        <div className={`bg-slate-200 self-stretch mt-2 max-w-[80rem] grow flex flex-col min-w-0`}>
          <div className={`h-40 bg-slate-500 text-white hidden sm:block`}>
            <Ad_main isProductPage/>
          </div>

          <div className={`z-10 sticky top-14 xs:top-16 sm:top-14 shadow-lg`}>
            <div
              className={`bg-slate-800 sm:bg-slate-800 flex w-full md:justify-between sm:justify-end sm:scale-100 sm:relative justify-center items-center scale-105 fixed bottom-0 origin-bottom`}>
              <p className="text-slate-100 font-semibold pl-4 lg:text-base hidden md:block text-sm leading-4">
                {
                  data &&
                  `Showing ${(searchObject.pageNo-1)*searchObject.pageLength + 1} - ${Math.min(searchObject.pageNo*searchObject.pageLength, data.totalProducts)} out of ${data.totalProducts} results`
                }
              </p>
              <div className={`block xs:hidden m-1`}>
                <PageSlider_Lite
                  totalPages={totalPagesRef.current}
                  onPageChange={handlePage}
                  size="xs"
                  activeBgColor="bg-slate-200"
                  activeTextColor="text-slate-800"
                  passiveBgColor="bg-slate-800"
                  passiveTextColor="text-slate-200"
                  boxBgColor="bg-slate-800"
                  maxButtons={4}
                />
              </div>
              <div className={`hidden xs:block sm:hidden m-2`}>
                <PageSlider_Lite
                  totalPages={totalPagesRef.current}
                  onPageChange={handlePage}
                  size="md"
                  activeBgColor="bg-slate-200"
                  activeTextColor="text-slate-800"
                  passiveBgColor="bg-slate-800"
                  passiveTextColor="text-slate-200"
                  boxBgColor="bg-slate-800"
                  maxButtons={4}
                />
              </div>
              <div className={`hidden sm:block lg:hidden m-2`}>
                <PageSlider_Lite
                  totalPages={totalPagesRef.current}
                  onPageChange={handlePage}
                  size="xs"
                  activeBgColor="bg-slate-200"
                  activeTextColor="text-slate-800"
                  passiveBgColor="bg-slate-800"
                  passiveTextColor="text-slate-200"
                  boxBgColor="bg-slate-800"
                  maxButtons={4}
                />
              </div>
              <div className={`hidden lg:block`}>
                <PageSlider_Lite
                  totalPages={totalPagesRef.current}
                  onPageChange={handlePage}
                  size="sm"
                  activeBgColor="bg-slate-200"
                  activeTextColor="text-slate-800"
                  passiveBgColor="bg-slate-800"
                  passiveTextColor="text-slate-200"
                  boxBgColor="bg-slate-800"
                  maxButtons={4}
                  firstAndLast
                />
              </div>
            </div>
            <div className={`bg-slate-100 h-10 hidden sm:flex`}>
              <p className="text-black flex justify-center items-center w-20 font-bold text-sm">
                Sort By:
              </p>
              <BadgePicker
                badges={sortingBadges.values}
                customBadgeStrings={sortingBadges.strings}
                onSelect={handleSort}
                activeBgColor="bg-slate-600"
                passiveBgColor="bg-slate-200"
                activeTextColor="text-white"
                passiveTextColor="text-slate-800"
                containerLayout="hide-scrollbar overflow-x-scroll whitespace-nowrap lg:w-[40rem] md:w-[calc(100vw-19.5rem)] sm:w-[calc(100vw-16.5rem)] w-[calc(100vw-5rem)] flex items-center gap-x-4"
                badgeLayout="px-3 py-1 pb-[0.25rem] rounded-full xxs:text-xs font-bold inline-block"
              />
            </div>
          </div>

          <MobileFilters/>
          {
            !isError &&
            <div className={`h-40 bg-slate-500 text-white block sm:hidden`}>
              <Ad_main isProductPage/>
            </div>
          }

          <div className={`my-3 grid sm: gap-2 xl:gap-3 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xxs:grid-cols-2 bg-slate-200`}>
            {
              (isLoading || isRefetching) &&
              Array.from({ length: 10 }).map((_, index) => (
                <React.Fragment key={index}>
                    <ProductCardLoading />
                  </React.Fragment>
                ))
            }
            {
               data && data.products.length !== 0 &&
                data.products.map((product:any) => (
                  <React.Fragment key={product._id}>
                  <ProductCard  
                    title={product.title}
                    thumbnail={product.images.thumbnail.url}
                    actualPrice={product.price.actual}
                    discountedPrice={product.price.net}
                    discount={product.price.discount}
                    overallRating={product.overallRating}
                    productId={product._id}/>
                  </React.Fragment>
                ))
            }
          </div>
            
          {
            data && data.products.length === 0 &&
            <div className={`h-4/5 sm:h-4/5 text-slate-800 flex flex-col justify-center items-center sm:relative absolute w-full rel`}>
              <img
                src={NoProductsFound}
                alt="No Products Found"
                className="w-32 sm:w-48 aspect-square"
              />
              <p className="font-bold text-lg sm:text-2xl">
                No Products Found !!
              </p>
            </div>
          }

          {
            isError &&
            <div className={`h-4/5 sm:h-3/5 text-slate-600 flex flex-col justify-center items-center sm:relative absolute w-full`}>
              <div className={`flex gap-x-2 px-2 bg-slate-300 rounded-lg relative`}>
                <div className="text-8xl text-slate-600">
                  <TbFaceIdError/>
                </div>
                <div className="font-bold py-2 flex flex-col gap-y-2">
                  <p className="text-xl sm:text-2xl text-center text-slate-700">
                    An Error Occured!!
                  </p>
                  <button className="bg-slate-700 text-white w-full py-1 rounded-lg active:bg-slate-700 shadow-md active:shadow-none"
                  onClick={() => refetch()}>
                    Retry
                  </button>
                </div>
                <p className="absolute bottom-[-1rem] sm:right-4 right-0 text-base leading-4 text-center font-bold">
                    or try refreshing the page
                </p>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default ProductsPage
