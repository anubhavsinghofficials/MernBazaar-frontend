import { searchOrdersFilterType } from "../page-SellerOrders"
import { useState } from "react"
import { syncFetchSellerOrders } from "@/Store/ServerStore/sync-Products"
import { AxiosError } from "axios"
import NoProductsFound from "@/assets/noProductFound.png"
import { TbFaceIdError } from "react-icons/tb"
import { MdMenuBook } from "react-icons/md"
import { NavLink } from "react-router-dom"




function AnalyticsOrders() {
    const [filter, _setFilter] = useState<searchOrdersFilterType>({
        orderStatus:null,
        sort:'createdAt|-1',
        pageNo:1,
        pageLength:3
     })
    const { data, isError, error, isLoading, refetch } = syncFetchSellerOrders(filter)

    if (isError) {
        const errorData = (error as AxiosError).response?.data
        console.log(errorData)
    }

    return (
        <div className={`flex flex-col gap-y-2 overflow-x-hidden relative`}
         >            
            <p className={`text-lg font-semibold py-4 flex items-center gap-x-3 px-4 bg-slate-700 text-white rounded-md`}>
               <MdMenuBook className={`text-xl`}/>
               Recent Orders
            </p>
            <table className="w-full overflow-hidden">
                <thead className="sticky top-0 z-10">
                    <tr className="bg-green-200 text-slate-700"> 
                        <th
                        className="text-left sticky left-0 p-4"
                            >
                            SNo.
                        </th>
                        <th
                        className="w-[16rem] text-left p-4">
                            Order Id
                        </th>
                        <th
                        className="w-[8rem] text-center lg:text-left cursor-pointer group"
                            >
                            Order Status
                        </th>
                        <th
                        className="w-[4rem] text-left cursor-pointer p-4"
                            >
                            Items
                        </th>
                        <th
                        className="w-[4rem] text-left cursor-pointer p-4"
                            >
                            Amount
                        </th>
                        <th
                        className={`whitespace-nowrap text-left cursor-pointer p-4 w-[5.2]rem]`}
                            >
                            Created at
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && !isLoading &&
                        data.orders.map((row:any,index:number) => (
                            <tr
                            key={row._id}
                            className="[&>*]:px-4 [&>*]:py-4 group cursor-pointer relative"
                            >
                            <td className={`sticky left-0 bg-white w-6`}>
                                { index+1+(filter.pageNo-1)*filter.pageLength }
                            </td>
                            <td>
                                <p className={`w-20 overflow-hidden text-ellipsis xs:w-auto`}>
                                    {row._id}
                                </p>
                            </td>
                            <td>
                                <p className={` ${row.orderStatus === 'pending' && 'bg-red-100'} ${row.orderStatus === 'shipped' && 'bg-sky-100'} ${row.orderStatus === 'delivered' && 'bg-green-100'} py-1 text-center rounded-lg text-sm text-slate-800 font-semibold px-1 xs:px-2 w-[8rem]`}>
                                    {row.orderStatus}
                                </p>
                            </td>
                            <td className={`w-[4rem]`}>
                                {row.totalItems}
                            </td>
                            <td className={`w-[4rem]`}>
                                {row.totalPrice}
                            </td>
                            <td className={`w-[5.2rem]`}>
                                {
                                    (()=>{
                                        const inputDate = new Date(row.createdAt)
                                        const date = inputDate.getDate()
                                        const month = inputDate.getMonth()
                                        const year = inputDate.getFullYear()
                                        return `${date}/${month+1}/${year}` 
                                    })()
                                }
                            </td>
                            </tr>
                        ))
                        
                    }
                    { isLoading &&
                        Array.from({length:3}).map((_,index)=>(
                            <tr
                            key={index}
                            className="[&>*]:px-4 [&>*]:py-4 group cursor-pointer hover:bg-slate-100 relative"
                            >
                            <td className={`sticky left-0 bg-white group-hover:bg-slate-100 w-6`}>
                                <p className={`bg-slate-300 text-slate-300 rounded-md animate-pulse`}>
                                    100
                                </p>
                            </td>
                            <td>
                                <div className="line-clamp-1 w-[16rem] bg-slate-300 text-slate-300 animate-pulse">
                                    64ef31be0c869d9c2a1f7447
                                </div>
                            </td>
                            <td>
                                <p className={` bg-slate-300 text-slate-300 py-1 text-center rounded-lg text-sm font-semibold px-2 w-[8rem] animate-pulse`}>
                                    delivered
                                </p>
                            </td>
                            <td className={`w-[4rem]`}>
                                <span className={`bg-slate-300 text-slate-300 animate-pulse`}>
                                    999
                                </span>
                            </td>
                            <td className={`w-[4rem]`}>
                                <span className={`bg-slate-300 text-slate-300 animate-pulse`}>
                                    99999
                                </span>
                            </td>
                            <td className={`w-[5.2rem]`}>
                                <span className={`bg-slate-300 text-slate-300 animate-pulse`}>
                                    29/12/2084
                                </span>
                            </td>
                            </tr>
                        ))
                    }
                    {
                        data && data.orders.length === 0 &&
                        <div className={`absolute w-full h-[90%]`}>
                            <div className={`h-4/5 sm:h-4/5 text-slate-800 flex flex-col justify-center items-center sm:relative absolute w-full rel`}>
                            <img
                                src={NoProductsFound}
                                alt="No Products Found"
                                className="w-32 sm:w-48 aspect-square"
                            />
                            <p className="font-bold text-lg sm:text-2xl">
                                No Orders Found !!
                            </p>
                            </div>
                        </div>
                    }

                    {
                        isError &&
                        <div className={`absolute w-full h-[90%]`}>
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
                        </div>

                    }
                </tbody>
            </table>
            <NavLink
                to={'/seller/orders'}
                className={`whitespace-nowrap text-green-600 hover:text-green-900 absolute bottom-0 bg-gradient-to-b from-transparent to-70% to-white pt-9 w-full text-center text-lg`}>
                View all orders
            </NavLink>
            
        </div>
    )
}
 
export default AnalyticsOrders
