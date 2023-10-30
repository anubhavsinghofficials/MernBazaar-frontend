import { useEffect } from "react"



function SellerProducts() {
   
   useEffect(()=>{
      window.scrollTo({ top: 0 })
   },[])

   return (
      <div className={`w-[96vw] md:w-[99%] bg-white shadow-md rounded-lg`}>
         Seller Products Page sdfg
      </div>
   )
}
 
export default SellerProducts