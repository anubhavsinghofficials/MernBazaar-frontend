import { useEffect, useRef, useState } from "react"
import PageSlider_Lite from "@/components/PageSlider-Lite"
import { categoryBadges } from "@/Store/ClientStore/store-Constants"
import { syncDeleteProduct, syncFetchSellerProducts } from "@/Store/ServerStore/sync-Products"
import { AxiosError } from "axios"
import { TbFaceIdError } from "react-icons/tb"
import NoProductsFound from "@/assets/noProductFound.png"
import { AiFillDelete } from "react-icons/ai"
import { NavLink } from "react-router-dom"


type categoryType = typeof categoryBadges.values
type sortValuesType  = "price" | "discount" | "stock" | "ratings" | "createdAt"
type sortType  = "price|1" | "price|-1" | "discount|1" | "discount|-1" | "stock|1" |
                 "stock|-1" | "ratings|1" | "ratings|-1" | "createdAt|1" | "createdAt|-1"
export type searchFilterType = {
   category    : categoryType | null
   sort        : sortType | null
   pageNo      : number
   pageLength  : number
}
type productType = {
   _id: string;
   title: string;
   category: categoryType;
   createdAt: string;
   overallRating: number;
   stock: number;
   price: {
     actual: number;
     discount: number;
     net: number;
   };
 }



