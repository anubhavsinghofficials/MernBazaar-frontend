import { Navigate, Outlet } from "react-router-dom"
import { AuthRoleType, RoleStore } from "../Store/ClientStore/store-Role";

type AuthProps = {
    AuthRole: AuthRoleType;
}

export function ProtectedRoutes({AuthRole}:AuthProps) {
    const {role} = RoleStore()

    switch (role) {
        case AuthRole  :  return <Outlet/>
        case "public"  :  return <Navigate to="/login/user"/>
        case "user"    :  return <Navigate to="/user/profile"/>
        case "seller"  :  return <Navigate to="/seller/profile"/>
        default        :  return <Navigate to="/home"/>
    }
}