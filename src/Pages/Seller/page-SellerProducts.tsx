import { useEffect } from "react"



function SellerProducts() {
   useEffect(()=>{
      window.scrollTo({ top: 0 })
   },[])
   return (
            <>
               <div className={`card`}>
                  Seller Products Page
               </div>
            </>
   )
}
 
export default SellerProducts