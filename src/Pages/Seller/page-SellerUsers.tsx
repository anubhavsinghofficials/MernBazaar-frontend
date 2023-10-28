import { useEffect } from "react"



function SellerUsersPage() {
   useEffect(()=>{
      window.scrollTo({ top: 0 })
   },[])
   return (
      <div className={`card`}>
         Seller Users
      </div>
   )
}
 
export default SellerUsersPage