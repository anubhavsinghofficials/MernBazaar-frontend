import { mern20Code } from "@/Store/ClientStore/store-Constants"
import { useEffect, useState } from "react"
import { BiSolidChevronRight } from "react-icons/bi"
import { MdShoppingCart } from "react-icons/md"
import CartSummaryCard from "./components/CartSummaryCard"
import AddressCard from "./components/AddressCard"
import AddressOptionCard from "./components/AddressOptionCard"


const products = 13
const subTotal = 100
const shippingCharges = 100


export type AddressType = {
   address: string;
   city: string;
   state: string;
   country: string;
   pinCode: string;
   phone: string;
}

function UserCart() {

   useEffect(()=>{
      window.scrollTo({ top: 0 })
   },[])

   const [discount, setDiscount] = useState(0)
   const [shippingInfo, setShippingInfo] = useState<AddressType>()
   const [isNewAddress, setIsNewAddress] = useState(false)

   const proceedCheckout = () => {
       console.log('checkout')
       console.log(shippingInfo,isNewAddress)
   }
    console.log(shippingInfo,isNewAddress)
    

   return (
            <div className={`w-screen min-h-screen bg-slate-200 flex justify-center items-center`}>
               {/* <CartSummaryCard
                  page="cart"
                  onConfirm={proceedCheckout}/>
                   */}
               <AddressCard
                  setShippingInfo={setShippingInfo}
                  shippingInfo={shippingInfo}
                  isNewAddress={isNewAddress}
                  setIsNewAddress={setIsNewAddress}/>
            </div>
   )
}
 
export default UserCart