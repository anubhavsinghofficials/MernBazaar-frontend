import { syncFetchHighlights } from "@/Store/ServerStore/sync-Seller-Analytics"
import { AxiosError } from "axios"
import { FaShoppingCart, FaUsers, FaRupeeSign } from "react-icons/fa"
import { ImBinoculars } from "react-icons/im"
import { MdMenuBook } from "react-icons/md"
import { NavLink } from "react-router-dom"
import { sectionRefProps } from "../page-SellerAnalytics"



function AnalyticsHighlights(props:sectionRefProps) {

    const { revenueSectionRef } = props
    const { data, isLoading, isError, error } = syncFetchHighlights()

    if (isError) {
        const errorData = (error as AxiosError).response?.data
        console.log(errorData)
    }

    const handleClick = () => {
        window.scrollTo({top:revenueSectionRef.current?.offsetTop,behavior:"smooth"})
    }
     

    return (
        <div className={`flex flex-col gap-y-4 xs:gap-y-8`}
         >            
            <p className={`text-lg font-semibold py-4 flex items-center gap-x-3 px-4 bg-slate-700 text-white rounded-md`}>
               <ImBinoculars className={`text-base`}/>
               Highlights
            </p>
            <div className={`grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4`}>
               <NavLink
                    to={'/seller/products'}
                    className={`bg-orange-50 shadow-md hover:shadow-lg active:shadow-sm duration-100 cursor-pointer rounded-lg p-[3%] flex gap-x-4`}>
                  <div className={`bg-orange-500 text-white aspect-square h-full rounded-md flex justify-center items-center text-3xl`}>
                     <FaShoppingCart/>
                  </div>
                  <div className={`grow flex flex-col text-orange-800`}>
                     <p className={`text-base sm:text-sm md:text-base`}>
                        Products
                     </p>
                     <p className={`text-3xl sm:text-2xl md:text-3xl font-semibold grow`}>
                        {
                            isLoading
                            ? 'XXXXX'
                            : data.productsCount
                        }
                     </p>
                     <p
                        className={`text-sm opacity-70 hover:opacity-100 hover:text-orange-900 self-end`}>
                        view
                     </p>
                  </div>
               </NavLink>
               <NavLink
                    to={'/seller/users'}
                    className={`bg-yellow-50 shadow-md hover:shadow-lg active:shadow-sm duration-100 cursor-pointer rounded-lg p-[3%] flex gap-x-4`}>
                  <div className={`bg-yellow-500 text-white aspect-square h-full rounded-md flex justify-center items-center text-3xl`}>
                     <FaUsers/>
                  </div>
                  <div className={`grow flex flex-col text-yellow-800`}>
                     <p className={`text-base sm:text-sm md:text-base`}>
                        Users
                     </p>
                     <p className={`text-3xl sm:text-2xl md:text-3xl font-semibold grow`}>
                        {
                            isLoading
                            ? <span className={`animate-pulse`} >XXXXX</span>
                            : data.usersCount
                        }
                     </p>
                     <p className={`text-sm opacity-70 hover:opacity-100 hover:text-orange-900 self-end`}>
                        view
                     </p>
                  </div>
               </NavLink>
               <NavLink
                    to={'/seller/orders'}
                    className={`bg-sky-50 shadow-md hover:shadow-lg active:shadow-sm duration-100 cursor-pointer rounded-lg p-[3%] flex gap-x-4`}>
                  <div className={`bg-sky-500 text-white aspect-square h-full rounded-md flex justify-center items-center text-3xl`}>
                     <MdMenuBook/> 
                  </div>
                  <div className={`grow flex flex-col text-sky-800`}>
                     <p className={`text-base sm:text-sm md:text-base`}>
                        Orders
                     </p>
                     <p className={`text-3xl sm:text-2xl md:text-3xl font-semibold grow`}>
                        {
                            isLoading
                            ? <span className={`animate-pulse`} >XXXXX</span>
                            : data.ordersCount
                        }
                     </p>
                     <p className={`text-sm opacity-70 hover:opacity-100 hover:text-sky-900 self-end`}>
                        view
                     </p>
                  </div>
               </NavLink>
               <button className={`bg-green-50 shadow-md hover:shadow-lg active:shadow-sm duration-100 cursor-pointer rounded-lg p-[3%] flex gap-x-4 text-left`}
               onClick={handleClick}>
                  <div className={`bg-green-500 text-white aspect-square h-full rounded-md flex justify-center items-center text-3xl`}>
                     <FaRupeeSign/>
                  </div>
                  <div className={`grow flex flex-col text-green-800`}>
                     <p className={`text-base sm:text-sm md:text-base`}>
                        Revenue
                     </p>
                     <p className={`text-3xl sm:text-2xl md:text-3xl font-semibold grow`}>
                        {
                            isLoading
                            ? <span className={`animate-pulse`} >XXXXX</span>
                            : data.revenue
                        }
                     </p>
                     <p className={`text-sm opacity-70 hover:opacity-100 hover:text-green-900 self-end`}>
                        view
                     </p>
                  </div>
               </button>            
            </div>
        </div>   
    )
}
 
export default AnalyticsHighlights