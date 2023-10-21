import { mern20Code } from "@/Store/ClientStore/store-Constants"
import { useEffect, useState } from "react"
import { BiSolidChevronRight } from "react-icons/bi"
import { MdShoppingCart } from "react-icons/md"



type CartPropsType = {
     page: 'cart' | 'orders' | 'payout'
     onConfirm: (totalPrice:number) => void
     totalProducts: number
     subTotal: number
}
function CartSummaryCard(props:CartPropsType) {

   useEffect(()=>{
      window.scrollTo({ top: 0 })
   },[])

   const { page, subTotal, totalProducts, onConfirm } = props
   const shippingCharges = 100
   const [discount, setDiscount] = useState(0)

   const applyCouponCode = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const couponCode = formData.get('couponCode')
      if (couponCode === mern20Code) {
         setDiscount(20)
      } else {
         setDiscount(0)
      }
   }

   const handleClick = () => {
      const totalPrice = (subTotal+shippingCharges)*(1 - discount/100)
      onConfirm(totalPrice)
   }

   return (
      <div className={`w-full h-fit pb-2 bg-white rounded-md flex flex-col shadow-md overflow-hidden gap-y-8 md:max-w-[20rem] flex-none relative`}
      >
         <p className="bg-slate-800 text-white text-lg font-semibold py-4 px-8 flex items-center gap-x-4">
            <MdShoppingCart className='text-xl'/>
            Summary
         </p>
         <form className={`flex px-3 gap-x-4 max-w-[28rem] w-full sm:max-w-[20rem] self-center`}
         onSubmit={applyCouponCode}>
            <input type="text"
                     className="grow px-4 min-w-0 rounded-md outline-none focus:outline-green-400 bg-slate-200 styledPlaceholder text-green-700 font-semibold"
                     placeholder="Coupon Code"
                     name="couponCode"
                     autoFocus/>
            <button className={`bg-green-600 text-white py-1 px-8 text-lg font-semibold rounded-lg flex items-center gap-x-2 hover:shadow-sm hover:bg-green-500 active:shadow-none active:bg-green-700 duration-75 self-stretch`}>
               Apply
            </button>
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
                     ₹ {(subTotal+shippingCharges)*(1 - discount/100)}
                  </span>
            </p>
            <button className={`bg-green-600 text-white py-2 text-lg font-semibold rounded-lg flex items-center justify-center gap-x-1 hover:shadow-md hover:bg-green-500 active:shadow-none active:bg-green-700 duration-75 self-stretch mx-2`}
                     onClick={handleClick}>
               {
                  `${page === 'cart' ? 'Checkout':'Proceed to Payment'}`
                  
               }
               <BiSolidChevronRight className='pt-1 text-2xl'/>
            </button>
         </div>
      </div>
   )
}
 
export default CartSummaryCard