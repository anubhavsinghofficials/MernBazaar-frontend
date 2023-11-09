
import { useEffect, useRef, useState } from "react"
import PageSlider_Lite from "@/components/PageSlider-Lite"
import { AxiosError } from "axios"
import { TbFaceIdError } from "react-icons/tb"
import NoProductsFound from "@/assets/NoProductFound.png"
import { syncFetchAllUsers } from "@/Store/ServerStore/sync-User"


export type searchUserFilterType = {
   pageNo      : number
   pageLength  : number
}


function SellerUsersPage() {
   
   useEffect(()=>{
      window.scrollTo({ top: 0 })
   },[])

   const [filter, setFilter] = useState<searchUserFilterType>({
      pageNo:1,
      pageLength:20
   })

   const { data, isError, error, isLoading, refetch } = syncFetchAllUsers(filter)
   const totalPagesRef = useRef(1)
   
   if (isError) {
      const errorData = (error as AxiosError).response?.data
      console.log(errorData)
    }
   
   const handlePage = (page: number) => {
      setFilter(prev => ({ ...prev, pageNo: page }))
   }  

   if (data) {
      const newTotal = data.userCount/filter.pageLength
      if (newTotal !== totalPagesRef.current) {
        totalPagesRef.current = newTotal
      }
    }



   return (
      <div className={`relative`}>
         <div className={`w-[98vw] md:w-[calc(100vw-19rem)] lg:w-[calc(100vw-28rem)]  max-w-[60rem] mx-auto overflow-x-auto overflow-y-scroll bg-white shadow-md rounded-lg relative h-[calc(100vh-8rem)] accordianScrollbar pb-12`}>
            <table className="w-full">
               <thead className="sticky top-0 z-10">
                  <tr className="bg-slate-700 text-slate-200"> 
                     <th
                     className="text-left sticky left-0 p-4 bg-slate-700">
                           SNo.
                     </th>
                     <th
                     className="text-left cursor-pointer">
                           Name
                     </th>
                     <th
                     className="text-left p-4">
                           Email
                     </th>
                     <th
                     className="text-left p-4">
                           Joined on
                     </th>
                  </tr>
               </thead>
               <tbody>
                     {
                        !isLoading &&
                        data.users.map((row:any,index:number) => (
                           <tr
                           key={row._id}
                           className="[&>*]:px-4 [&>*]:py-4 cursor-pointer relative"
                           >
                              <td className={`sticky left-0 bg-white w-10`}>
                                 {index+1+(filter.pageNo-1)*filter.pageLength}
                              </td>
                              <td>
                                 <p className={`whitespace-nowrap overflow-hidden text-ellipsis w-32 md:w-[10rem] xl:w-40`}>
                                    {row.name}
                                 </p>
                              </td>
                              <td>
                                 <p className={`line-clamp-2 md:w-80 xl:w-[24rem]`}>
                                    {row.email}
                                 </p>
                              </td>
                              <td className={`lg:w-40`}>
                                    {
                                       (()=>{
                                          const inputDate = new Date(row.joinedAt)
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
                  { 
                     (isLoading) &&
                     Array.from({length:20}).map((_,index)=>(
                        <tr
                        key={index}
                        className="[&>*]:px-4 [&>*]:py-4 group cursor-pointer">
                           <td className={`sticky left-0 bg-white`}>
                              {index+1}
                           </td>
                           <td>
                              <p className={`whitespace-nowrap overflow-hidden text-ellipsis bg-slate-300 rounded-md text-slate-300 animate-pulse line-clamp-2 w-32 md:w-[10rem] xl:w-40`}>
                                 Lorem ipsum asdfasdf
                              </p>
                           </td>
                           <td>
                              <p className="line-clamp-2 bg-slate-300 rounded-md text-slate-300 md:w-80 xl:w-[24rem] animate-pulse">
                                 Loremasfsdfipsumasdasdfasdf
                              </p>
                           </td>
                           <td>
                              <p className="line-clamp-2 bg-slate-300 rounded-md text-slate-300 lg:w-40 animate-pulse">
                                 23/12/2034 
                              </p>
                           </td>
                        </tr>
                     ))
                  }
                  {
                     data && data.users.length === 0 &&
                     <div className={`absolute w-full h-[90%]`}>
                        <div className={`h-4/5 sm:h-4/5 text-slate-800 flex flex-col justify-center items-center sm:relative absolute w-full rel`}>
                           <img
                              src={NoProductsFound}
                              alt="No Users Found"
                              className="w-32 sm:w-48 aspect-square"
                           />
                           <p className="font-bold text-lg sm:text-2xl">
                              No Users Found !!
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
         <div className={`absolute bottom-0 left-0 w-full flex`}>
            <div className={`block xs:hidden mx-auto`}>
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
            <div className={`hidden xs:block sm:hidden mx-auto`}>
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
            <div className={`hidden sm:block mx-auto`}>
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
 
export default SellerUsersPage