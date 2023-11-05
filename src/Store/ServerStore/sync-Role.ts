
import { useQuery } from '@tanstack/react-query'
import { SERVER_URL } from '../ClientStore/store-Constants'
import axios from 'axios'
import { RoleStore } from '../ClientStore/store-Role'
import { siteDataStore } from '../ClientStore/store-SiteData'



export const syncGetRole = () => {
    const { setRole } = RoleStore()
    const { setCartCount } = siteDataStore()
    const fetcherFunc = () => axios.get(`${SERVER_URL}/authrole`,{
        withCredentials:true,
    })

    return useQuery(['Role'],fetcherFunc,{
        select(data) {
            return data.data
        },
        onSuccess(data) {
            setRole(data.role)
            setCartCount(data.cartCount)
        },
        refetchOnWindowFocus: false,
    })
}
 