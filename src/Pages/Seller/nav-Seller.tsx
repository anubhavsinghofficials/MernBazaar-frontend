import { NavLink } from "react-router-dom"



function SellerNavbar() {
    

    return (
        <div className={`w-screen h-16 bg-gray-600 flex items-center justify-around`}>
            <NavLink to="/home">HOME</NavLink>
            <NavLink to="/seller/profile">Profile</NavLink>
            <NavLink to="/seller/product/add">Add Products</NavLink>
            <NavLink to="/seller/product/edit">Edit Products</NavLink>
            <NavLink to="/seller/products">Seller Products</NavLink>
        </div>
    )
}




export default SellerNavbar


