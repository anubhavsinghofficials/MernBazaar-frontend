import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./Pages/Shared/page_Home"
import ProductsPage from "./Pages/Shared/page-Products"
import ProductDetailsPage from "./Pages/Shared/page-ProductDetails"
import UserProfile from "./Pages/User/page-UserProfile"
import UserOrders from "./Pages/User/page-UserOrders"
import UserCart from "./Pages/User/page-UserCart"
import SellerProfile from "./Pages/Seller/page-SellerProfile"
import SellerProducts from "./Pages/Seller/page-SellerProducts"
import TailwindScreenDetector from "./components/screenDetector"
import { PublicAuth } from "./Pages/Public/auth-Public"
import { UserAuth } from "./Pages/User/auth-User"
import { SellerAuth } from "./Pages/Seller/auth-Seller"
import Navbar from "./Pages/Shared/Navbar"
import UserRegister from "./Pages/Public/page-UserRegister"
import UserLogIn from "./Pages/Public/page-UserLogin"
import SellerRegister from "./Pages/Public/page-SellerRegister"
import SellerLogIn from "./Pages/Public/page-SellerLogin"
import MernBazaarLoaderStatic from "./Pages/Shared/components/Loading-Ui/Loader-MernBazaar-Static"
import { syncGetRole } from "./Store/ServerStore/sync-Role"
import GenericModal from "./Pages/Shared/components/Modals/Modal-Generic"
import UserPasswordUpdate from "./Pages/User/page-UserPasswordUpdate"
import SellerPasswordUpdate from "./Pages/Seller/page-SellerPasswordUpdate"
import GenericConfirmModal from "./Pages/Shared/components/Modals/Modal-GenericConfirm"
import GenericToast from "./Pages/Shared/components/Modals/Toast-Generic"
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import { STRIPE_PUBLISHABLE_KEY } from "./Store/ClientStore/store-Constants"
import PaymentPage from "./Pages/User/page-Payment"
import SellerOrdersPage from "./Pages/Seller/page-SellerOrders"
import SellerUsersPage from "./Pages/Seller/page-SellerUsers"
import SellerAnalyticsPage from "./Pages/Seller/page-SellerAnalytics"
import CreateProductsPage from "./Pages/Seller/page-CreateProducts"
import EditProductsPage from "./Pages/Seller/page-EditProduct"
import OrderInfo from "./Pages/Seller/page-OrderInfo"
import SellerCouponsPage from "./Pages/Seller/page-SellerCoupons"

function App() {

  const { isLoading, isRefetching } = syncGetRole()

  if (isLoading || isRefetching) {
      return <MernBazaarLoaderStatic/>
  }

  return (
  // <div className={`w-screen h-screen bg-slate-200 sm:overflow-x-hidden`}>
  // <div className={`w-screen bg-slate-100`}>
  <div className={`w-screen bg-slate-100`}>
    
    <Navbar/>

    <GenericModal/>
    <GenericConfirmModal/>
    <GenericToast/>
    
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
        <Route path="password" element={<UserPasswordUpdate/>}/>
        <Route path="cart" element={<UserCart/>}/>
        <Route path="payment" element={<Elements stripe={loadStripe(STRIPE_PUBLISHABLE_KEY)}><PaymentPage/></Elements>}/>
        <Route path="orders" element={<UserOrders/>}/>
        <Route path="*" element={<Navigate to="profile"/>}/>
      </Route>

      <Route path="/seller" element={<SellerAuth/>}>
        <Route index element={<Navigate to="profile"/>}/>
        <Route path="analytics" element={<SellerAnalyticsPage/>}/>
        <Route path="orders" element={<SellerOrdersPage/>}/>
        <Route path="order/:id" element={<OrderInfo/>}/>
        <Route path="users" element={<SellerUsersPage/>}/>
        <Route path="products" element={<SellerProducts/>}/>
        <Route path="product/new" element={<CreateProductsPage/>}/>
        <Route path="product/:id" element={<EditProductsPage/>}/>
        <Route path="coupons" element={<SellerCouponsPage/>}/>
        <Route path="profile" element={<SellerProfile/>}/>
        <Route path="password" element={<SellerPasswordUpdate/>}/>
        <Route path="*" element={<Navigate to="profile"/>}/>
      </Route>

      <Route path="*" element={<Navigate to="/home"/>}/>
    </Routes>

    <TailwindScreenDetector/>
    <div className={`h-[10rem] bg-blue-400 mt-[20rem]`} />
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