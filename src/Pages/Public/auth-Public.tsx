


import { Navigate, Outlet } from "react-router-dom"
import { userRoleStore } from "@/Store/ClientStore/store-UserRole";

export function PublicAuth() {
    const { role } = userRoleStore()

    if (role === 'user') {
        return <Navigate to='/user/profile'/>
    } else if (role === 'seller') {
        return <Navigate to='/seller/profile'/>
    } else if (role === 'public'){
        return <Outlet/>
    }
}
