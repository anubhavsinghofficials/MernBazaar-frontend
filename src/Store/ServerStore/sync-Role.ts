
import { useQuery } from '@tanstack/react-query'
import { serverUrl } from '../ClientStore/store-Constants'
import axios from 'axios'
import { RoleStore } from '../ClientStore/store-Role'



export const syncGetRole = () => {
    const { setRole } = RoleStore()
    const fetcherFunc = () => axios.get(`${serverUrl}/authrole`,{
        withCredentials:true,
    })

    return useQuery(['Role'],fetcherFunc,{
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
 