
import { useEffect, useRef, useState } from "react"
import PageSlider_Lite from "@/components/PageSlider-Lite"
import { syncChangeOrderStatus, syncFetchSellerOrders } from "@/Store/ServerStore/sync-Products"
import { AxiosError } from "axios"
import { TbFaceIdError } from "react-icons/tb"
import NoProductsFound from "@/assets/NoProductFound.png"
import { NavLink } from "react-router-dom"

export type orderStatusType = "delivered" | "shipped" | "pending" 
type sortValuesType  = "totalItems" | "totalPrice" | "createdAt"
type sortType  = "totalItems|1" | "totalItems|-1" | "totalPrice|1" | "totalPrice|-1" | "createdAt|1" | "createdAt|-1"
export type orderUpdateType = {
     orderId:string
     orderStatus:orderStatusType
}
export type searchOrdersFilterType = {
   sort        : sortType | null
   orderStatus : orderStatusType | null
   pageNo      : number
   pageLength  : number
}


function SellerOrdersPage() {
   
   useEffect(()=>{
      window.scrollTo({ top: 0 })
   },[])

   const [filter, setFilter] = useState<searchOrdersFilterType>({
      orderStatus:null,
      sort:'createdAt|-1',
      pageNo:1,
      pageLength:20
   })
   const [disableStatusButton, setDisableStatusButton] = useState(false)
   const { data, isError, error, isLoading, refetch } = syncFetchSellerOrders(filter)
   const { mutate } = syncChangeOrderStatus(setDisableStatusButton)
   const updatedIndexRef = useRef(0)
   const totalPagesRef = useRef(1)

   if (isError) {
      const errorData = (error as AxiosError).response?.data
      console.log(errorData)
    }
    
   const handleOrderStatusChange = (newOrderStatus:orderStatusType, id:string,index:number) => {
      setDisableStatusButton(true)
      updatedIndexRef.current = index
      mutate({orderId:id, orderStatus:newOrderStatus})
   }
   
   const handlePage = (page: number) => {
      setFilter(prev => ({...prev, pageNo: page}))
   }  

   if (data) {
      const newTotal = data.totalOrders/filter.pageLength
      if (newTotal !== totalPagesRef.current) {
        totalPagesRef.current = newTotal
      }
    }

   const handleOrderStatus = (orderStatus:orderStatusType | '#') => {
      if (orderStatus !== '#') {
         setFilter(prev=>({...prev,orderStatus}))
      } else {
         setFilter(prev=> ({...prev,orderStatus:null}))
      }
   }

   const handleSort = (sort:sortValuesType) => {
       if (sort==='totalItems') {
           if (filter.sort === 'totalItems|-1') {
               setFilter(prev=> ({...prev,sort:'totalItems|1'}))
            } else {
               setFilter(prev=> ({...prev,sort:'totalItems|-1'}))
           }
       } else if (sort==='totalPrice') {
            if (filter.sort === 'totalPrice|-1') {
               setFilter(prev=> ({...prev,sort:'totalPrice|1'}))
            } else {
               setFilter(prev=> ({...prev,sort:'totalPrice|-1'}))
           }
       } else if (sort==='createdAt') {
            if (filter.sort === 'createdAt|-1') {
               setFilter(prev=> ({...prev,sort:'createdAt|1'}))
            } else {
               setFilter(prev=> ({...prev,sort:'createdAt|-1'}))
           }
       }
   }

   return (
      <div className={`relative pb-4 shadow-md rounded-lg bg-white`}>
         <div className={`w-[98vw] md:w-[calc(100vw-19rem)] lg:w-[calc(100vw-20rem)] xl:w-[calc(100vw-22rem)] max-w-[74rem] mx-auto overflow-x-auto overflow-y-scroll bg-white relative lg:mr-3 h-[calc(100vh-8rem)] accordianScrollbar pb-8`}>
            <table className="w-full">
               <thead className="sticky top-0 z-10">
                  <tr className="bg-slate-700 text-slate-200"> 
                     <th
                     className="text-left sticky left-0 bg-slate-700 p-4"
                        >
                           SNo.
                     </th>
                     <th
                     className="w-[16rem] text-left p-4">
                           Order Id
                     </th>
                     <th
                     className="w-[8rem] text-left hover:bg-slate-800 cursor-pointer group"
                        >
                        <select
                           className="w-full bg-slate-700 p-4 group-hover:bg-slate-800"
                           defaultValue={'#'}
                           onChange={(e)=>handleOrderStatus(e.target.value as orderStatusType | '#' )}
                           >
                           <option value={'#'}> Order Status </option>
                           <option value={'pending'}>pending</option>
                           <option value={'shipped'}>shipped</option>
                           <option value={'delivered'}>delivered</option>
                        </select>
                     </th>
                     <th
                     className="w-[4rem] text-left hover:bg-slate-800 cursor-pointer p-4"
                        onClick={()=>handleSort('totalItems')}
                        >
                           Items
                     </th>
                     <th
                     className="w-[4rem] text-left hover:bg-slate-800 cursor-pointer p-4"
                        onClick={()=>handleSort('totalPrice')}
                        >
                           Amount
                     </th>
                     <th
                     className={`whitespace-nowrap text-left hover:bg-slate-800 cursor-pointer p-4 w-[5.2]rem]`}
                        onClick={()=>handleSort('createdAt')}
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
                        className="[&>*]:px-4 [&>*]:py-4 group cursor-pointer hover:bg-slate-100 relative"
                        >
                           <td className={`sticky left-0 bg-white group-hover:bg-slate-100 w-6`}>
                              { index+1+(filter.pageNo-1)*filter.pageLength }
                           </td>
                           <td>
                              <NavLink to={`/seller/order/${row._id}`} className="line-clamp-1 w-[16rem] hover:text-lime-800">
                                 {row._id}
                              </NavLink>
                           </td>
                           <td>
                           {
                              disableStatusButton && updatedIndexRef.current === index
                              ?
                              <p className={` bg-slate-300 text-slate-300 py-1 text-center rounded-lg text-sm font-semibold px-2 w-[8rem] animate-pulse`}>
                                 delivered
                              </p>
                              :
                              <p className={` ${row.orderStatus === 'pending' && 'bg-red-200'} ${row.orderStatus === 'shipped' && 'bg-sky-200'} ${row.orderStatus === 'delivered' && 'bg-green-200'} py-1 text-center rounded-lg text-sm text-slate-800 font-semibold px-2 w-[8rem]`}>
                                 {

                                 row.orderStatus !== 'delivered'
                                 ?
                                 <select
                                    className={`w-full text-center ${row.orderStatus === 'pending' && 'bg-red-200'} ${row.orderStatus === 'shipped' && 'bg-sky-200'} ${row.orderStatus === 'delivered' && 'bg-green-200'}`}
                                    defaultValue={row.orderStatus}
                                    onChange={(e)=>handleOrderStatusChange(e.target.value as orderStatusType, row._id, index )}
                                    disabled={row.orderStatus === 'delivered'}
                                    >
                                    {
                                       row.orderStatus === 'pending' &&
                                       <>
                                          <option value={'pending'} disabled>
                                             pending
                                          </option>
                                          <option value={'shipped'}>shipped</option>
                                          <option value={'delivered'}>delivered</option>
                                       </>
                                    }
                                    {
                                       row.orderStatus === 'shipped' &&
                                       <>
                                          <option value={'shipped'} disabled>
                                             shipped
                                          </option>
                                          <option value={'delivered'}>delivered</option>
                                       </>
                                    }
                                 </select>
                                 :
                                    'delivered'
                                 }
                              </p>
                           }
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
                     Array.from({length:20}).map((_,index)=>(
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
                              <NavLink
                              to={`#`}
                              className="line-clamp-1 w-[16rem] bg-slate-300 text-slate-300 animate-pulse">
                                 64ef31be0c869d9c2a1f7447
                              </NavLink>
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
         </div>
         <div className={`absolute w-fit bottom-0 left-0 flex`}>
            <div className={`block xs:hidden`}>
               <PageSlider_Lite
                  totalPages={totalPagesRef.current}
                  onPageChange={handlePage}
                  size={'xs'}
                  activeBgColor="bg-slate-300"
                  activeTextColor="text-slate-800"
                  passiveBgColor="bg-slate-700"
                  passiveTextColor="text-slate-300"
                  boxBgColor="bg-slate-700"
                  maxButtons={4}
                  />
            </div>
            <div className={`hidden xs:block sm:hidden`}>
               <PageSlider_Lite
                  totalPages={totalPagesRef.current}
                  onPageChange={handlePage}
                  size={'md'}
                  activeBgColor="bg-slate-300"
                  activeTextColor="text-slate-800"
                  passiveBgColor="bg-slate-700"
                  passiveTextColor="text-slate-300"
                  boxBgColor="bg-slate-700"
                  maxButtons={4}
                  />
            </div>
            <div className={`hidden sm:block`}>
               <PageSlider_Lite
                  totalPages={totalPagesRef.current}
                  onPageChange={handlePage}
                  size={'sm'}
                  activeBgColor="bg-slate-300"
                  activeTextColor="text-slate-800"
                  passiveBgColor="bg-slate-700"
                  passiveTextColor="text-slate-300"
                  boxBgColor="bg-slate-700"
                  maxButtons={4}
                  firstAndLast
                  />
            </div>
         </div>
      </div>

   )
}
 
export default SellerOrdersPage





