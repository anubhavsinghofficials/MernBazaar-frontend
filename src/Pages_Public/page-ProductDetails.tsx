import { useParams } from "react-router-dom"



function ProductDetailsPage() {

    const {id} = useParams()

    return (
             <div className={`w-full bg-black flex justify-center items-center`}>
                    Product Details of Product {id}
             </div>
    )
}
 
export default ProductDetailsPage






