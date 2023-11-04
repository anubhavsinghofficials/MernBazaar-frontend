import { useScrollEffect } from "@/Hooks/useScrollEffect"
import { categoryBadges } from "@/Store/ClientStore/store-Constants"
import { useRef } from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { MdFactory } from "react-icons/md"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'



function AnalyticsInventory() {
   const { stocks, inventory } = getInventoryData()
   const categoryBarRef = useRef<HTMLDivElement | null>(null)
   const { handleScrollX, leftScroll, rightScroll } = useScrollEffect({scrollBy:100,scrollPadRef:categoryBarRef})


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
                              data={stocks}
                              dataKey="value"
                              nameKey="name"
                              outerRadius='96%'
                              fill="#82ca9d"
                              stroke="#FFFFFF"
                              
                              >
                              {
                                 stocks.map((_entry, index) => (
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
                        100
                     </p>
                  </div>
                  <div className={`grow flex flex-col shadow-md cursor-pointer rounded-lg text-slate-700 py-2 px-6`}>
                     <p className={`text-base sm:text-sm md:text-base`}>
                        Categories
                     </p>
                     <p className={`text-2xl font-semibold grow`}>
                        10
                     </p>
                  </div>
                  <div className={`grow flex flex-col shadow-md cursor-pointer rounded-lg text-slate-700 py-2 px-6`}>
                     <p className={`text-base sm:text-sm md:text-base`}>
                        In Stock
                     </p>
                     <p className={`text-2xl text-green-600 font-semibold grow`}>
                        50
                     </p>
                  </div>
                  <div className={`grow flex flex-col shadow-md cursor-pointer rounded-lg text-slate-700 py-2 px-6`}>
                     <p className={`text-base sm:text-sm md:text-base`}>
                        Out of Stock
                     </p>
                     <p className={`text-2xl font-semibold grow`}>
                        50
                     </p>
                  </div>
               </div>
            </div>
      
            <div className={`relative`}>
                {
                    leftScroll &&
                    <button className={`text-slate-100 shadow-md self-center rounded-lg text-3xl active:shadow-none bg-green-700 active:bg-slate-100 absolute top-[54%] left-0`}
                    onClick={() => handleScrollX(-1)}>
                        <BiChevronLeft/>
                    </button>
                }
               <div className={`w-full mx-auto rounded-md shadow-md overflow-x-scroll hide-scrollbar scroll-smooth`}
               ref={categoryBarRef}>
                  <table className={`w-full`}>
                     <tr>
                        {
                           inventory.categories.map(category => (
                              <th className={`p-4 bg-green-700 text-white`}>
                                 {category}
                              </th>
                           ))
                        }
                     </tr>
                     <tr>
                        {
                           inventory.inStock.map(number => (
                              <td className={`text-center py-3 bg-green-100`}>
                                 {number}
                              </td>
                           ))
                        }
                     </tr>
                     <tr>
                        {
                           inventory.outOfStock.map(number => (
                              <td className={`text-center py-3 bg-slate-100`}>
                                 {number}
                              </td>
                           ))
                        }
                     </tr>
                  </table>
               </div>
               {
                    rightScroll &&
                    <button className={`text-slate-100 shadow-md self-center rounded-lg text-3xl active:shadow-none bg-green-700 active:bg-slate-100 absolute top-[54%] right-0`}
                    onClick={() => handleScrollX(1)}>
                            <BiChevronRight/>
                    </button>
                }
            </div>
         </div>    
    )
}
 
export default AnalyticsInventory












function getInventoryData () {
    const stocks = [
       { "name": "In Stock", "value": 400 },
       { "name": "Out of Stock", "value": 300 },
     ]
    const inventory = {
       categories:categoryBadges.values,
       inStock:Array.from(categoryBadges.values).map(() => Math.floor(Math.random()*100)),
       outOfStock:Array.from(categoryBadges.values).map(() => Math.floor(Math.random()*100))
    }
    return ({stocks,inventory}) 
 }