
import { useEffect } from "react"


function SellerAnalyticsPage() {
   useEffect(()=>{
      window.scrollTo({ top: 0 })
   },[])
   return (
      <div className={`card`}>
         Seller Analytics Page
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
