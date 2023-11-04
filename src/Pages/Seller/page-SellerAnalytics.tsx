
import { useEffect } from "react"
import AnalyticsHighlights from "./components/AnalyticsHighlights"
import AnalyticsInventory from "./components/AnalyticsInventory"
import AnalyticsSellerScore from "./components/AnalyticsSellerScore"
import AnalyticsOrders from "./components/AnalyticsOrders"
import AnalyticsInsights from "./components/AnalyticsInsights"

function SellerAnalyticsPage() {
   
   useEffect(()=>{
      window.scrollTo({ top: 0 })
   },[])



   return (
      <div className={`w-[98vw] md:w-[calc(100vw-19rem)] lg:w-[calc(100vw-20rem)] xl:w-[calc(100vw-22rem)] max-w-[72rem] mx-auto bg-white shadow-md rounded-lg p-2 sm:p-4 flex flex-col gap-y-16`}>
         <AnalyticsHighlights/>
         <AnalyticsInventory/>
         <AnalyticsSellerScore/>
         <AnalyticsOrders/>
         <AnalyticsInsights/>
      </div>
   )
}
 
export default SellerAnalyticsPage




//   why not delivereddOrders = total - pending - shipped
//   and instead of countDocuments, just filter from AllOrders
//   const totalOrders = await Order.countDocuments()
//   const pendingOrders = await Order.countDocuments({orderStatus:"pending"})
//   const shippedOrders = await Order.countDocuments({orderStatus:"shipped"})
//   const deliveredOrders = await Order.countDocuments({orderStatus:"delivered"})
//   const totalAmount = AllOrders.reduce((acc,curr) => acc + curr.totalPrice,0) 

//   const start = (+pageNo-1)*(+pageLength)
//   const end = (+pageNo)*(+pageLength)
//   orders = orders.slice(start,end)

//   res.status(200).json({totalAmount, totalOrders, pendingOrders, shippedOrders, deliveredOrders, orders})
