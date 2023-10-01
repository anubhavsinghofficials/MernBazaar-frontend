import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from "./Pages/Shared/page_Home"
import { ProtectedRoutes } from "./Auth/ProtectedRoutes"
import SignIn from "./Pages/Public/page-SignIn"
import SignUp from "./Pages/Public/page-SignUp"
import ProductsPage from "./Pages/Shared/page-Products"
import ProductDetailsPage from "./Pages/Shared/page-ProductDetails"
import UserProfile from "./Pages/User/page-UserProfile"
import UserOrders from "./Pages/User/page-UserOrders"
import UserCart from "./Pages/User/page-UserCart"
import SellerProfile from "./Pages/Seller/page-SellerProfile"
import AddProducts from "./Pages/Seller/page-AddProducts"
import EditProduct from "./Pages/Seller/page-EditProduct"
import SellerProducts from "./Pages/Seller/page-SellerProducts"
import AdminDashBoard from "./Pages/Admin/page-AdminDash"
import UserNavbar from "./Pages/User/nav-User"
import AdminNavbar from "./Pages/Admin/nav-Admin"
import PublicNavbar from './Pages/Public/nav-Public'
import SellerNavbar from './Pages/Seller/nav-Seller'
import UserRoleStore from './Store/ClientStore/store-UserRole'


function App() {

  const { role } = UserRoleStore()

  return (
    <div className={`w-screen h-screen bg-black`}>

      {
        [
          { role: "user",   element: <UserNavbar/>   },
          { role: "seller", element: <SellerNavbar/> },
          { role: "admin",  element: <AdminNavbar/>  },
          { role: "public", element: <PublicNavbar/> },
        ] .find(menu => (menu.role === role))?.element
      }

      <Routes>
        <Route path="/Home" element={<HomePage/>}/>
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/product/:id" element={<ProductDetailsPage/>}/>
        
        
        <Route path="/" element={<ProtectedRoutes AuthRole='public'/>}>
          <Route index element={<Navigate to="home"/>}/>
          <Route path="signup" element={<SignUp/>}/>
          <Route path="signin" element={<SignIn/>}/>
          <Route path="*" element={<Navigate to="signin"/>}/>
        </Route>

        
        <Route path="/user" element={<ProtectedRoutes AuthRole='user'/>}>
          <Route index element={<Navigate to="profile"/>}/>
          <Route path="profile" element={<UserProfile/>}/>
          <Route path="orders" element={<UserOrders/>}/>
          <Route path="cart" element={<UserCart/>}/>
          <Route path="*" element={<Navigate to="profile"/>}/>
        </Route>

        
        <Route path="/seller" element={<ProtectedRoutes AuthRole='seller'/>}>
          <Route index element={<Navigate to="profile"/>}/>
          <Route path="profile" element={<SellerProfile/>}/>
          <Route path="product/add" element={<AddProducts/>}/>
          <Route path="product/edit" element={<EditProduct/>}/>
          <Route path="products" element={<SellerProducts/>}/>
          <Route path="*" element={<Navigate to="profile"/>}/>
        </Route>

      
        <Route path="/admin" element={<ProtectedRoutes AuthRole='admin'/>}>
          <Route index element={<Navigate to="dash"/>}/>
          <Route path="dashboard" element={<AdminDashBoard/>}/>
          <Route path="*" element={<Navigate to="dashboard"/>}/>
        </Route>


        <Route path="*" element={<Navigate to="/home"/>}/>
      </Routes>

    </div>
  )
}

export default App
