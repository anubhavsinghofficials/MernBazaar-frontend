import { useEffect } from "react"



function AddProducts() {
   useEffect(()=>{
      window.scrollTo({ top: 0 })
   },[])
   return (
      <div className={`card`}>
         Add Products
      </div>
   )
}
 
export default AddProducts