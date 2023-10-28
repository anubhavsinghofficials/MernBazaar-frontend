
import { defaultValues } from '@/Store/ClientStore/store-Constants'
import { filterStore } from '@/Store/ClientStore/store-Filters'
import SearchBar, { searchValues } from '@/components/searchBar'
import { BiSolidDashboard } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AiFillShop, AiFillStar } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'


function DashboardTopMenu() {

    
    const { setSearchObject } = filterStore()
    const Navigate = useNavigate()

    const handleSearch = (value: searchValues) => {
        setSearchObject({...defaultValues, keyword:value.search})
        window.scrollTo({ top: 0 })
        Navigate("/products")
    }
    

    
    return (
        <div className={`bg-white w-full md:hidden shadow-md rounded-md`}>
            <div className={`w-full min-w-0 px-2 py-2 xs:py-3 xs:px-4 bg-slate-800 sm:hidden flex items-center`}
            >
                <DropdownMenu>
                    <DropdownMenuTrigger className='px-2 pr-4'>
                        <BiSolidDashboard className={`text-slate-100 text-3xl`}/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-slate-700 bg-opacity-90 backdrop-blur-md border-slate-600 text-white pb-3 scale-100 xs:scale-125 sm:scale-110 origin-top-left"
                    >
                        <DropdownMenuItem className="focus:bg-slate-800 focus:text-white px-4 focus:bg-opacity-60 py-2 flex gap-x-4"
                        onClick={() => Navigate('/seller/products')}>
                           <AiFillShop/>
                           My Products
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-slate-800 focus:text-white px-4 focus:bg-opacity-60 py-2 flex gap-x-4"
                        onClick={() => Navigate('/seller/products/new')}>
                            <FaPlus/>
                            Add a new Product
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-slate-800 focus:text-white px-4 focus:bg-opacity-60 py-2 flex gap-x-4"
                        onClick={() => Navigate('/seller/score')}>
                            <AiFillStar/>
                            My Score
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <SearchBar
                    onSearch={handleSearch}
                    placeHolder="Search Products"
                />
            </div>
        </div>
    )
}
 
export default DashboardTopMenu