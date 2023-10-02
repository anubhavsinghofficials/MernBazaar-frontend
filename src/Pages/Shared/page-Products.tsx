import { syncFetchProducts } from "@/Store/ServerStore/store-Products"
import { filterStore } from "@/Store/ClientStore/store-Filters"
import { AxiosError } from "axios"
import { FaSort } from "react-icons/fa"
import { TbFaceIdError } from "react-icons/tb"
import DesktopFilters from "./components/DesktopFilters"
import MobileFilters from "./components/MobileFilters"
import { sortingBadges } from "@/Store/ClientStore/store-Constants"
import BadgePicker from "@/components/BadgePicker"
import ProductCard from "./components/ProductCard"
import ProductCardLoading from "./components/ProductCard-Loading"
import React from "react"
import PageSlider_Lite from "@/components/PageSlider-Lite"
import noProductsFound from "@/assets/noProductFound3.png"

function ProductsPage() {
  const { searchObject, setSearchObject, resetBadgeToken } = filterStore()

  const handlePage = (page: number) => {
    setSearchObject({ ...searchObject, pageNo: page })
  }
  const handleSort = (sorts: string[]) => {
    setSearchObject({ ...searchObject, sort: sorts[0] })
  }

  const { data,isError, error } = syncFetchProducts(searchObject)

  if (isError) {
    const errorData = (error as AxiosError).response?.data
    console.log(errorData)
    // return <div>Error Occured</div>

    // ye dhang se karo error show.. user friendly
  }

  return (
    <>
      <div
        className={`w-screen min-h-screen bg-gray-200 flex justify-center xxs:pt-12 sm:pt-14 sm:gap-x-2 lg:gap-x-4 xl:px-2 xl:pr-6 lg:pr-4`}>
        <div className="sticky top-16 self-start rounded-lg overflow-hidden hover:shadow-lg duration-100">
          <div
            className={`h-[40rem] overflow-scroll overscroll-contain hide-scrollbar bg-white`}>
            <DesktopFilters/>
            <div className={`h-20 w-full`} />
          </div>
          <div className="bg-gradient-to-b from-transparent to-white via-[#ffffffc7] flex justify-center items-end font-bold py-1 gap-x-2 h-20 text-slate-600 absolute bottom-0 w-full">
            <p> Scroll </p>
            <div className={`text-xl`}>
              <FaSort />
            </div>
          </div>
        </div>

        <div className={`bg-slate-200 self-stretch mt-2 max-w-[80rem] grow flex flex-col min-w-0`}>
          <div className={`h-20 bg-slate-500 text-white hidden sm:block`}>
            My Portfolio Ad
          </div>

          <div className={`z-10 sticky top-14 xs:top-16 sm:top-14 shadow-lg`}>
            <div
              className={`bg-slate-600 sm:bg-slate-100 flex w-full md:justify-between sm:justify-end sm:scale-100 sm:relative justify-center items-center scale-105 fixed bottom-0 origin-bottom`}>
              <p className="text-slate-800 font-semibold pl-4 lg:text-base hidden md:block text-sm leading-4">
                {
                  data &&
                  `Showing ${(searchObject.pageNo-1)*searchObject.pageLength + 1} - ${searchObject.pageNo*searchObject.pageLength} out of ${data.totalProducts} results`
                }
              </p>
              <div className={`block xs:hidden m-1`}>
                <PageSlider_Lite
                  totalPages={data ? data.totalProducts/searchObject.pageLength : 1}
                  onPageChange={handlePage}
                  size="xs"
                  activeBgColor="bg-slate-200"
                  activeTextColor="text-slate-800"
                  passiveBgColor="bg-slate-600"
                  passiveTextColor="text-gray-200"
                  boxBgColor="bg-slate-600"
                  maxButtons={4}
                />
              </div>
              <div className={`hidden xs:block sm:hidden m-2`}>
                <PageSlider_Lite
                  totalPages={data ? data.totalProducts/searchObject.pageLength : 1}
                  onPageChange={handlePage}
                  size="md"
                  activeBgColor="bg-slate-200"
                  activeTextColor="text-slate-800"
                  passiveBgColor="bg-slate-600"
                  passiveTextColor="text-gray-200"
                  boxBgColor="bg-slate-600"
                  maxButtons={4}
                />
              </div>
              <div className={`hidden sm:block lg:hidden m-2`}>
                <PageSlider_Lite
                  totalPages={data ? data.totalProducts/searchObject.pageLength : 1}
                  onPageChange={handlePage}
                  size="xs"
                  activeBgColor="bg-slate-500"
                  activeTextColor="text-white"
                  passiveBgColor="bg-white"
                  passiveTextColor="text-gray-500"
                  boxBgColor="bg-white"
                  maxButtons={4}
                />
              </div>
              <div className={`hidden lg:block`}>
                <PageSlider_Lite
                  totalPages={data ? data.totalProducts/searchObject.pageLength : 1}
                  onPageChange={handlePage}
                  size="sm"
                  activeBgColor="bg-slate-500"
                  activeTextColor="text-white"
                  passiveBgColor="bg-white"
                  passiveTextColor="text-gray-500"
                  boxBgColor="bg-white"
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
                activeBgColor="bg-white"
                passiveBgColor="bg-gray-400"
                activeTextColor="text-slate-600"
                passiveTextColor="text-white"
                containerLayout="hide-scrollbar overflow-x-scroll whitespace-nowrap lg:w-[40rem] md:w-[calc(100vw-19.5rem)] sm:w-[calc(100vw-16.5rem)] w-[calc(100vw-5rem)] flex items-center gap-x-4"
                badgeLayout="px-3 py-1 pb-[0.25rem] rounded-full xxs:text-xs font-bold inline-block"
                resetBadgeToken={resetBadgeToken}
              />
            </div>
          </div>

          <MobileFilters />

          <div className={`my-3 grid sm: gap-2 xl:gap-3 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xxs:grid-cols-2 bg-slate-200`}>
            {
               data && !isError
              ?
                data.products.map((product:any) => (
                  <React.Fragment key={product._id}>
                  <ProductCard 
                    title={product.title}
                    thumbnail={product.images.thumbnail}
                    actualPrice={product.price.actual}
                    discountedPrice={product.price.net}
                    discount={product.price.discount}
                    overallRating={product.overallRating}/>
                  </React.Fragment>
                ))
              : 
                Array.from({ length: 10 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <ProductCardLoading />
                  </React.Fragment>
                ))
            }

          </div>
            
          {
            data && data.products.length === 0 &&
            <div className={`h-3/5 sm:h-4/5 text-slate-800 flex flex-col justify-center items-center sm:relative absolute w-full`}>
              <img
                src={noProductsFound}
                alt="No Products Found"
                className="w-32 sm:w-48 aspect-square"
              />
              <p className="font-bold text-lg sm:text-2xl">
                No Products Found !!
              </p>
            </div>
          }

          {
            // isError &&
            <div className={`h-3/5 sm:h-4/5 text-slate-800 flex flex-col justify-center items-center sm:relative absolute w-full`}>
              <div>
                <TbFaceIdError/>
              </div>
              <p className="font-bold text-lg sm:text-2xl">
                An Error Occured !!
              </p>
            </div>
          }
        </div>
      </div>

      <div className={`xxs:sticky xxs:top-14 sm:relative sm:top-0 bg-slate-400 h-8 sm:h-6 md:h-8 lg:h-10`}/>

      <div className={`h-[10rem] bg-blue-400`} />
    </>
  )
}

export default ProductsPage
