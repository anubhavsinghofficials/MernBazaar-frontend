

import { modalStore } from "@/Store/ClientStore/store-Modals"
import { syncLogOutSeller } from "@/Store/ServerStore/sync-Seller"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { AiFillShop, AiFillStar } from "react-icons/ai"
import { BiSolidDashboard } from "react-icons/bi"
import { BsShopWindow } from "react-icons/bs"
import { FaKey, FaPlus, FaPowerOff, FaUserAlt, FaUsers } from "react-icons/fa"
import { RxBorderWidth } from "react-icons/rx"
import { useNavigate } from "react-router-dom"


function SellerNavOptions() {
    const Navigate = useNavigate()
    const { setGenericSubtitle,setGenericTitle, setGenericFunction, toggleGenericConfirmModal } = modalStore()
    const [_Editable, setEditable] = useState(false)
    const { mutate:logOutSeller } = syncLogOutSeller(setEditable)

    const logOut = () => {
        setGenericTitle("Confirm to Logout from this device")
        setGenericSubtitle("you will have to login again to access your data")
        setGenericFunction(logOutSeller)
        toggleGenericConfirmModal()
     }

    return (
    <DropdownMenu>
        <DropdownMenuTrigger className="bg-slate-800 text-slate-200 rounded-md flex justify-center items-end text-xl hover:text-white hover:bg-slate-700 active:bg-slate-800 transition-colors duration-100 xs:text-2xl font-semibold py-2 px-2 md:px-4 gap-x-2">
            <BsShopWindow className={`text-2xl md:text-lg`}/>
            <span className={`text-lg leading-[1rem] hidden md:block`}>
                Me
            </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-slate-700 bg-opacity-90 backdrop-blur-md border-slate-600 text-white pb-3 scale-100 xs:scale-125 sm:scale-110 origin-top-right">
            <DropdownMenuLabel className="pl-4 hidden sm:block md:hidden pt-3">
                DashBoard
            </DropdownMenuLabel>
            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white px-4 focus:bg-opacity-60 py-2  gap-x-4 hidden sm:flex md:hidden"
            onClick={() => Navigate('/seller/analytics')}>
                <AiFillStar/>
                Analytics
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white px-4 focus:bg-opacity-60 py-2  gap-x-4 hidden sm:flex md:hidden"
            onClick={() => Navigate('/seller/orders')}>
                <RxBorderWidth/>
                Orders
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white px-4 focus:bg-opacity-60 py-2  gap-x-4 hidden sm:flex md:hidden"
            onClick={() => Navigate('/seller/users')}>
                <FaUsers/>
                Users
            </DropdownMenuItem>


            <DropdownMenuLabel className="pl-4 hidden sm:block md:hidden pt-3">
                Products
            </DropdownMenuLabel>
            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white px-4 focus:bg-opacity-60 py-2  gap-x-4 hidden sm:flex md:hidden"
            onClick={() => Navigate('/seller/products')}>
                <AiFillShop/>
                My Products
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white px-4 focus:bg-opacity-60 py-2  gap-x-4 hidden sm:flex md:hidden"
            onClick={() => Navigate('/seller/product/new')}>
                <FaPlus/>
                Create Products
            </DropdownMenuItem>


            <DropdownMenuLabel className="pl-4 hidden sm:block md:hidden pt-3">
                Account
            </DropdownMenuLabel>
            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white px-4 focus:bg-opacity-60 py-2 flex gap-x-4"
            onClick={() => Navigate('/seller/profile')}>
                <FaUserAlt/>
                My Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white px-4 focus:bg-opacity-60 py-2 gap-x-4 flex sm:hidden md:flex"
            onClick={() => Navigate('/seller/dashboard')}>
                <BiSolidDashboard/>
                DashBoard
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white px-4 focus:bg-opacity-60 py-2 flex gap-x-4"
            onClick={() => Navigate('/seller/password')}>
                <FaKey/>
                Change Password
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-red-800 focus:text-slate-50 px-4 focus:bg-opacity-60 py-2 flex gap-x-4"
            onClick={logOut}>
                <FaPowerOff/>
                Log Out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>   
    )
}
 
export default SellerNavOptions