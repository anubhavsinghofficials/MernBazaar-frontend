import { Navigate, Outlet } from "react-router-dom"
import UserRoleStore, { AuthRoleType } from "../Store/ClientStore/store-UserRole";


type AuthProps = {
    AuthRole: AuthRoleType;
}

export function ProtectedRoutes({AuthRole}:AuthProps) {
    const {role} = UserRoleStore()

    switch (role) {
        case AuthRole  :  return <Outlet/>
        case "public"  :  return <Navigate to="/signin"/>
        case "user"    :  return <Navigate to="/user/profile"/>
        case "seller"  :  return <Navigate to="/seller/profile"/>
        case "admin"   :  return <Navigate to="/admin/dashboard"/>
        default        :  return <Navigate to="/home"/>
    }
}