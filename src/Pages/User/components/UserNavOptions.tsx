

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BsCartCheckFill, BsFillBox2HeartFill, BsFillPersonFill } from "react-icons/bs"
import { FaUserAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"


function UserNavOptions() {
    const Navigate = useNavigate()
    return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <button className={`bg-slate-800 text-slate-200 w-8 aspect-square rounded-md flex justify-center items-center text-xl hover:text-white hover:bg-slate-700 active:bg-slate-800 transition-colors duration-100 xs:text-2xl`}>
                <BsFillPersonFill/>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-slate-700 bg-opacity-90 backdrop-blur-md border-slate-600 text-white pb-3 scale-100 xs:scale-125 sm:scale-110 origin-top-right">
            <DropdownMenuLabel className="flex items-center gap-x-3 pl-4 pr-6">
                User
            </DropdownMenuLabel>
            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white px-4 focus:bg-opacity-60 flex gap-x-4 py-2"
            onClick={() => Navigate('/user/cart')}>
                <BsCartCheckFill/>
                Cart
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white px-4 focus:bg-opacity-60 flex gap-x-4 py-2"
            onClick={() => Navigate('/user/orders')}>
                <BsFillBox2HeartFill/>
                My Orders
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white px-4 focus:bg-opacity-60 flex gap-x-4 py-2"
            onClick={() => Navigate('/user/profile')}>
                <FaUserAlt/>
                Profile
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>   
    )
}
 
export default UserNavOptions