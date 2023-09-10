
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import { serverUrl } from '../../config/constants'



    

export const syncFetchProducts = (searchQuery:string) => {
    
    const fetcherFunc = () => {
        return axios.get(`${serverUrl}/products?${searchQuery}`)
    }
    
    return useQuery(["allproducts",searchQuery], fetcherFunc,{
        select (data) { return data.data },
        cacheTime:0,
        refetchOnWindowFocus:false,
    })
}
