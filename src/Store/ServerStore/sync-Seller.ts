
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SERVER_URL } from '../ClientStore/store-Constants'
import axios, { AxiosError } from 'axios'
import { SellerLogInFormType, SellerSignUpFormType } from '@/Pages/Public/FormValidators/type-seller'
import { sellerProfileType } from '@/Pages/Seller/page-SellerProfile'
import { useNavigate } from 'react-router-dom'
import { modalStore } from '../ClientStore/store-Modals'
import { passwordsType } from '@/Pages/User/page-UserPasswordUpdate'
import { boolSetStateType } from './sync-User'



export const syncRegisterSeller = (setDisableSubmit:boolSetStateType) => {
    const queryClient = useQueryClient()
    const Navigate = useNavigate()
    const { setGenericMessage, toggleGenericModal } = modalStore()
    const { toggleGenericToast, setGenericToastMessage, setGenericToastType } = modalStore()

    const mutationFunc = (sellerData:SellerSignUpFormType) => {
        return axios.post(`${SERVER_URL}/seller/register`, sellerData, {
            withCredentials: true,
        })
    }
    
    return useMutation(mutationFunc,{
        onSuccess(data) {
            queryClient.invalidateQueries(['Role']),
            setGenericToastMessage(data.data.message)
            setGenericToastType('success')
            setTimeout(() => {
                toggleGenericToast(true)
            }, 1000);
            Navigate('/seller/profile')
        },
        onError(error) {
            // <{error:string}> is ∵ we are sending the error message from the
            // backend in such a format, eg: res.json({error:'user not found'})
            const errorData = (error as AxiosError<{error:string}>).response?.data!
            setDisableSubmit(false)
            setGenericMessage(errorData?.error)
            toggleGenericModal()
        },
    })
}
 


export const syncLoginSeller = (setDisableSubmit:boolSetStateType) => {
    const queryClient = useQueryClient()
    const { toggleGenericModal, setGenericMessage } = modalStore()
    const { toggleGenericToast, setGenericToastMessage, setGenericToastType } = modalStore()
    const Navigate = useNavigate()

    const mutationFunc = (sellerData:SellerLogInFormType) => {
        return axios.post(`${SERVER_URL}/seller/login`, sellerData, {
            withCredentials: true,
        })
    }

    return useMutation(mutationFunc,{
        onSuccess(data, _variables, _context) {
            queryClient.invalidateQueries(['Role']),
            setGenericToastMessage(data.data.message)
            setGenericToastType('success')
            setTimeout(() => {
                toggleGenericToast(true)
            }, 1000);
            
            Navigate('/seller/profile')
        },
        onError(error) {
            const errorData = (error as AxiosError<{error:string}>).response?.data!
            setDisableSubmit(false)
            setGenericMessage(errorData?.error)
            toggleGenericModal()
        },
    })
}
 


export const syncFetchSellerDetails = () => {
    const { toggleGenericModal, setGenericMessage } = modalStore()

    const fetcherFunc = () => axios.get(`${SERVER_URL}/seller`, {
        withCredentials: true,
    })
    return useQuery(['sellerDetails'], fetcherFunc, {
        select : data =>  data.data.seller,
        onError(error) {
            const errorData = (error as AxiosError<{error:string}>).response?.data!
            setGenericMessage(errorData?.error)
            toggleGenericModal()
        },
        refetchOnWindowFocus: false,
    })
}



export const syncUpdateSellerDetails = (setEditable:boolSetStateType, setDisableSubmit:boolSetStateType) => {
    const { toggleGenericModal, setGenericMessage } = modalStore()
    const { toggleGenericToast, setGenericToastMessage, setGenericToastType } = modalStore()
    const queryClient = useQueryClient()

    const mutationFunc = (sellerData:sellerProfileType) => {
        return axios.patch(`${SERVER_URL}/seller`, sellerData, {
            withCredentials: true,
        })
    }
    return useMutation(mutationFunc,{
        onSuccess() {
            setEditable(false)
            setDisableSubmit(false)
            queryClient.invalidateQueries(['sellerDetails'])
            setGenericToastMessage('Updated your details')
            setGenericToastType('success')
            setTimeout(() => {
                toggleGenericToast(true)
            }, 1000);
        },
        onError(error) {
            const errorData = (error as AxiosError<{error:string}>).response?.data!
            setDisableSubmit(false)
            setGenericMessage(errorData?.error)
            toggleGenericModal()
        },
    })
}



export const syncUpdateSellerPassword = (setDisableSubmit:React.Dispatch<React.SetStateAction<boolean>>) => {
    const { toggleGenericModal, setGenericMessage } = modalStore()
    const { toggleGenericToast, setGenericToastMessage, setGenericToastType } = modalStore()
    const Navigate = useNavigate()
    const mutationFunc = (passwords:passwordsType) => {
       return axios.patch(`${SERVER_URL}/seller/password`, passwords, {
           withCredentials:true,
        })
    }
    return useMutation(mutationFunc,{
        onSuccess(data){
            setDisableSubmit(false)
            setGenericToastMessage(data.data.message)
            setGenericToastType('success')
            setTimeout(() => {
                toggleGenericToast(true)
            }, 1000);
            Navigate('/seller/profile')
        },
        onError(error) {
            const errorData = (error as AxiosError<{error:string}>).response?.data!
            setDisableSubmit(false)
            setGenericMessage(errorData?.error)
            toggleGenericModal()
        },
    })
}



export const syncLogOutSeller = (setDisableSubmit:React.Dispatch<React.SetStateAction<boolean>>) => {
    const Navigate = useNavigate()
    const queryClient = useQueryClient()
    const { toggleGenericModal, setGenericMessage } = modalStore()
    const mutationFunc = () => {
        return axios.post(`${SERVER_URL}/seller/logout`, null, {
            withCredentials:true
        })
    }
    return useMutation(mutationFunc, {
        onSuccess(data){
            queryClient.invalidateQueries(['Role'])
            Navigate('/home')
            setGenericMessage(data.data.message)
            toggleGenericModal()
        },
        onError(error) {
            const errorData = (error as AxiosError<{error:string}>).response?.data!
            setDisableSubmit(false)
            setGenericMessage(errorData?.error)
            toggleGenericModal()
        },
    })
}
 


export const syncLogOutSellerAllDevices = (setDisableSubmit:React.Dispatch<React.SetStateAction<boolean>>) => {
    const Navigate = useNavigate()
    const queryClient = useQueryClient()
    const { toggleGenericModal, setGenericMessage } = modalStore()
    const mutationFunc = () => {
        return axios.post(`${SERVER_URL}/seller/logoutall`, null, {
            withCredentials:true
        })
    }
    return useMutation(mutationFunc, {
        onSuccess(data){
            queryClient.invalidateQueries(['Role'])
            Navigate('/home')
            setGenericMessage(data.data.message)
            toggleGenericModal()
        },
        onError(error) {
            const errorData = (error as AxiosError<{error:string}>).response?.data!
            setDisableSubmit(false)
            setGenericMessage(errorData?.error)
            toggleGenericModal()
        },
    })
}
 
 
