import { NavLink } from "react-router-dom"



function UserNavbar() {


    return (
        <div className={`w-screen h-16 bg-gray-600 flex items-center justify-around`}>
            <NavLink to="/home">HOME</NavLink>
            <NavLink to="/user/profile">Profile</NavLink>
            <NavLink to="/user/orders">Orders</NavLink>
            <NavLink to="/user/cart">Cart</NavLink>
        </div>
    )
}
 
export default UserNavbar


