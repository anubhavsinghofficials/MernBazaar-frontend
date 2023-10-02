import { NavLink, useLocation, useNavigate } from "react-router-dom"
import SearchBar, { SearchFunction, searchValues } from "../../components/searchBar"
import { filterStore } from "@/Store/ClientStore/store-Filters"
import { FaShoppingCart } from "react-icons/fa"
import { BsFillPersonFill } from "react-icons/bs"
import { defaultValues } from "@/Store/ClientStore/store-Constants"


//   const handleSearch = (data: searchValues) => {
//     setSearchObject({ ...defaultValues, keyword: data.search })
//     setResetBadgeToken(prev => !prev)
//   }

//   return (
//     <div
//       className={`z-20 bg-slate-500 w-full h-14 xs:h-16 sm:h-14 fixed flex justify-center items-center depthShadow`}>
//       <div
//         className={`h-full w-screen max-w-[96rem] px-4 flex justify-between items-center`}>
//         <div className={`h-[70%] flex items-center gap-x-4`}>
//           <button
//             className={`h-10 sm:h-8 xs:w-40 w-32 text-slate-200 bg-slate-600 font-bold rounded-lg xs:text-lg xxs:text-base`}>
//             MernBazaar
//           </button>
//           <div className={`bg-slate-600 w-8 h-8 rounded-full`} />
//         </div>

//         <div className="h-[70%] flex items-center">
//           <div className={`bg-slate-600 rounded-lg hidden lg:block lg:w-[35rem]`}>
//             <SearchBar
//               onSearch={handleSearch}
//               placeHolder="Search Products"
//             />
//           </div>
//         </div>

//         <div className="h-[70%] flex items-center gap-x-4">
//           <div className="h-[70%] flex items-center">
//             <div className={`bg-slate-600 rounded-lg hidden sm:w-72 sm:block lg:hidden`}>
//               <SearchBar
//                 onSearch={handleSearch}
//                 placeHolder="Search Products"
//               />
//             </div>
//           </div>
//           <button
//             className={`text-slate-200 w-8 aspect-square rounded-lg justify-center items-center hover:text-white bg-slate-700 shadow-md active:text-slate-200 active:shadow-none transition-colors duration-100 flex`}>
//             <FaShoppingCart />
//           </button>
//           <button
//             className={`h-5/6 w-20 bg-slate-700 text-slate-200 hover:text-white rounded-md font-semibold shadow-md active:text-slate-300 active:shadow-none transition-colors duration-100 hidden md:block`}>
//             Log in
//           </button>
//           <button
//             className={`bg-slate-700 text-slate-200 w-8 aspect-square rounded-lg flex justify-center items-center text-xl hover:text-white shadow-md active:text-slate-300 active:shadow-none transition-colors duration-100`}>
//             <BsFillPersonFill />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PublicNavbar

function PublicNavbar() {
    
    const keyword = useLocation().state
    const { setSearchObject, setResetBadgeToken } = filterStore()
    const Navigate = useNavigate()
    const onSearch:SearchFunction = (data) => {
        Navigate("/products",{state:data.search})
    }

    const handleSearch = (data:searchValues) => {
      setSearchObject({...defaultValues, keyword:data.search})
      setResetBadgeToken()
  }
   

    return (
    <div className={`z-20 bg-slate-500 w-full h-14 xs:h-16 sm:h-14 fixed flex justify-center items-center sm:depthShadow`}>
            
      <div className={`h-full w-screen max-w-[96rem] px-4 flex justify-between items-center`}>

          <div className={`h-[70%] flex items-center gap-x-4`}>
              <button className={`h-10 sm:h-8 xs:w-40 w-32 text-slate-200 bg-slate-600 font-bold rounded-lg xs:text-lg xxs:text-base`}>
                  MernBazaar
              </button>
              <div className={`bg-slate-600 w-8 h-8 rounded-full`}/>
          </div>

          <div className="h-[70%] flex items-center">
              <div className={`bg-slate-600 rounded-lg hidden lg:block lg:w-[35rem]`}>
                  <SearchBar
                  onSearch={handleSearch} placeHolder="Search Products"/>
              </div>
          </div>

          <div className="h-[70%] flex items-center gap-x-4">
              <div className="h-[70%] flex items-center">
                  <div className={`bg-slate-600 rounded-lg hidden sm:w-72 sm:block lg:hidden`}>
                      <SearchBar
                      onSearch={handleSearch} placeHolder="Search Products"/>
                  </div>
              </div>
              <button className={`text-slate-200 w-8 aspect-square rounded-lg justify-center items-center hover:text-white bg-slate-700 shadow-md active:text-slate-200 active:shadow-none transition-colors duration-100 flex`}>
                  <FaShoppingCart/>
              </button>
              <button className={`h-5/6 w-20 bg-slate-700 text-slate-200 hover:text-white rounded-md font-semibold shadow-md active:text-slate-300 active:shadow-none transition-colors duration-100 hidden md:block`}>
                  Log in
              </button>
              <button className={`bg-slate-700 text-slate-200 w-8 aspect-square rounded-lg flex justify-center items-center text-xl hover:text-white shadow-md active:text-slate-300 active:shadow-none transition-colors duration-100`}>
                  <BsFillPersonFill/>
              </button>
          </div>
      </div>

    </div>
    )
}

export default PublicNavbar



{/* <div className={`w-screen h-16 bg-gray-600 flex items-center justify-around`}>
<div className={`w-96`}>
    <SearchBar onSearch={onSearch}
               placeHolder="Search MernBazaar.com" />
</div>
<NavLink to="/home"
        className={`bg-gray-700 px-2 py-1`}>
        Home
</NavLink>
<NavLink to="/signin"
        className={`bg-gray-700 px-2 py-1`}>
        Login
</NavLink>
<NavLink to="/products"
        className={`bg-gray-700 px-2 py-1`}>
        Products
</NavLink>
</div> */}