import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { serverUrl } from "../ClientStore/store-Constants"
import { searchObjectType } from "../ClientStore/store-Filters"
import { reviewType } from "@/Pages/Shared/page-ProductDetails"
import { modalStore } from "../ClientStore/store-Modals"





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




export const syncFetchProductDetails = (id:string) => {
    const fetcherFunc = () => axios.get(`${serverUrl}/product/${id}`)
    return useQuery(['productDetails',id], fetcherFunc, {
      select(data) {
        return data.data.productDetails
      },
      cacheTime: 10000,
      refetchOnWindowFocus: false,
    })
}




export const syncFetchAllReviews = (id:string) => {
    const fetcherFunc = () => axios.get(`${serverUrl}/product/reviews/${id}?pageNo=1&pageLength=9`, {
      withCredentials: true,
    })
    return useQuery(['productReview',id], fetcherFunc, {
      select(data) {
        return data.data
      },
      cacheTime: 10000,
      refetchOnWindowFocus: false,
    })
}




export const syncAddReview = (id:string) => {
    const queryClient = useQueryClient()
    const { setGenericMessage, toggleGenericModal } = modalStore()

    const mutationFunc = (review:reviewType) => (
      axios.post(`${serverUrl}/product/review/${id}`, review, {
          withCredentials: true,
      }))
    return useMutation(mutationFunc, {
      onSuccess(_data, _variables, _context) {
          queryClient.invalidateQueries(['productReview',id])
          queryClient.invalidateQueries(['productDetails',id])
      },
      onError(error) {
        const errorData = (error as AxiosError<{error:string}>).response?.data!
        setGenericMessage(errorData?.error)
        toggleGenericModal()
      },
    })
}




export const syncDeleteReview = (id:string) => {
  const queryClient = useQueryClient()
  const { setGenericMessage, toggleGenericModal } = modalStore()

  const mutationFunc = () => (
    axios.delete(`${serverUrl}/product/review/${id}`, {
      withCredentials: true,
  }))
  return useMutation(mutationFunc,{
    onSuccess(_data, _variables, _context) {
        queryClient.invalidateQueries(['productReview',id])
        queryClient.invalidateQueries(['productDetails',id])
    },
    onError(error) {
      const errorData = (error as AxiosError<{error:string}>).response?.data!
      setGenericMessage(errorData?.error)
      toggleGenericModal()
    },
  })
}
 