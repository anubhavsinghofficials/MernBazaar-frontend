import { useEffect } from "react"



function EditProduct() {
   useEffect(()=>{
      window.scrollTo({ top: 0 })
   },[])
   return (
      <div className={`card`}>
         Edit the Products
      </div>
   )
}
 
export default EditProduct