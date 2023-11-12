
import { useQuery } from '@tanstack/react-query'
import { SERVER_URL } from '../ClientStore/store-Constants'
import axios, { AxiosError } from 'axios'
import { modalStore } from '../ClientStore/store-Modals'




export const syncFetchHighlights = () => {
    const { toggleGenericModal, setGenericMessage } = modalStore()

    const fetcherFunc = () => axios.get(`${SERVER_URL}/seller/analytics/highlights`, {
        withCredentials: true,
    })
    return useQuery(['highlights'], fetcherFunc, {
        select : data =>  data.data,
        onError(error) {
            const errorData = (error as AxiosError<{error:string}>).response?.data!
            setGenericMessage(errorData?.error)
            toggleGenericModal()
        },
        refetchOnWindowFocus: false,
        refetchInterval:14*60*1000,
        refetchIntervalInBackground:true, 
    })
}




export const syncFetchInventory = () => {
    const { toggleGenericModal, setGenericMessage } = modalStore()

    const fetcherFunc = () => axios.get(`${SERVER_URL}/seller/analytics/inventory`, {
        withCredentials: true,
    })
    return useQuery(['inventory'], fetcherFunc, {
        select : data =>  data.data,
        onError(error) {
            const errorData = (error as AxiosError<{error:string}>).response?.data!
            setGenericMessage(errorData?.error)
            toggleGenericModal()
        },
        refetchOnWindowFocus: false,
    })
}




export const syncFetchSellerscore = () => {
    const { toggleGenericModal, setGenericMessage } = modalStore()

    const fetcherFunc = () => axios.get(`${SERVER_URL}/seller/analytics/sellerscore`, {
        withCredentials: true,
    })
    return useQuery(['sellerScore'], fetcherFunc, {
        select : data =>  data.data,
        onError(error) {
            const errorData = (error as AxiosError<{error:string}>).response?.data!
            setGenericMessage(errorData?.error)
            toggleGenericModal()
        },
        refetchOnWindowFocus: false,
    })
}




export const syncFetchInsights = () => {
    const { toggleGenericModal, setGenericMessage } = modalStore()

    const fetcherFunc = () => axios.get(`${SERVER_URL}/seller/analytics/insights`, {
        withCredentials: true,
    })
    return useQuery(['insights'], fetcherFunc, {
        select : data =>  data.data,
        onError(error) {
            const errorData = (error as AxiosError<{error:string}>).response?.data!
            setGenericMessage(errorData?.error)
            toggleGenericModal()
        },
        refetchOnWindowFocus: false,
    })
}
