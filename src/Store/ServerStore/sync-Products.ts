import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { SERVER_URL } from "../ClientStore/store-Constants"
import { searchObjectType } from "../ClientStore/store-Filters"
import { reviewType } from "@/Pages/Shared/page-ProductDetails"
import { modalStore } from "../ClientStore/store-Modals"
import { boolSetStateType } from "./sync-User"
import { useNavigate } from "react-router-dom"





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

  const fetcherFunc = () => axios.get(`${SERVER_URL}/products?${searchQuery}`)

  return useQuery(["allproducts", searchQuery], fetcherFunc, {
    select(data) {
      return data.data
    },
    cacheTime: 10000,
    refetchOnWindowFocus: false,
  })
}




export const syncFetchProductDetails = (id:string) => {
    const fetcherFunc = () => axios.get(`${SERVER_URL}/product/${id}`)
    return useQuery(['productDetails',id], fetcherFunc, {
      select(data) {
        return data.data.productDetails
      },
      cacheTime: 10000,
      refetchOnWindowFocus: false,
    })
}




export const syncFetchAllReviews = (id:string) => {
    const fetcherFunc = () => axios.get(`${SERVER_URL}/product/reviews/${id}?pageNo=1&pageLength=9`, {
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
      axios.post(`${SERVER_URL}/product/review/${id}`, review, {
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
    axios.delete(`${SERVER_URL}/product/review/${id}`, {
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




export const syncFetchUserOrders = () => {
  const fetcherFunc = () => axios.get(`${SERVER_URL}/orders`,{
      withCredentials:true
  })
  return useQuery(['orders'], fetcherFunc, {
    select: (data) => data.data,
    cacheTime: 10000,
    refetchOnWindowFocus: false,
  })
}





// Seller Sync Functions _________________________________________________

export const syncCreateProduct = (setDisableSubmitButton:boolSetStateType) => {
  const { setGenericMessage, toggleGenericModal } = modalStore()
  const { toggleGenericToast, setGenericToastMessage, setGenericToastType } = modalStore()
  const Navigate = useNavigate()

  const mutationFunc = (formData:FormData) => {
    console.log({formData})
    return axios.post(`${SERVER_URL}/product/new`,formData,{
      withCredentials:true
    })
  }

  return useMutation(mutationFunc,{
    onSuccess(data) {
        setGenericToastMessage(data.data.message)
        setGenericToastType('success')
        Navigate(`/product/${data.data.productId}`)
        setTimeout(() => {
            setDisableSubmitButton(false)
            toggleGenericToast(true)
        }, 1000)
    },
    onError(error) {
      const errorData = (error as AxiosError<{error:string}>).response?.data!
      setGenericMessage(errorData?.error)
      toggleGenericModal()
      setDisableSubmitButton(false)
    },
  })
}
 
