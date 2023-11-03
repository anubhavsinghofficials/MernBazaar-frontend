import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { SERVER_URL } from "../ClientStore/store-Constants"
import { searchObjectType } from "../ClientStore/store-Filters"
import { reviewType } from "@/Pages/Shared/page-ProductDetails"
import { modalStore } from "../ClientStore/store-Modals"
import { boolSetStateType } from "./sync-User"
import { useNavigate } from "react-router-dom"
import { searchFilterType } from "@/Pages/Seller/page-SellerProducts"
import { orderUpdateType, searchOrdersFilterType } from "@/Pages/Seller/page-SellerOrders"





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
 




export const syncFetchSellerProducts = (filter:searchFilterType) => {
  const { category, sort, pageNo, pageLength } = filter

  let searchQuery = category ? `category=${category}` : ''
  searchQuery = sort ? `${searchQuery}&sort=${sort}` : searchQuery
  searchQuery = `${searchQuery}&pageNo=${pageNo}&pageLength=${pageLength}`

  const fetcherFunc = () => axios.get(`${SERVER_URL}/seller/products?${searchQuery}`,{
    withCredentials:true
  })

  return useQuery(["sellerproducts", searchQuery], fetcherFunc, {
    select: data => data.data,
    cacheTime: 60000,
    refetchOnWindowFocus: false,
  })
}



export const syncFetchSellerProductDetails = (id:string) => {
  const { setGenericMessage, toggleGenericModal } = modalStore()

  const fetcherFunc = () => axios.get(`${SERVER_URL}/seller/product/${id}`,{
    withCredentials:true
  })

  return useQuery(['sellerProductDetails',id], fetcherFunc, {
    select: data => data.data.productDetails,
    onError(error) {
      const errorData = (error as AxiosError<{error:string}>).response!.data
      setGenericMessage(errorData?.error)
      toggleGenericModal()
    },
    cacheTime: 10000,
    refetchOnWindowFocus: false,
  })
}






export const syncUpdateProduct = (productId:string,setDisableSubmitButton:boolSetStateType,setEditable:boolSetStateType) => {
  const { setGenericMessage, toggleGenericModal } = modalStore()
  const { toggleGenericToast, setGenericToastMessage, setGenericToastType } = modalStore()
  const queryClient = useQueryClient()

  const mutationFunc = (formData:FormData) => {
    return axios.patch(`${SERVER_URL}/seller/product/${productId}`,formData,{
      withCredentials:true
    })
  }

  return useMutation(mutationFunc,{
    onSuccess(data) {
        setGenericToastMessage(data.data.message)
        setGenericToastType('success')
        setDisableSubmitButton(false)
        setEditable(false)
        queryClient.invalidateQueries(['sellerProductDetails'])
        setTimeout(() => {
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






export const syncDeleteProduct = (setDisableDeleteButton:boolSetStateType) => {
  const { setGenericMessage, toggleGenericModal } = modalStore()
  const { toggleGenericToast, setGenericToastMessage, setGenericToastType } = modalStore()
  const queryClient = useQueryClient()
  const Navigate = useNavigate()

  const mutationFunc = (productId:string) => axios.delete(`${SERVER_URL}/seller/product/${productId}`,{
    withCredentials:true
  })

  return useMutation(mutationFunc,{
    onSuccess(data) {
      setGenericToastMessage(data.data.message)
      setGenericToastType('success')
      setDisableDeleteButton(false)
      queryClient.invalidateQueries(['sellerproducts'])
      Navigate('/seller/products')
      setTimeout(() => {
        toggleGenericToast(true)
      }, 1000);
    },
    onError(error) {
      const errorData = (error as AxiosError<{error:string}>).response?.data!
      setGenericMessage(errorData?.error)
      toggleGenericModal()
      setDisableDeleteButton(false)
    },
  })
}






export const syncFetchSellerOrders = (filter:searchOrdersFilterType) => {
  const { setGenericMessage, toggleGenericModal } = modalStore()
  const { pageLength, pageNo, sort, orderStatus } = filter
  let searchQuery = orderStatus ? `orderStatus=${orderStatus}` : ``
  searchQuery = sort     ? `${searchQuery}&sort=${sort}`         : searchQuery
  searchQuery = `${searchQuery}&pageNo=${pageNo}&pageLength=${pageLength}`

  
  const fetcherFunc = () => axios.get(`${SERVER_URL}/seller/orders?${searchQuery}`,{
    withCredentials:true
  })

  return useQuery(['sellerOrders',searchQuery], fetcherFunc, {
    select: data => data.data,
    onError(error) {
      const errorData = (error as AxiosError<{error:string}>).response!.data
      setGenericMessage(errorData?.error)
      toggleGenericModal()
    },
    cacheTime: 10000,
    refetchOnWindowFocus: false,
  })
}






export const syncChangeOrderStatus = (setDisableStatusButton:boolSetStateType) => {
    const { setGenericMessage, toggleGenericModal } = modalStore()
    const { toggleGenericToast, setGenericToastMessage, setGenericToastType } = modalStore()
    const queryClient = useQueryClient()

    const mutationFunc = (orderUpdate:orderUpdateType) => {
      const { orderId, orderStatus } = orderUpdate
      return axios.patch(`${SERVER_URL}/seller/order/${orderId}`, {orderStatus}, {
        withCredentials:true
      })
    }
    return useMutation(mutationFunc,{
      onSuccess(data) {
        setGenericToastMessage(data.data.message)
        setGenericToastType('success')
        queryClient.invalidateQueries(['sellerOrders'])
        queryClient.invalidateQueries(['sellerOrder'])
        setTimeout(() => {
            setDisableStatusButton(false)
            toggleGenericToast(true)
          }, 1000)
        },
      onError(error) {
        const errorData = (error as AxiosError<{error:string}>).response!.data
        setGenericMessage(errorData?.error)
        toggleGenericModal()
        setDisableStatusButton(false)
      },
    })
}
 






export const syncFetchSellerOrder = (orderId:string) => {
  const { setGenericMessage, toggleGenericModal } = modalStore()
  
  const fetcherFunc = () => {
    return axios.get(`${SERVER_URL}/seller/order/${orderId}`,{
      withCredentials:true
    })
  }

  return useQuery(['sellerOrder',orderId], fetcherFunc, {
    select: data => data.data,
    onError(error) {
      const errorData = (error as AxiosError<{error:string}>).response!.data
      setGenericMessage(errorData?.error)
      toggleGenericModal()
    },
    cacheTime: 10000,
    refetchOnWindowFocus: false,
  })
}
