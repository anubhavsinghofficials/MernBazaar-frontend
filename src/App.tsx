import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./Pages/Shared/page_Home"
import ProductsPage from "./Pages/Shared/page-Products"
import ProductDetailsPage from "./Pages/Shared/page-ProductDetails"
import UserProfile from "./Pages/User/page-UserProfile"
import UserOrders from "./Pages/User/page-UserOrders"
import UserCart from "./Pages/User/page-UserCart"
import SellerProfile from "./Pages/Seller/page-SellerProfile"
import AddProducts from "./Pages/Seller/page-AddProducts"
import EditProduct from "./Pages/Seller/page-EditProduct"
import SellerProducts from "./Pages/Seller/page-SellerProducts"
import { userRoleStore } from "./Store/ClientStore/store-UserRole"
import TailwindScreenDetector from "./components/screenDetector"
import { PublicAuth } from "./Pages/Public/auth-Public"
import { UserAuth } from "./Pages/User/auth-User"
import { SellerAuth } from "./Pages/Seller/auth-Seller"
import Navbar from "./Pages/Shared/Navbar"
import UserRegister from "./Pages/Public/page-UserRegister"
import UserLogIn from "./Pages/Public/page-UserLogin"
import SellerRegister from "./Pages/Public/page-SellerRegister"
import SellerLogIn from "./Pages/Public/page-SellerLogin"
import MernBazaarLoader from "./Pages/Shared/components/Loading-Ui/Loader-MernBazaar"
import MernBazaarLoaderStatic from "./Pages/Shared/components/Loading-Ui/Loader-MernBazaar-Static"

function App() {
  const { role } = userRoleStore()

  if (true) {
      return <MernBazaarLoaderStatic/>
  }

  return (
  // <div className={`w-screen h-screen bg-slate-200 sm:overflow-x-hidden`}>
  <div className={`w-screen bg-slate-100`}>
    
    <Navbar/>

    <Routes>
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/products" element={<ProductsPage/>}/>
      <Route path="/product/:id" element={<ProductDetailsPage/>}/>

      <Route path="/" element={<PublicAuth/>}>
        <Route index element={<Navigate to="home"/>}/>
        <Route path="register/user" element={<UserRegister/>}/>
        <Route path="login/user" element={<UserLogIn/>}/>
        <Route path="register/seller" element={<SellerRegister/>}/>
        <Route path="login/seller" element={<SellerLogIn/>}/>
        <Route path="*" element={<Navigate to="signin" />}/>
      </Route>

      <Route path="/user" element={<UserAuth/>}>
        <Route index element={<Navigate to="profile"/>}/>
        <Route path="profile" element={<UserProfile/>}/>
        <Route path="orders" element={<UserOrders/>}/>
        <Route path="cart" element={<UserCart/>}/>
        <Route path="*" element={<Navigate to="profile"/>}/>
      </Route>

      <Route path="/seller" element={<SellerAuth/>}>
        <Route index element={<Navigate to="profile"/>}/>
        <Route path="profile" element={<SellerProfile/>}/>
        <Route path="product/add" element={<AddProducts/>}/>
        <Route path="product/edit" element={<EditProduct/>}/>
        <Route path="products" element={<SellerProducts/>}/>
        <Route path="dashboard" element={<SellerProfile/>}/>
        <Route path="*" element={<Navigate to="profile"/>}/>
      </Route>

      <Route path="*" element={<Navigate to="/home"/>}/>
    </Routes>

    <TailwindScreenDetector/>
    <div className={`h-[10rem] bg-blue-400`} />
  </div>

  )
}

export default App



{/* {
        [
          { role: "user", element: <UserNavbar /> },
          { role: "seller", element: <SellerNavbar /> },
          { role: "public", element: <PublicNavbar /> },
        ].find(menu => menu.role === role)?.element
      } */}