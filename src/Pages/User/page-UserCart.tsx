import { useRef, useState } from "react"
import CartSummaryCard from "./components/CartSummaryCard"
import AddressCard from "./components/AddressCard"
import { syncFetchUserCart } from "@/Store/ServerStore/sync-User"
import CartSummaryCardLoading from "./components/Loading-Ui/Loading-CartSummaryCard"
import { modalStore } from "@/Store/ClientStore/store-Modals"
import CartItemsBox, { cartItemType } from "./components/CartItemsBox"
import CartItemsBoxLoading from "./components/Loading-Ui/Loading-CartItemsBox"


export type AddressType = {
   address: string;
   city: string;
   state: string;
   country: string;
   pinCode: string;
   phone: string;
}

function UserCart() {
//
   const [subTotal, setSubTotal] = useState<number>(0)
   const LoadingLengthRef = useRef(4)
   const [totalProducts, setTotalProducts] = useState<number>(0)
   const { setGenericToastType, setGenericToastMessage, toggleGenericToast } = modalStore()
   const { data, isLoading, isRefetching } = syncFetchUserCart(setSubTotal,setTotalProducts)
   const [shippingInfo, setShippingInfo] = useState<AddressType>()
   const [isNewAddress, setIsNewAddress] = useState(false)

   const proceedCheckout = (totalPrice:number) => {
      if (totalPrice === 0) {
         setGenericToastMessage('Nothing in the cart')
         setGenericToastType('error')
         toggleGenericToast(true)
         return
      } else if (!shippingInfo){
         setGenericToastMessage('Choose an address')
         setGenericToastType('warning')
         toggleGenericToast(true)
         return
      }
      console.log('checkout')
      let orderItems:Omit<cartItemType,"_id"|"stock">[] = []
      data.forEach((item:cartItemType) => {
         const { _id, stock, ...refinedItem } = item
         orderItems.push(refinedItem)
      })
      console.log({shippingInfo,isNewAddress,totalPrice,orderItems})
   }

   if (data && LoadingLengthRef.current !== data.length) {
       LoadingLengthRef.current = data.length
   }

   return (
            <div className={`w-screen min-h-screen pb-4 pt-[3.8rem] xs:pt-[4.4rem] lg:pt-20 xl:pt-0 bg-slate-200 flex justify-center items-center gap-y-2 xs:gap-4 xs:p-2 xl:p-4 flex-col-reverse xl:flex-row`}
            >
               <div className={`w-[96%] lg:w-[80%] xl:w-[46rem]`}>
               {
                  (isLoading || isRefetching)
                  ? <CartItemsBoxLoading length={LoadingLengthRef.current}/>
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
                        totalProducts={totalProducts}
                        subTotal={subTotal}
                        onConfirm={proceedCheckout}
                        />
                  }
               </div>
            </div>
   )
}
 
export default UserCart