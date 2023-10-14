
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { serverUrl } from '../ClientStore/store-Constants'
import axios from 'axios'
import { SellerLogInFormType, SellerSignUpFormType } from '@/Pages/Public/FormValidators/type-seller'




export const syncRegisterSeller = () => {
    const queryClient = useQueryClient()
    const mutationFunc = (sellerData:SellerSignUpFormType) => {
        return axios.post(`${serverUrl}/seller/register`, sellerData, {
            withCredentials: true,
        })
    }
    return useMutation(mutationFunc,{
        onSuccess() {
            queryClient.invalidateQueries(['userRole'])
        },
    })
}
 


export const syncLoginSeller = () => {
    const queryClient = useQueryClient()
    const mutationFunc = (sellerData:SellerLogInFormType) => {
        return axios.post(`${serverUrl}/seller/login`, sellerData, {
            withCredentials: true,
        })
    }
    return useMutation(mutationFunc,{
        onSuccess(_data, _variables, _context) {
            queryClient.invalidateQueries(['userRole'])
        },
    })
}
 
