import { NavLink } from "react-router-dom"



function AdminNavbar() {
    

    return (
        <div className={`w-screen h-16 bg-gray-600 flex items-center justify-around`}>
            <NavLink to="/home">HOME</NavLink>
            <NavLink to="/admin/dashboard">Admin Dash</NavLink>
        </div>
    )
}



export default AdminNavbar


