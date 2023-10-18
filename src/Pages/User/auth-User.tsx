

import { Navigate, Outlet } from "react-router-dom"
import { RoleStore } from "@/Store/ClientStore/store-Role";

export function UserAuth() {
    const { role } = RoleStore()

    if (role === 'public') {
        return <Navigate to='/login/user'/>
    } else if (role === 'seller') {
        return <Navigate to='/seller/profile'/>
    } else if (role === 'user'){
        return <Outlet/>
    }
}
