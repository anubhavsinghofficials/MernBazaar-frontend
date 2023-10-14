import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { serverUrl } from "../ClientStore/store-Constants"
import { searchObjectType } from "../ClientStore/store-Filters"


export const syncFetchProducts = (searchObject: searchObjectType) => {
  const { keyword, category, price, pageNo, pageLength,
          discount, ratings, sort } = searchObject

  let searchQuery = keyword ? `keyword=${keyword}` : ``
  searchQuery = category ? `${searchQuery}&category=${category}` : searchQuery
  searchQuery = discount ? `${searchQuery}&discount=${discount}` : searchQuery
  searchQuery = ratings  ? `${searchQuery}&ratings=${ratings}`   : searchQuery
  searchQuery = sort     ? `${searchQuery}&sort=${sort}`         : searchQuery
  searchQuery = `${searchQuery}&price[gte]=${price?.[0]}&price[lte]=${price?.[1]}`
  searchQuery = `${searchQuery}&pageNo=${pageNo}&pageLength=${pageLength}`

  const fetcherFunc = () => axios.get(`${serverUrl}/products?${searchQuery}`)

  return useQuery(["allproducts", searchQuery], fetcherFunc, {
    select(data) {
      return data.data
    },
    cacheTime: 10000,
    refetchOnWindowFocus: false,
  })
}