function SellerProducts() {
   
   useEffect(()=>{
      window.scrollTo({ top: 0 })
   },[])

   const [filter, setFilter] = useState<searchFilterType>({
      category:null,
      sort:'createdAt|-1',
      pageNo:1,
      pageLength:20
   })
   const [disableDeleteButton, setDisableDeleteButton] = useState(false)
   const { data, isError, error, isLoading, refetch } = syncFetchSellerProducts(filter)
   const { mutate } = syncDeleteProduct(setDisableDeleteButton)
   const deletionIndexRef = useRef(0)
   const totalPagesRef = useRef(1)

   
   if (isError) {
      const errorData = (error as AxiosError).response?.data
      console.log(errorData)
    }
    
   const handleDelete = (id:string,index:number) => {
      setDisableDeleteButton(true)
      deletionIndexRef.current = index
      mutate(id)
   }
   
   const handlePage = (page: number) => {
      setFilter(prev => ({ ...prev, pageNo: page }))
   }  

   if (data) {
      // this value of totalPages will be sent in the pageSlider
      // the reason we are not directly sending the data.totalProducts
      // /searchObject.pageLength is because data would come in and out
      // of existence while react query fetching & fetched
      const newTotal = data.totalProducts/filter.pageLength
      if (newTotal !== totalPagesRef.current) {
        totalPagesRef.current = newTotal
      }
    }

   const handleCategory = (category:categoryType | '#') => {
      if (category !== '#') {
         setFilter(prev=>({...prev,category}))
      } else {
         setFilter(prev=> ({...prev,category:null}))
      }
   }

   const handleSort = (sort:sortValuesType) => {
       if (sort==='price') {
           if (filter.sort === 'price|-1') {
               setFilter(prev=> ({...prev,sort:'price|1'}))
            } else {
               setFilter(prev=> ({...prev,sort:'price|-1'}))
           }
       } else if (sort==='discount') {
            if (filter.sort === 'discount|-1') {
               setFilter(prev=> ({...prev,sort:'discount|1'}))
            } else {
               setFilter(prev=> ({...prev,sort:'discount|-1'}))
           }
       } else if (sort==='stock') {
            if (filter.sort === 'stock|-1') {
               setFilter(prev=> ({...prev,sort:'stock|1'}))
            } else {
               setFilter(prev=> ({...prev,sort:'stock|-1'}))
           }
       } else if (sort==='ratings') {
            if (filter.sort === 'ratings|-1') {
               setFilter(prev=> ({...prev,sort:'ratings|1'}))
            } else {
               setFilter(prev=> ({...prev,sort:'ratings|-1'}))
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
      <div className={`relative`}>
         <div className={`w-[98vw] md:w-[calc(100vw-19rem)] lg:w-[calc(100vw-20rem)] xl:w-[calc(100vw-22rem)] max-w-[74rem] mx-auto overflow-x-auto overflow-y-scroll bg-white shadow-md rounded-lg relative lg:mr-3 h-[calc(100vh-8rem)] accordianScrollbar pb-12`}>
            <table className="w-full">
               <thead className="sticky top-0 z-10">
                  <tr className="bg-slate-700 text-slate-200"> 
                     <th
                     className="text-left sticky left-0 bg-slate-700 p-4"
                        >
                           SNo.
                     </th>
                     <th
                     className="w-[10rem] xs:w-[14rem] lg:w-[18rem] text-left p-4">
                           Title
                     </th>
                     <th
                     className="text-left hover:bg-slate-800 cursor-pointer group"
                        >
                           <select
                              className="w-full bg-slate-700 p-4 group-hover:bg-slate-800"
                              defaultValue={'#'}
                              onChange={(e)=>handleCategory(e.target.value as categoryType | '#' )}
                              >
                              <option value={'#'}>
                                 Category
                              </option>
                              {
                                 categoryBadges.values.map(category=>(
                                    <option
                                       key={category}
                                       value={category}>
                                       {category}
                                    </option>
                                 ))
                              }
                           </select>
                     </th>
                     <th
                     className="text-left hover:bg-slate-800 cursor-pointer p-4"
                        onClick={()=>handleSort('price')}
                        >
                           Price
                     </th>
                     <th
                     className="text-left hover:bg-slate-800 cursor-pointer p-4"
                        onClick={()=>handleSort('discount')}
                        >
                           Discount
                     </th>
                     <th
                     className="text-left hover:bg-slate-800 cursor-pointer p-4"
                        onClick={()=>handleSort('stock')}
                        >
                           Stock
                     </th>
                     <th
                     className="text-left hover:bg-slate-800 cursor-pointer p-4"
                        onClick={()=>handleSort('ratings')}
                        >
                           Ratings
                     </th>
                     <th
                     className={`whitespace-nowrap text-left hover:bg-slate-800 cursor-pointer p-4`}
                        onClick={()=>handleSort('createdAt')}
                        >
                           Created at
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {
                     data && !isLoading &&
                     (data.products as productType[]).map((row,index) => (
                        <tr
                        key={row._id}
                        className="[&>*]:px-4 [&>*]:py-4 group cursor-pointer hover:bg-green-100 relative"
                        >
                           <td className={`sticky left-0 bg-white group-hover:hidden`}>
                              {
                                 disableDeleteButton && deletionIndexRef.current === index
                                 ? <span className={`w-3 h-3 mb-1 rounded-full border-b-slate-200 border-l-white border-[0.2rem] border-slate-800 animate-spin inline-block`}/>
                                 : index+1+(filter.pageNo-1)*filter.pageLength
                              }
                           </td>
                           <td className={`sticky left-0 bg-green-100 group-hover:block hidden text-slate-500`}
                           onClick={()=>handleDelete(row._id,index)}>
                              {
                                 disableDeleteButton && deletionIndexRef.current === index
                                 ? <span className={`w-3 h-3 mb-1 rounded-full border-b-slate-200 border-l-white border-[0.2rem] border-slate-800 animate-spin inline-block`}/>
                                 : <AiFillDelete className={`duration-75 hover:text-red-700 rounded-full active:bg-red-200`}/>
                              }
                           </td>
                           <td>
                              <NavLink to={`/seller/product/${row._id}`} className="line-clamp-2 w-[10rem] xs:w-[14rem] lg:w-[24rem] hover:text-lime-800">
                                 {row.title}
                              </NavLink>
                           </td>
                           <td>
                                 {row.category}
                           </td>
                           <td className={`w-[4rem]`}>
                                 {row.price.net}
                           </td>
                           <td>
                                 {row.price.discount}
                           </td>
                           <td className={`w-[4rem]`}>
                                 {row.stock}
                           </td>
                           <td>
                                 {row.overallRating}
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
                  { (isLoading) &&
                     Array.from({length:20}).map((_,index)=>(
                        <tr
                        key={index}
                        className="[&>*]:px-4 [&>*]:py-4 group cursor-pointer">
                           <td className={`sticky left-0 bg-white`}>
                              {index+1}
                           </td>
                           <td>
                              <p className="line-clamp-2 bg-slate-300 rounded-md text-slate-300 animate-pulse w-[10rem] xs:w-[14rem] lg:w-[24rem]">
                                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil unt quia nam deserunt consectetur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, maiores. 
                              </p>
                           </td>
                           <td>
                              <span className={`bg-slate-300 rounded-md text-slate-300 animate-pulse`}>
                                 Lorem ipsum loo
                              </span>
                           </td>
                           <td>
                              <span className={`w-[4rem] bg-slate-300 rounded-md text-slate-300 animate-pulse`}>
                                 999999
                              </span>
                           </td>
                           <td>
                              <span className={`bg-slate-300 rounded-md text-slate-300 animate-pulse`}>
                                 999
                              </span>
                           </td>
                           <td>
                              <span className={`w-[4rem] bg-slate-300 rounded-md text-slate-300 animate-pulse`}>
                                 9999
                              </span>
                           </td>
                           <td>
                              <span className={`bg-slate-300 rounded-md text-slate-300 animate-pulse`}>
                                 5.5
                              </span>
                           </td>
                           <td>
                              <span className={`w-[5.2rem] bg-slate-300 rounded-md text-slate-300 animate-pulse`}>
                                 27/12/7077
                              </span>
                           </td>
                        </tr>
                     ))
                  }
                  {
                     data && data.products.length === 0 &&
                     <div className={`absolute w-full h-[90%]`}>
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
 
export default SellerProducts





