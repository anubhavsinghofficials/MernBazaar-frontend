import { mern20Code } from "@/Store/ClientStore/store-Constants"
import { useEffect, useState } from "react"
import { BiSolidChevronRight } from "react-icons/bi"
import { MdShoppingCart } from "react-icons/md"
import CartSummaryCard from "./components/CartSummaryCard"
import AddressCard from "./components/AddressCard"
import AddressOptionCard from "./components/AddressOptionCard"
import { syncFetchUserCart } from "@/Store/ServerStore/sync-User"
import CartSummaryCardLoading from "./components/Loading-Ui/Loading-CartSummaryCard"
import { modalStore } from "@/Store/ClientStore/store-Modals"
import CartItemsBox from "./components/CartItemsBox"
import CartItemsBoxLoading from "./components/Loading-Ui/Loading-CartItemsBox"


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

   const [subTotal, setSubTotal] = useState<number>()
   const { setGenericMessage, toggleGenericModal } = modalStore()
   const { data, isLoading, isRefetching } = syncFetchUserCart(setSubTotal)
   const [shippingInfo, setShippingInfo] = useState<AddressType>()
   const [isNewAddress, setIsNewAddress] = useState(false)

   const proceedCheckout = (totalPrice:number) => {
      if (!shippingInfo){
         setGenericMessage('Choose an address')
         toggleGenericModal()
         return
      }
      console.log('checkout')
      console.log({shippingInfo,isNewAddress,totalPrice})
   }

   return (
            <div className={`w-screen min-h-screen pb-4 pt-[3.8rem] xs:pt-[4.4rem] lg:pt-20 xl:pt-0 bg-slate-200 flex justify-center items-center gap-y-2 xs:gap-4 xs:p-2 flex-col-reverse xl:flex-row`}>
                  
               <div className={`w-[96%] lg:w-[80%] xl:w-[30rem]`}>
               {
                  (isLoading || isRefetching)
                  ? <CartItemsBoxLoading/>
                  : <CartItemsBox cart={data}/>
               }
               </div>

               <div className={`flex w-[96%] lg:w-[80%] xl:w-fit gap-x-4 md:items-end xl:items-center flex-col-reverse md:flex-row gap-y-2 xs:gap-y-4 relative`}>

                  <AddressCard
                     setShippingInfo={setShippingInfo}
                     shippingInfo={shippingInfo}
                     isNewAddress={isNewAddress}
                     setIsNewAddress={setIsNewAddress}
                     />
                  {
                     (isLoading || isRefetching)
                     ? <CartSummaryCardLoading/>
                     :  <CartSummaryCard   
                        page="cart"
                        totalProducts={data.length}
                        subTotal={subTotal!}
                        onConfirm={proceedCheckout}
                        />

                  }

               </div>


            </div>
   )
}
 
export default UserCart