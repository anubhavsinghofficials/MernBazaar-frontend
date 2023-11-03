import { syncApplyCoupon } from "@/Store/ServerStore/sync-User"
import { useState } from "react"
import { BiSolidChevronRight } from "react-icons/bi"
import { MdShoppingCart } from "react-icons/md"


export type couponDataType = {
   couponCode:string,
   amount:number
}
type CartPropsType = {
     onConfirm: (totalPrice:number) => void
     totalProducts: number
     subTotal: number
}
function CartSummaryCard(props:CartPropsType) {

   const { subTotal, totalProducts, onConfirm } = props
   const shippingCharges = subTotal > 0 ? 100 : 0
   const [discount, setDiscount] = useState(0)
   const { mutate, isLoading } = syncApplyCoupon(setDiscount)

   const applyCouponCode = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const couponCode = formData.get('couponCode')

      if (couponCode) {
         const couponData = {
            couponCode:couponCode.toString(),
            amount:subTotal
         }
         mutate(couponData)
      }
   }

   const handleClick = () => {
      const totalPrice = (subTotal+shippingCharges)*(1 - discount/100)
      onConfirm(Math.floor(totalPrice))
   }

   return (
      <div className={`w-full h-fit pb-2 bg-white rounded-md flex flex-col shadow-md overflow-hidden gap-y-8 md:max-w-[20rem] flex-none relative`}
      >
         <p className="bg-slate-800 text-white text-lg font-semibold py-4 px-8 flex items-center gap-x-4">
            <MdShoppingCart className='text-xl'/>
            Summary
         </p>
         <form className={`flex px-3 gap-x-4 max-w-[28rem] w-full sm:max-w-[20rem] self-center relative`}
         onSubmit={applyCouponCode}>
            <input type="text"
                     className="grow px-4 min-w-0 rounded-md outline-none focus:outline-green-400 bg-slate-200 styledPlaceholder text-green-700 font-semibold"
                     placeholder="Coupon Code"
                     name="couponCode"
                     autoFocus/>
            <button className={`bg-green-600 text-white py-1 px-8 text-lg font-semibold rounded-lg flex items-center gap-x-2 hover:shadow-sm hover:bg-green-500 active:shadow-none active:bg-green-700 duration-75 self-stretch`}
            disabled={isLoading}>
               {
                  isLoading
                  ?
                  <span className={`w-4 h-4 my-[0.4rem] mx-[1rem] rounded-full border-b-green-300 border-l-green-100 border-[0.2rem] border-green-600 animate-spin`}/>
                  :
                     'Apply'
               }
            </button>
            <p className="absolute -bottom-5 left-4 text-sm font-semibold text-slate-400">
               free coupon {'>'} mern20
            </p>
         </form>
         <div className={`mx-2 px-7 py-4 bg-slate-100 max-w-[28rem] sm:max-w-[20rem] self-center w-full`}>
            <p className="flex py-2">
               <span className="font-semibold text-slate-800 w-[65%]">
                  Products
               </span>
               <span className="font-Roboto font-semibold text-green-800 whitespace-nowrap">
                  {totalProducts}
               </span>
            </p>
            <p className="flex py-2">
               <span className="font-semibold text-slate-800 w-[65%]">
                  Subtotal
               </span>
               <span className="font-Roboto font-semibold text-green-800 whitespace-nowrap">
                  + ₹{subTotal}
               </span>
            </p>
            <p className="flex py-2">
               <span className="font-semibold text-slate-800 w-[65%]">
                  Delivery
               </span>
               <span className="font-Roboto font-semibold text-green-800 whitespace-nowrap">
                  + ₹{shippingCharges}
               </span>
            </p>
            <p className="flex py-2">
               <span className="font-semibold text-slate-800 w-[65%]">
                  Discounts
               </span>
               <span className="font-Roboto font-semibold text-red-800 whitespace-nowrap">
                  - {discount}%
               </span>
            </p>
         </div>
         <div className={`flex flex-col gap-y-2 max-w-[28rem] sm:max-w-[20rem] self-center w-full`}>
            <p className="flex py-2 bg-slate-800 px-8 mx-2 rounded-md">
               <span className="font-semibold text-white text-lg w-[65%]">
                  Total
               </span>
               <span className="font-Roboto font-semibold text-white text-lg whitespace-nowrap">
                  ₹ {Math.floor((subTotal+shippingCharges)*(1 - discount/100))}
               </span>
            </p>
            <button className={`bg-green-600 text-white py-2 text-lg font-semibold rounded-lg flex items-center justify-center gap-x-1 hover:shadow-md hover:bg-green-500 active:shadow-none active:bg-green-700 duration-75 self-stretch mx-2`}
                    onClick={handleClick}>
                  Proceed to Payment
               <BiSolidChevronRight className='pt-1 text-2xl'/>
            </button>
         </div>
      </div>
   )
}
 
export default CartSummaryCard