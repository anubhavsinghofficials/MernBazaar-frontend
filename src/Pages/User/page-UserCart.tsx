import { useEffect } from "react"



function UserCart() {
   useEffect(()=>{
      window.scrollTo({ top: 0 })
   },[])
   return (
            <>
               <div className={``}>
                  My Cart
               </div>
            </>
   )
}
 
export default UserCart