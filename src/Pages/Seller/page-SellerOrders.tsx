import { useEffect } from "react"



function SellerOrdersPage() {
   useEffect(()=>{
      window.scrollTo({ top: 0 })
   },[])
   return (
      <div className={`card`}>
         Seller Orders
      </div>
   )
}
 
export default SellerOrdersPage