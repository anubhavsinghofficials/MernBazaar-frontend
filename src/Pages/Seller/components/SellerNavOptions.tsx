

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
import { MdRateReview } from "react-icons/md"
import { SiCodereview } from "react-icons/si"
import { useNavigate } from "react-router-dom"


function SellerNavOptions() {
    const Navigate = useNavigate()
    return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <button className={`bg-slate-800 text-slate-200 w-8 aspect-square rounded-md flex justify-center items-center text-xl hover:text-white hover:bg-slate-700 active:bg-slate-800 transition-colors duration-100 xs:text-2xl`}>
                <BsFillPersonFill/>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-slate-700 bg-opacity-90 backdrop-blur-md border-slate-600 text-white pb-3 scale-100 xs:scale-125 sm:scale-110 origin-top-right">
            <DropdownMenuLabel className="flex items-center gap-x-3 pl-4 pr-14">
                Seller
            </DropdownMenuLabel>
            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white px-4 focus:bg-opacity-60 py-2 flex gap-x-4"
            onClick={() => Navigate('/seller/profile')}>
                <FaUserAlt/>
                Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-slate-800 focus:text-white px-4 focus:bg-opacity-60 py-2 flex gap-x-4"
            onClick={() => Navigate('/seller/reviews')}>
                <SiCodereview/>
                Reviews
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>   
    )
}
 
export default SellerNavOptions