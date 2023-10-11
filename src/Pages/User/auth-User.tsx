

import { Navigate, Outlet } from "react-router-dom"
import { userRoleStore } from "@/Store/ClientStore/store-UserRole";

export function UserAuth() {
    const { role } = userRoleStore()

    if (role === 'public') {
        return <Navigate to='/login/user'/>
    } else if (role === 'seller') {
        return <Navigate to='/seller/profile'/>
    } else if (role === 'user'){
        return <Outlet/>
    }
}
