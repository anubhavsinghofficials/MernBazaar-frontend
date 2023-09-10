import { useLocation } from "react-router-dom"
import { syncFetchProducts } from "../Store/ServerStore/store-Products"
import { useState } from "react"






function ProductsPage() {
    const location = useLocation()
    const [pageNo, setpageNo] = useState(1)
    const [pageLength, setpageLength] = useState(2)
    const searchQuery = `keyword=${location.state}&pageNo=${pageNo}&pageLength=${pageLength}`
    console.log(location.state)
    const {data, isLoading, isError, error, isRefetching}
    = syncFetchProducts(searchQuery)

    if (isLoading || isRefetching) {
        <div className={`w-full text-3xl bg-black flex justify-center items-center`}>
        Loading..
        </div>
    }

    if (isError) {
        const errorData = error.response?.data
        console.log(errorData)
        return <div>Error Occured</div>
    }

    console.log(data)

    return (
             <div className={`w-full bg-black flex justify-center items-center`}>
                    Product Page
             </div>
    )
}
 
export default ProductsPage






