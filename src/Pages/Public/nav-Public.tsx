import { NavLink, useNavigate } from "react-router-dom"
import SearchBar, { searchValues } from "../../components/searchBar"
import { filterStore } from "@/Store/ClientStore/store-Filters"
import { FaShoppingCart } from "react-icons/fa"
import { BsFillPersonFill } from "react-icons/bs"
import { defaultValues } from "@/Store/ClientStore/store-Constants"



function PublicNavbar() {
    
    const { setSearchObject, setResetBadgeToken, setResetPages } = filterStore()
    const Navigate = useNavigate()
    
    const handleSearch = (value:searchValues) => {
        window.scrollTo({ top: 0 })
        setSearchObject({...defaultValues, keyword:value.search})
        setResetBadgeToken()
        setResetPages()
        Navigate("/products")
    }
   

    return (
    <div className={`z-20 bg-slate-800 w-full h-14 xs:h-16 sm:h-14 fixed flex justify-center items-center`}> {/* sm:depthShadow */}
    
      <div className={`h-full w-screen max-w-[96rem] px-4 flex justify-between items-center`}>

          <div className={`h-[70%] flex items-center gap-x-4`}>
              <NavLink
              to={'/home'}
              className={`h-10 sm:h-8 xs:w-40 w-32 text-slate-200 font-bold rounded-md xs:text-lg xxs:text-base flex justify-center items-center hover:bg-slate-700 hover:text-white duration-100 active:bg-slate-800 ring-1 ring-slate-500 hover:ring-0`}>
                  MernBazaar
              </NavLink>
              <div className={`bg-slate-600 w-8 h-8 rounded-full`}/>
          </div>

          <div className="h-[70%] flex items-center">
              <div className={`bg-slate-800 rounded-lg hidden lg:block lg:w-[35rem]`}>
                  <SearchBar
                  onSearch={handleSearch} placeHolder="Search Products"/>
              </div>
          </div>

          <div className="h-[70%] flex items-center gap-x-4">
              <div className="h-[70%] flex items-center">
                  <div className={`bg-slate-800 rounded-lg hidden sm:w-72 sm:block lg:hidden`}>
                      <SearchBar
                      onSearch={handleSearch} placeHolder="Search Products"/>
                  </div>
              </div>
              <button className={`text-slate-200 w-8 aspect-square rounded-md justify-center items-center hover:text-white hover:bg-slate-700 active:bg-slate-800 transition-colors duration-100 flex xs:text-xl`}>
                  <FaShoppingCart/>
              </button>
              <button className={`h-5/6 w-20 bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 active:bg-slate-800 rounded-md font-semibold transition-colors duration-100 hidden md:block`}>
                  Log in
              </button>
              <button className={`bg-slate-800 text-slate-200 w-8 aspect-square rounded-md flex justify-center items-center text-xl hover:text-white hover:bg-slate-700 active:bg-slate-800 transition-colors duration-100 xs:text-2xl`}>
                  <BsFillPersonFill/>
              </button>
          </div>
      </div>

    </div>
    )
}

export default PublicNavbar