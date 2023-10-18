


import { Navigate, Outlet } from "react-router-dom"
import { RoleStore } from "@/Store/ClientStore/store-Role";

export function PublicAuth() {
    const { role } = RoleStore()

    if (role === 'user') {
        return <Navigate to='/user/profile'/>
    } else if (role === 'seller') {
        return <Navigate to='/seller/profile'/>
    } else if (role === 'public'){
        return <Outlet/>
    }
}
