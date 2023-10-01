
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import { serverUrl } from '../ClientStore/store-constants'

export type searchType = {
    keyword:string;
    pageNo:number;
    pageLength:number;
    price:[number,number];
    category:string | null;
}



    

export const syncFetchProducts = (searchObject:searchType) => {

    const {keyword, category, price, pageNo, pageLength} = searchObject 

    let searchQuery = keyword ? `keyword=${keyword}` : ``
    searchQuery = category ? `${searchQuery}&category=${category}` : searchQuery
    searchQuery = `${searchQuery}&price[gte]=${price[0]}&price[lte]=${price[1]}`
    searchQuery = `${searchQuery}&pageNo=${pageNo}&pageLength=${pageLength}`
             
    const fetcherFunc = () => (
        axios.get(`${serverUrl}/products?${searchQuery}`)
    )
    
    return useQuery(["allproducts",searchQuery], fetcherFunc,{
        select (data) { return data.data },
        cacheTime:0,
        refetchOnWindowFocus:false,
    })
}
