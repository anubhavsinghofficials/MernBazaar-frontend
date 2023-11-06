
import { useEffect, useRef } from "react"
import AnalyticsHighlights from "./components/AnalyticsHighlights"
import AnalyticsInventory from "./components/AnalyticsInventory"
import AnalyticsSellerScore from "./components/AnalyticsSellerScore"
import AnalyticsOrders from "./components/AnalyticsOrders"
import AnalyticsInsights from "./components/AnalyticsInsights"

export type sectionRefProps = {
   revenueSectionRef: React.RefObject<HTMLDivElement>
}

function SellerAnalyticsPage() {
   
   useEffect(()=>{
      window.scrollTo({ top: 0 })
   },[])

   const revenueSectionRef = useRef<HTMLDivElement>(null)

   return (
      <div className={`w-[98vw] md:w-[calc(100vw-19rem)] lg:w-[calc(100vw-20rem)] xl:w-[calc(100vw-22rem)] max-w-[72rem] mx-auto bg-white shadow-md rounded-lg p-2 sm:p-4 flex flex-col gap-y-16`}>
         <AnalyticsHighlights revenueSectionRef={revenueSectionRef}/>
         <AnalyticsInventory/>
         <AnalyticsSellerScore/>
         <AnalyticsOrders/>
         <AnalyticsInsights revenueSectionRef={revenueSectionRef}/>
      </div>
   )
}
 
export default SellerAnalyticsPage