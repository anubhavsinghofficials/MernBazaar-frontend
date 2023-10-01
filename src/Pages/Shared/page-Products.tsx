import { useLocation } from "react-router-dom"
import { searchType, syncFetchProducts } from "../../Store/ServerStore/store-Products"
import { useEffect, useRef, useState } from "react"
import { AxiosError } from "axios"
import useSideEffect from "../../Hooks/useSideEffect"


function ProductsPage() {

    const keyword = useLocation().state
    const [searchObject, setSearchObject] = useState<searchType>({
        keyword:keyword,
        pageNo:1,
        pageLength:2,
        price:[0,25000],
        category:null
    })

    useSideEffect(()=>{
      setSearchObject({...searchObject, keyword: keyword})
    },[keyword])

    const {data, isLoading, isError, error, isRefetching}
    = syncFetchProducts(searchObject)

    function handleChange() {
        const num = Math.floor(Math.random()*(3))
        console.log(num)
        if (num === 0) {
            setSearchObject({...searchObject, keyword:"2"})
        } else if (num === 1) {
            setSearchObject({...searchObject, category:"still testing"})
        } else {
            setSearchObject({...searchObject, price:[0,1]})
        }
    }
     

    if (isLoading || isRefetching) {
        <div className={`w-full text-3xl bg-black flex justify-center items-center`}>
        Loading..
        </div>
    }

    if (isError) {
        const errorData = (error as AxiosError).response?.data
        console.log(errorData)
        return <div>Error Occured</div>
    }

    console.log(data)

    return (
             <div className={`w-full bg-black flex justify-center items-center`}>
                    Product Page
                    <button onClick={handleChange}>
                        Search
                    </button>
             </div>
    )
}
 
export default ProductsPage






