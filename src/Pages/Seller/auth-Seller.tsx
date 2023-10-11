

import { Navigate, Outlet } from "react-router-dom"
import { userRoleStore } from "@/Store/ClientStore/store-UserRole";

export function SellerAuth() {
    const { role } = userRoleStore()

    if (role === 'public') {
        return <Navigate to='/login/seller'/>
    } else if (role === 'user'){
        return <Navigate to='/user/profile'/>
    } else if (role === 'seller') {
        return <Outlet/>
    }
}

// send the states of messages too !!