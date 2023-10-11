

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BsFillPersonFill } from "react-icons/bs"
import { FaUserAlt } from "react-icons/fa"
import { FaShop } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"


function PublicNavOptions() {
    const Navigate = useNavigate()
    return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <button className={`bg-slate-800 text-slate-200 w-8 aspect-square rounded-md flex justify-center items-center text-xl hover:text-white hover:bg-slate-700 active:bg-slate-800 transition-colors duration-100 xs:text-2xl`}>
                <BsFillPersonFill/>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-slate-700 bg-opacity-90 backdrop-blur-md border-slate-600 text-white pb-3 scale-100 xs:scale-125 sm:scale-110 origin-top-right">
            <DropdownMenuLabel className="flex items-center gap-x-3 pl-2 pr-6">
                <FaUserAlt/>
                User Account
            </DropdownMenuLabel>
            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white px-4 focus:bg-opacity-60 py-2"
            onClick={() => Navigate('/login/user')}>
                Login
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white px-4 focus:bg-opacity-60 py-2"
            onClick={() => Navigate('/register/user')}>
                Create Account
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-600"/>
            <DropdownMenuLabel className="flex items-center gap-x-3 pl-2 pr-6">
                <FaShop/>
                Seller Account
            </DropdownMenuLabel>
            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white px-4 focus:bg-opacity-60 py-2"
            onClick={() => Navigate('/login/seller')}>
                Login
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white px-4 focus:bg-opacity-60 py-2"
            onClick={() => Navigate('/register/seller')}>
                Create Account
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>   
    )
}
 
export default PublicNavOptions