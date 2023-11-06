import { Routes, Route, Navigate }  from "react-router-dom"
import HomePage                     from "./Pages/Shared/page_Home"
import { PublicAuth }               from "./Pages/Public/auth-Public"
import { UserAuth }                 from "./Pages/User/auth-User"
import { SellerAuth }               from "./Pages/Seller/auth-Seller"
import Navbar                       from "./Pages/Shared/Navbar"
import MernBazaarLoaderStatic       from "./Pages/Shared/components/Loading-Ui/Loader-MernBazaar-Static"
import { syncGetRole }              from "./Store/ServerStore/sync-Role"
import GenericModal                 from "./Pages/Shared/components/Modals/Modal-Generic"
import GenericConfirmModal          from "./Pages/Shared/components/Modals/Modal-GenericConfirm"
import GenericToast                 from "./Pages/Shared/components/Modals/Toast-Generic"
import { Elements }                 from "@stripe/react-stripe-js"
import { loadStripe }               from "@stripe/stripe-js"
import { STRIPE_PUBLISHABLE_KEY }   from "./Store/ClientStore/store-Constants"
import PaymentPage                  from "./Pages/User/page-Payment"
import { lazy }                     from "react"
import LazyRoute                    from "./components/LazyRoute"
const ProductsPage         = lazy(() => import("./Pages/Shared/page-Products"))
const ProductDetailsPage   = lazy(() => import("./Pages/Shared/page-ProductDetails"))
const UserProfile          = lazy(() => import("./Pages/User/page-UserProfile"))
const UserPasswordUpdate   = lazy(() => import("./Pages/User/page-UserPasswordUpdate"))
const UserOrders           = lazy(() => import("./Pages/User/page-UserOrders"))
const UserCart             = lazy(() => import("./Pages/User/page-UserCart"))
const SellerProfile        = lazy(() => import("./Pages/Seller/page-SellerProfile"))
const SellerProducts       = lazy(() => import("./Pages/Seller/page-SellerProducts"))
const UserRegister         = lazy(() => import("./Pages/Public/page-UserRegister"))
const UserLogIn            = lazy(() => import("./Pages/Public/page-UserLogin"))
const SellerRegister       = lazy(() => import("./Pages/Public/page-SellerRegister"))
const SellerLogIn          = lazy(() => import("./Pages/Public/page-SellerLogin"))
const SellerPasswordUpdate = lazy(() => import("./Pages/Seller/page-SellerPasswordUpdate"))
const SellerOrdersPage     = lazy(() => import("./Pages/Seller/page-SellerOrders"))
const SellerUsersPage      = lazy(() => import("./Pages/Seller/page-SellerUsers"))
const SellerAnalyticsPage  = lazy(() => import("./Pages/Seller/page-SellerAnalytics"))
const CreateProductsPage   = lazy(() => import("./Pages/Seller/page-CreateProducts"))
const EditProductsPage     = lazy(() => import("./Pages/Seller/page-EditProduct"))
const OrderInfo            = lazy(() => import("./Pages/Seller/page-OrderInfo"))
const SellerCouponsPage    = lazy(() => import("./Pages/Seller/page-SellerCoupons"))



function App() {
  const { isLoading, isRefetching } = syncGetRole()

  if (isLoading || isRefetching) {
    return <MernBazaarLoaderStatic />
  }

  return (
    <div className={`w-screen bg-slate-100`}>
      <Navbar/>

      <GenericModal/>
      <GenericConfirmModal/>
      <GenericToast/>

      <Routes>
        <Route path="/home" element={<HomePage />}
        />
        <Route path="/products"     element={<LazyRoute> <ProductsPage/>       </LazyRoute>}/>
        <Route path="/product/:id"  element={<LazyRoute> <ProductDetailsPage/> </LazyRoute>}/>

        <Route path="/" element={<PublicAuth/>}>
          <Route index                  element={<Navigate to="home"/>}/>
          <Route path="register/user"   element={<LazyRoute> <UserRegister/>   </LazyRoute>}/>
          <Route path="login/user"      element={<LazyRoute> <UserLogIn/>      </LazyRoute>}/>
          <Route path="register/seller" element={<LazyRoute> <SellerRegister/> </LazyRoute>}/>
          <Route path="login/seller"    element={<LazyRoute> <SellerLogIn/>    </LazyRoute>}/>
          <Route path="*"               element={<Navigate to="signin" />}/>
        </Route>

        <Route path="/user" element={<UserAuth />}>
          <Route index           element={<Navigate to="profile" />}/>
          <Route path="profile"  element={<LazyRoute> <UserProfile/>        </LazyRoute>}/>
          <Route path="password" element={<LazyRoute> <UserPasswordUpdate/> </LazyRoute>}/>
          <Route path="cart"     element={<LazyRoute> <UserCart/>           </LazyRoute>}/>
          <Route path="payment"  element={<Elements stripe={loadStripe(STRIPE_PUBLISHABLE_KEY)}><PaymentPage /> </Elements>}/>
          <Route path="orders"   element={<LazyRoute> <UserOrders/>         </LazyRoute>}/>
          <Route path="*"        element={<Navigate to="profile"/>}/>
        </Route>

        <Route path="/seller" element={<SellerAuth />}>
          <Route index              element={<Navigate to="profile"/>}/>
          <Route path="analytics"   element={<LazyRoute> <SellerAnalyticsPage/>  </LazyRoute>}/>
          <Route path="orders"      element={<LazyRoute> <SellerOrdersPage/>     </LazyRoute>}/>
          <Route path="order/:id"   element={<LazyRoute> <OrderInfo/>            </LazyRoute>}/>
          <Route path="users"       element={<LazyRoute> <SellerUsersPage/>      </LazyRoute>}/>
          <Route path="products"    element={<LazyRoute> <SellerProducts/>       </LazyRoute>}/>
          <Route path="product/new" element={<LazyRoute> <CreateProductsPage/>   </LazyRoute>}/>
          <Route path="product/:id" element={<LazyRoute> <EditProductsPage/>     </LazyRoute>}/>
          <Route path="coupons"     element={<LazyRoute> <SellerCouponsPage/>    </LazyRoute>}/>
          <Route path="profile"     element={<LazyRoute> <SellerProfile/>        </LazyRoute>}/>
          <Route path="password"    element={<LazyRoute> <SellerPasswordUpdate/> </LazyRoute>}/>
          <Route path="*"           element={<Navigate to="profile"/>}/>
        </Route>

        <Route path="*" element={<Navigate to="/home" />}/>
      </Routes>

      <div className={`h-[10rem] bg-blue-400 mt-[20rem]`} />
    </div>
  )
}

export default App