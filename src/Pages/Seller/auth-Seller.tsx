

import { Navigate, Outlet } from "react-router-dom"
import { RoleStore } from "@/Store/ClientStore/store-Role";

export function SellerAuth() {
    const { role } = RoleStore()

    if (role === 'public') {
        return <Navigate to='/login/seller'/>
    } else if (role === 'user'){
        return <Navigate to='/user/profile'/>
    } else if (role === 'seller') {
        return <Outlet/>
    }
}

// send the states of messages too !!