
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { serverUrl } from '../ClientStore/store-Constants'
import axios from 'axios'
import { UserLogInFormType, UserSignUpFormType } from '@/Pages/Public/FormValidators/type-user'




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
 
