import { NavLink, useNavigate } from "react-router-dom"
import SearchBar, {SearchFunction} from "../../components/searchBar"



function PublicNavbar() {

    const Navigate = useNavigate()
    const onSearch:SearchFunction = (data) => {
        Navigate("/products",{state:data.search})
    }

    return (
             <div className={`w-screen h-16 bg-gray-600 flex items-center justify-around`}>
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
             </div>
    )
}
 
export default PublicNavbar