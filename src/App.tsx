import { Routes, Route, Navigate } from "react-router-dom"
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
import UserNavbar from "./Pages/User/nav-User"
import PublicNavbar from "./Pages/Public/nav-Public"
import SellerNavbar from "./Pages/Seller/nav-Seller"
import { userRoleStore } from "./Store/ClientStore/store-UserRole"
import TailwindScreenDetector from "./components/screenDetector"

function App() {
  const { role } = userRoleStore()

  return (
    <div className={`w-screen h-screen bg-slate-200 sm:overflow-x-hidden`}>
      {
        [
          { role: "user", element: <UserNavbar /> },
          { role: "seller", element: <SellerNavbar /> },
          { role: "public", element: <PublicNavbar /> },
        ].find(menu => menu.role === role)?.element
      }

      <Routes>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/product/:id" element={<ProductDetailsPage/>}/>

        <Route path="/" element={<ProtectedRoutes AuthRole="public"/>}>
          <Route index element={<Navigate to="home"/>}/>
          <Route path="signup" element={<SignUp/>}/>
          <Route path="signin" element={<SignIn/>}/>
          <Route path="*" element={<Navigate to="signin" />}/>
        </Route>

        <Route path="/user" element={<ProtectedRoutes AuthRole="user" />}>
          <Route index element={<Navigate to="profile"/>}/>
          <Route path="profile" element={<UserProfile/>}/>
          <Route path="orders" element={<UserOrders/>}/>
          <Route path="cart" element={<UserCart/>}/>
          <Route path="*" element={<Navigate to="profile" />}/>
        </Route>

        <Route path="/seller" element={<ProtectedRoutes AuthRole="seller" />}>
          <Route index element={<Navigate to="profile"/>}/>
          <Route path="profile" element={<SellerProfile/>}/>
          <Route path="product/add" element={<AddProducts/>}/>
          <Route path="product/edit" element={<EditProduct/>}/>
          <Route path="products" element={<SellerProducts/>}/>
          <Route path="*" element={<Navigate to="profile"/>}/>
        </Route>

        <Route path="*" element={<Navigate to="/home" />}/>
      </Routes>

      <TailwindScreenDetector/>
      <div className={`h-[10rem] bg-blue-400`} />
    </div>

  )
}

export default App
