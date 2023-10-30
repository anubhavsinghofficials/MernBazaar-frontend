

import { Navigate, Outlet } from "react-router-dom"
import { RoleStore } from "@/Store/ClientStore/store-Role";
import DashboardSideMenu from "./components/DashboardSideMenu";
import DashboardTopMenu from "./components/DashboardTopMenu";

export function SellerAuth() {
    const { role } = RoleStore()

    if (role === 'public') {
        return <Navigate to='/login/seller'/>
    } else if (role === 'user'){
        return <Navigate to='/user/profile'/>
    }
    
    
    else if (role === 'seller') {

        return (
            <div className={`w-screen max-w-[96rem] m-auto min-h-screen flex flex-col md:flex-row items-center gap-x-2 lg:gap-x-4 bg-slate-200 pt-14 xs:pt-16 sm:pt-14 md:px-4`}>
                <DashboardSideMenu/>
                <DashboardTopMenu/>
                <div className={`grow-0 md:grow self-start mt-6 mb-4 mx-auto`}>
                    <Outlet/>
                </div>
            </div>
        )
    }
}