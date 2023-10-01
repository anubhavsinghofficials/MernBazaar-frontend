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


// navigate along with a state and show message there,
// sent message directly from here through state or just
// send some type of code (?) or just a switch (?) and
// give custom message there ??
// also take care of senerios when no state sent, like
// url manip or any other navigations