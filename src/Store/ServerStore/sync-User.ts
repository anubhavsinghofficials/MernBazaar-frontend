import { useNavigate } from 'react-router-dom';
import { userProfileType } from './../../Pages/User/page-UserProfile';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { serverUrl } from '../ClientStore/store-Constants'
import axios, { AxiosError } from 'axios'
import { UserLogInFormType, UserSignUpFormType } from '@/Pages/Public/FormValidators/type-user'
import { passwordsType } from '@/Pages/User/page-UserPasswordUpdate';
import { modalStore } from '../ClientStore/store-Modals';


export type boolSetStateType = React.Dispatch<React.SetStateAction<boolean>>



export const syncRegisterUser = (setDisableSubmit:boolSetStateType) => {
    const queryClient = useQueryClient()
    const Navigate = useNavigate()
    const { toggleGenericModal, setGenericMessage } = modalStore()

    const mutationFunc = (userData:UserSignUpFormType) => {
        return axios.post(`${serverUrl}/user/register`, userData, {
            withCredentials: true,
        })
    }

    return useMutation(mutationFunc,{
        onSuccess(data) {
            queryClient.invalidateQueries(['Role'])
            setGenericMessage(data.data.message)
            toggleGenericModal()
            Navigate('/user/profile')
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
 


export const syncLoginUser = (setDisableSubmit:boolSetStateType) => {
    const queryClient = useQueryClient()
    const { toggleGenericModal, setGenericMessage } = modalStore()
    const Navigate = useNavigate()

    const mutationFunc = (userData:UserLogInFormType) => {
        return axios.post(`${serverUrl}/user/login`, userData, {
            withCredentials: true,
        })
    }

    return useMutation(mutationFunc,{
        onSuccess(data, _variables, _context) {
            queryClient.invalidateQueries(['Role']),
            setGenericMessage(data.data.message)
            toggleGenericModal()
            Navigate('/user/profile')
        },
        onError(error) {
            const errorData = (error as AxiosError<{error:string}>).response?.data!
            setDisableSubmit(false)
            setGenericMessage(errorData?.error)
            toggleGenericModal()
        },
    })
}


export const syncFetchUserDetails = () => {
    const { toggleGenericModal, setGenericMessage } = modalStore()
    
    const fetcherFunc = () => axios.get(`${serverUrl}/user`, {
        withCredentials: true,
    })
    return useQuery(['userDetails'], fetcherFunc, {
        select: data => data.data.user,
        onError(error) {
            const errorData = (error as AxiosError<{error:string}>).response?.data!
            setGenericMessage(errorData?.error)
            toggleGenericModal()
        },
        refetchOnWindowFocus: false,
    })
}


export const syncUpdateUserDetails = (setEditable:boolSetStateType, setDisableSubmit:boolSetStateType) => {
    const { toggleGenericModal, setGenericMessage } = modalStore()
    const queryClient = useQueryClient()
    
    const mutationFunc = (userData:userProfileType) => {
        return axios.patch(`${serverUrl}/user`, userData, {
            withCredentials: true,
        })
    }
    return useMutation(mutationFunc,{
        onSuccess() {
            setEditable(false)
            setDisableSubmit(false)
            queryClient.invalidateQueries(['userDetails'])
        },
        onError(error) {
            const errorData = (error as AxiosError<{error:string}>).response?.data!
            setDisableSubmit(false)
            setGenericMessage(errorData?.error)
            toggleGenericModal()
        },
    })
}



export const syncUpdateUserPassword = (setDisableSubmit:React.Dispatch<React.SetStateAction<boolean>>) => {
    const { toggleGenericModal, setGenericMessage } = modalStore()
    const Navigate = useNavigate()
    const mutationFunc = (passwords:passwordsType) => {
       return axios.patch(`${serverUrl}/user/password`, passwords, {
           withCredentials:true,
        })
    }
    return useMutation(mutationFunc,{
        onSuccess(data){
            setDisableSubmit(false)
            setGenericMessage(data.data.message)
            toggleGenericModal()
            Navigate('/user/profile')
        },
        onError(error) {
            const errorData = (error as AxiosError<{error:string}>).response?.data!
            setDisableSubmit(false)
            setGenericMessage(errorData?.error)
            toggleGenericModal()
        },
    })
}



export const syncLogOutUser = (setDisableSubmit:React.Dispatch<React.SetStateAction<boolean>>) => {
    const Navigate = useNavigate()
    const queryClient = useQueryClient()
    const { toggleGenericModal, setGenericMessage } = modalStore()
    const mutationFunc = () => {
        return axios.post(`${serverUrl}/user/logout`, null, {
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
 


export const syncLogOutUserAllDevices = (setDisableSubmit:React.Dispatch<React.SetStateAction<boolean>>) => {
    const Navigate = useNavigate()
    const queryClient = useQueryClient()
    const { toggleGenericModal, setGenericMessage } = modalStore()
    const mutationFunc = () => {
        return axios.post(`${serverUrl}/user/logoutall`, null, {
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
 
 

export const syncFetchUserShippingInfo = () => {
    const { setGenericMessage, toggleGenericModal } = modalStore()
    const fetcherFunc = () => axios.get(`${serverUrl}/user/shippinginfo`,{
        withCredentials:true
    })
    
    return useQuery(['shippingInfo'],fetcherFunc,{
        select: data => data.data.shippingInfo,
        onError(error) {
            const errorData = (error as AxiosError<{error:string}>).response?.data!
            setGenericMessage(errorData?.error)
            toggleGenericModal()
        },
        refetchOnWindowFocus:false
    })
}
 