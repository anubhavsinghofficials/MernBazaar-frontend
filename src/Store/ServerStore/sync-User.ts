import { useNavigate } from 'react-router-dom';
import { userProfileType } from './../../Pages/User/page-UserProfile';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SERVER_URL } from '../ClientStore/store-Constants'
import axios, { AxiosError } from 'axios'
import { UserLogInFormType, UserSignUpFormType } from '@/Pages/Public/FormValidators/type-user'
import { passwordsType } from '@/Pages/User/page-UserPasswordUpdate';
import { modalStore } from '../ClientStore/store-Modals';
import { cartItemType } from '@/Pages/User/components/CartItemsBox';


export type boolSetStateType = React.Dispatch<React.SetStateAction<boolean>>
export type numSetStateType = React.Dispatch<React.SetStateAction<number>>



export const syncRegisterUser = (setDisableSubmit:boolSetStateType) => {
    const queryClient = useQueryClient()
    const Navigate = useNavigate()
    const { toggleGenericToast, setGenericToastMessage, setGenericToastType } = modalStore()
    const { toggleGenericModal, setGenericMessage } = modalStore()
    const mutationFunc = (userData:UserSignUpFormType) => {
        return axios.post(`${SERVER_URL}/user/register`, userData, {
            withCredentials: true,
        })
    }

    return useMutation(mutationFunc,{
        onSuccess(data) {
            queryClient.invalidateQueries(['Role'])
            setGenericToastMessage(data.data.message)
            setGenericToastType('success')
            setTimeout(() => {
                toggleGenericToast(true)
            }, 1000);
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
    const { toggleGenericToast, setGenericToastMessage, setGenericToastType } = modalStore()
    const { toggleGenericModal, setGenericMessage } = modalStore()
    const Navigate = useNavigate()

    const mutationFunc = (userData:UserLogInFormType) => {
        return axios.post(`${SERVER_URL}/user/login`, userData, {
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
    
    const fetcherFunc = () => axios.get(`${SERVER_URL}/user`, {
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
    const { toggleGenericToast, setGenericToastMessage, setGenericToastType } = modalStore()
    const queryClient = useQueryClient()
    
    const mutationFunc = (userData:userProfileType) => {
        return axios.patch(`${SERVER_URL}/user`, userData, {
            withCredentials: true,
        })
    }
    return useMutation(mutationFunc,{
        onSuccess() {
            setEditable(false)
            setDisableSubmit(false)
            queryClient.invalidateQueries(['userDetails'])
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



export const syncUpdateUserPassword = (setDisableSubmit:boolSetStateType) => {
    const { toggleGenericModal, setGenericMessage } = modalStore()
    const { toggleGenericToast, setGenericToastMessage, setGenericToastType } = modalStore()
    const Navigate = useNavigate()
    const mutationFunc = (passwords:passwordsType) => {
       return axios.patch(`${SERVER_URL}/user/password`, passwords, {
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



export const syncLogOutUser = (setDisableSubmit:boolSetStateType) => {
    const Navigate = useNavigate()
    const queryClient = useQueryClient()
    const { toggleGenericModal, setGenericMessage } = modalStore()
    const mutationFunc = () => {
        return axios.post(`${SERVER_URL}/user/logout`, null, {
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
 


export const syncLogOutUserAllDevices = (setDisableSubmit:boolSetStateType) => {
    const Navigate = useNavigate()
    const queryClient = useQueryClient()
    const { toggleGenericModal, setGenericMessage } = modalStore()
    const mutationFunc = () => {
        return axios.post(`${SERVER_URL}/user/logoutall`, null, {
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
    const fetcherFunc = () => axios.get(`${SERVER_URL}/user/shippinginfo`,{
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
 
 
export const syncFetchUserCart = (setSubTotal:numSetStateType, setTotalProducts:numSetStateType) => {
    const { setGenericMessage, toggleGenericModal } = modalStore()
    const fetcherFunc = () => axios.get(`${SERVER_URL}/user/cart`,{
        withCredentials:true
    })
    
    return useQuery(['cart'],fetcherFunc,{
        select: data => data.data.cart,
        onSuccess(data) {
            let newSubTotal = 0
            let newTotalProducts = 0
            data.forEach((element:cartItemType) => {
                newSubTotal += element.price*element.quantity
                newTotalProducts += element.quantity
            })
            setSubTotal(newSubTotal)
            setTotalProducts(newTotalProducts)
        },
        onError(error) {
            const errorData = (error as AxiosError<{error:string}>).response?.data!
            setGenericMessage(errorData?.error)
            toggleGenericModal()
        },
        refetchOnWindowFocus:false
    })
}




export const syncAddToCart = (setDisableCartButton:boolSetStateType,toast=true) => {
    const { setGenericMessage, toggleGenericModal } = modalStore()
    const { toggleGenericToast, setGenericToastMessage, setGenericToastType } = modalStore()
    const queryClient = useQueryClient()
    
    const mutationFunc = (cartProduct:Omit<cartItemType,"_id">) => {
        return axios.patch(`${SERVER_URL}/user/cart`,cartProduct,{
            withCredentials:true
        })
    }
    return useMutation(mutationFunc,{
        onSuccess(data){
            queryClient.invalidateQueries(['cart'])
            if (toast) {
                setGenericToastMessage(data.data.message)
                setGenericToastType('success')
                setTimeout(() => {
                    setDisableCartButton(false)
                    toggleGenericToast(true)
                }, 1000)
            }
        },
        onError(error) {
            const errorData = (error as AxiosError<{error:string}>).response?.data!
            setGenericMessage(errorData?.error)
            toggleGenericModal()
            setDisableCartButton(false)
        },
    })
}
 



export const syncDeleteCartProduct = (setDisableCartButton:boolSetStateType) => {
    const { setGenericMessage, toggleGenericModal } = modalStore()
    const queryClient = useQueryClient()
    
    const mutationFunc = (productId:string) => {
        return axios.delete(`${SERVER_URL}/user/cart/${productId}`,{
            withCredentials:true
        })
    }
    return useMutation(mutationFunc,{
        onSuccess(_data){
            queryClient.invalidateQueries(['cart'])
        },
        onError(error) {
            const errorData = (error as AxiosError<{error:string}>).response?.data!
            setGenericMessage(errorData?.error)
            toggleGenericModal()
            setDisableCartButton(false)
        },
    })
}
 