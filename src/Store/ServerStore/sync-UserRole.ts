
import { useQuery } from '@tanstack/react-query'
import { serverUrl } from '../ClientStore/store-Constants'
import axios from 'axios'
import { userRoleStore } from '../ClientStore/store-UserRole'



export const syncGetUserRole = () => {
    const { setRole } = userRoleStore()
    const fetcherFunc = () => axios.get(`${serverUrl}/authrole`,{
        withCredentials:true,
    })

    return useQuery(['userRole'],fetcherFunc,{
        select(data) {
            return data.data
        },
        onSuccess(data) {
            setRole(data.role)
            console.log(data)
        },
        refetchOnWindowFocus: false,
    })
}
 