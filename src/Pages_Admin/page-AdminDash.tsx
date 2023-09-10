import { useLocation } from "react-router-dom"



function AdminDashBoard() {
   const location = useLocation()

   location.pathname
   
    return (
             <>
                <div className={`card`}>
                   Admin Dash Board page
                </div>
             </>
    )
}
 
export default AdminDashBoard