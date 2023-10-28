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