import { useScrollEffect } from "@/Hooks/useScrollEffect"
import { categoryBadges } from "@/Store/ClientStore/store-Constants"
import { syncFetchInventory } from "@/Store/ServerStore/sync-Seller-Analytics"
import { AxiosError } from "axios"
import { useEffect, useRef, useState } from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { MdFactory } from "react-icons/md"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'



function AnalyticsInventory() {
   const categoryBarRef = useRef<HTMLDivElement | null>(null)
   const { data, isLoading, isError, error } = syncFetchInventory()
   const { handleScrollX, leftScroll, rightScroll } = useScrollEffect({scrollBy:100,scrollPadRef:categoryBarRef})

   const [products, setProducts] = useState(0)
   const [inStock, setInStock] = useState(0)
   const [outOfStock, setOutOfStock] = useState(0)
   const [pieChartData, setPieChartData] = useState<{name:string, value:number}[]>([])

   useEffect(()=>{
        if (data) {
            let inStock = 0, outOfStock = 0, products = 0
            data.inventory.forEach((element:any) => {
                inStock += element.inStock
                outOfStock += element.outOfStock
                products += element.inStock + element.outOfStock
            })

            const pieChartData = [
                { "name": "In Stock", "value": inStock },
                { "name": "Out of Stock", "value": outOfStock },
            ]

            setInStock(inStock)
            setOutOfStock(outOfStock)
            setProducts(products)
            setPieChartData(pieChartData)
        }
   },[data])

   if (isError) {
        const errorData = (error as AxiosError).response?.data
        console.log(errorData)
    }
    
    return (
        <div className={`flex flex-col gap-y-4 xs:gap-y-8`}>            
            <p className={`text-lg font-semibold py-4 flex items-center gap-x-3 px-4 bg-slate-700 text-white rounded-md`}>
               <MdFactory/>
               Inventory
            </p>
            <div className={`grid lg:grid-cols-2`}
            >
               <div className={`h-40 p-2 px-1 flex justify-center gap-x-2 xs:gap-x-8 rounded-md shadow-md`}
               >
                  <div className={`h-full aspect-square`}>
                     <ResponsiveContainer height='100%' width="98%">
                        <PieChart>
                           <Pie
                              data={pieChartData}
                              dataKey="value"
                              nameKey="name"
                              outerRadius='96%'
                              fill="#82ca9d"
                              stroke="#FFFFFF"
                              
                              >
                              {
                                 pieChartData.map((_entry, index) => (
                                    <Cell
                                    key={`cell-${index}`}
                                    fill={['#4ade80', '#cbd5e1'][index]}
                                    />
                                 ))
                              }
                           </Pie>
                           <Tooltip/>
                        </PieChart>
                     </ResponsiveContainer>
                  </div>
                  <div className={`pt-6 flex flex-col gap-2`}>
                     <div className={`flex gap-x-2 whitespace-nowrap pr-4`}>
                        <div className={`h-6 aspect-square rounded-md bg-green-400`}/>
                        <p>
                           In Stock
                        </p>
                     </div>
                     <div className={`flex gap-x-2 whitespace-nowrap pr-4`}>
                        <div className={`h-6 aspect-square rounded-md bg-slate-300`}/>
                        <p>
                           Out of Stock
                        </p>
                     </div>
                  </div>
               </div>

               <div className={`grid grid-cols-2 gap-2`}>
                  <div className={`grow flex flex-col shadow-md cursor-pointer rounded-lg text-slate-700 py-2 px-6`}>
                     <p className={`text-base sm:text-sm md:text-base`}>
                        Products
                     </p>
                     <p className={`text-2xl font-semibold grow`}>
                        {products}
                     </p>
                  </div>
                  <div className={`grow flex flex-col shadow-md cursor-pointer rounded-lg text-slate-700 py-2 px-6`}>
                     <p className={`text-base sm:text-sm md:text-base`}>
                        Categories
                     </p>
                     <p className={`text-2xl font-semibold grow`}>
                        {categoryBadges.values.length}
                     </p>
                  </div>
                  <div className={`grow flex flex-col shadow-md cursor-pointer rounded-lg text-slate-700 py-2 px-6`}>
                     <p className={`text-base sm:text-sm md:text-base`}>
                        In Stock
                     </p>
                     <p className={`text-2xl text-green-600 font-semibold grow`}>
                        {inStock}
                     </p>
                  </div>
                  <div className={`grow flex flex-col shadow-md cursor-pointer rounded-lg text-slate-700 py-2 px-6`}>
                     <p className={`text-base sm:text-sm md:text-base`}>
                        Out of Stock
                     </p>
                     <p className={`text-2xl font-semibold grow`}>
                        {outOfStock}
                     </p>
                  </div>
               </div>
            </div>
      
            <div className={`relative`}>
                {
                    leftScroll &&
                    <button className={`text-slate-100 shadow-md self-center rounded-lg text-3xl active:shadow-none bg-green-700 active:bg-green-900 absolute top-[54%] left-0`}
                    onClick={() => handleScrollX(-1)}>
                        <BiChevronLeft/>
                    </button>
                }
               <div className={`w-full mx-auto rounded-md shadow-md overflow-x-scroll hide-scrollbar scroll-smooth`}
               ref={categoryBarRef}>
                  <table className={`w-full`}>
                    <thead>
                        <tr>
                            {
                                isLoading
                                ?
                                    Array.from({length:1}).map((_,index) => (
                                        <th className={`p-4 bg-green-700 text-green-700`}
                                        key={index}>
                                            Category
                                        </th>
                                    ))
                                :
                                    data.inventory.map((element:any) => (
                                        <th className={`p-4 bg-green-700 text-white`}
                                        key={element.category}>
                                            {element.category}
                                        </th>
                                    ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {
                                !isLoading &&
                            data.inventory.map((element:any) => (
                                <td className={`text-center py-3 bg-green-100`}
                                key={element.category}>
                                    {element.inStock}
                                </td>
                            ))
                            }
                        </tr>
                        <tr>
                            {
                                !isLoading &&
                            data.inventory.map((element:any) => (
                                <td className={`text-center py-3 bg-slate-100`}
                                key={element.category}>
                                    {element.outOfStock}
                                </td>
                            ))
                            }
                        </tr>
                    </tbody>
                  </table>
               </div>
               {
                    rightScroll &&
                    <button className={`text-slate-100 shadow-md self-center rounded-lg text-3xl active:shadow-none bg-green-700 active:bg-green-900 absolute top-[54%] right-0`}
                    onClick={() => handleScrollX(1)}>
                            <BiChevronRight/>
                    </button>
                }
            </div>
         </div>    
    )
}
 
export default AnalyticsInventory
