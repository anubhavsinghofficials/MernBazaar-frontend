import { useNavigate } from 'react-router-dom';
import { userProfileType } from './../../Pages/User/page-UserProfile';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { serverUrl } from '../ClientStore/store-Constants'
import axios, { AxiosError } from 'axios'
import { UserLogInFormType, UserSignUpFormType } from '@/Pages/Public/FormValidators/type-user'
import { passwordsType } from '@/Pages/User/page-UserPasswordUpdate';
import { modalStore } from '../ClientStore/store-Modals';




export const syncRegisterUser = () => {
    const queryClient = useQueryClient()
    const mutationFunc = (userData:UserSignUpFormType) => {
        return axios.post(`${serverUrl}/user/register`, userData, {
            withCredentials: true,
        })
    }
    return useMutation(mutationFunc,{
        onSuccess() {
            queryClient.invalidateQueries(['userRole'])
        },
    })
}
 


export const syncLoginUser = () => {
    const queryClient = useQueryClient()
    const mutationFunc = (userData:UserLogInFormType) => {
        return axios.post(`${serverUrl}/user/login`, userData, {
            withCredentials: true,
        })
    }
    return useMutation(mutationFunc,{
        onSuccess(_data, _variables, _context) {
            queryClient.invalidateQueries(['userRole'])
        },
    })
}



export const syncFetchUserDetails = () => {
    const fetcherFunc = () => axios.get(`${serverUrl}/user`, {
        withCredentials: true,
    })
    return useQuery(['userDetails'], fetcherFunc, {
        select(data) {
            return data.data.user
        },
        refetchOnWindowFocus: false,
    })
}



export const syncUpdateUserDetails = (setEditable:React.Dispatch<React.SetStateAction<boolean>>) => {
    const queryClient = useQueryClient()
    const mutationFunc = (userData:userProfileType) => {
        return axios.patch(`${serverUrl}/user`, userData, {
            withCredentials: true,
        })
    }
    return useMutation(mutationFunc,{
        onSuccess(_data, _variables, _context) {
            setEditable(false)
            queryClient.invalidateQueries(['userDetails'])
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
            queryClient.invalidateQueries(['userRole'])
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
            queryClient.invalidateQueries(['userRole'])
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
 
 
