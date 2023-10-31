import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"



function EditProduct() {
   useEffect(()=>{
      window.scrollTo({ top: 0 })
   },[])

   const Navigate = useNavigate()
   const { id } = useParams()
   if (!id) {
       Navigate('/seller/products')
   }
   return (
      <div className={`card`}>
         Edit the Products {id}
      </div>
   )
}
 
export default EditProduct