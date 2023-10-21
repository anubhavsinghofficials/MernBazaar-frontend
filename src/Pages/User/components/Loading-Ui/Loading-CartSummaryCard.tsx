import { MdShoppingCart } from "react-icons/md"

function CartSummaryCardLoading() {

   return (
      <div className={`w-full h-fit pb-2 bg-white rounded-md flex flex-col shadow-md overflow-hidden gap-y-8 md:max-w-[20rem] flex-none relative`}
      >
         <p className="bg-slate-800 text-white text-lg font-semibold py-4 px-8 flex items-center gap-x-4">
            <MdShoppingCart className='text-2xl'/>
            Summary
         </p>
         <div className={`flex px-3 gap-x-4 max-w-[28rem] w-full sm:max-w-[20rem] self-center`}>
            <input type="text"
                     className="grow px-4 min-w-0 rounded-md outline-none focus:outline-green-400 bg-slate-100 styledPlaceholder text-green-700 font-semibold"
                     placeholder="Coupon Code"
                     name="couponCode"
                     disabled/>
            <button className={`bg-green-600 text-white py-1 px-8 text-lg font-semibold rounded-lg flex items-center gap-x-2 self-stretch`} disabled>
               <span className={`w-4 h-4 rounded-full border-b-green-200 border-l-green-100 border-[0.2rem] border-green-600 my-[0.42rem] mx-4 animate-spin`}/>
            </button>
         </div>
         <div className={`mx-2 px-7 py-4 bg-slate-100 max-w-[28rem] sm:max-w-[20rem] self-center w-full`}>
            <p className="flex py-2">
               <span className="font-semibold text-slate-800 w-[65%]">
                  Products
               </span>
               <span className="font-Roboto font-semibold text-green-800 whitespace-nowrap">
                  XXX
               </span>
            </p>
            <p className="flex py-2">
               <span className="font-semibold text-slate-800 w-[65%]">
                  Subtotal
               </span>
               <span className="font-Roboto font-semibold text-green-800 whitespace-nowrap">
                  + ₹XXX
               </span>
            </p>
            <p className="flex py-2">
               <span className="font-semibold text-slate-800 w-[65%]">
                  Delivery
               </span>
               <span className="font-Roboto font-semibold text-green-800 whitespace-nowrap">
                  + ₹XXX
               </span>
            </p>
            <p className="flex py-2">
               <span className="font-semibold text-slate-800 w-[65%]">
                  Discounts
               </span>
               <span className="font-Roboto font-semibold text-red-800 whitespace-nowrap">
                  - XXX%
               </span>
            </p>
         </div>
         <div className={`flex flex-col gap-y-2 max-w-[28rem] sm:max-w-[20rem] self-center w-full`}>
            <p className="flex py-2 bg-slate-800 px-8 mx-2 rounded-md">
                  <span className="font-semibold text-white text-lg w-[65%]">
                     Total
                  </span>
                  <span className="font-Roboto font-semibold text-white text-lg whitespace-nowrap">
                     ₹ XXX
                  </span>
            </p>
            <button className={`bg-green-600 text-white py-2 text-lg font-semibold rounded-lg flex items-center justify-center self-stretch mx-2`}
                    disabled>
               <span className={`w-5 h-5 rounded-full border-b-green-300 border-l-green-100 border-[0.3rem] my-1 border-green-600 animate-spin`}/>
            </button>
         </div>
      </div>
   )
}
 
export default CartSummaryCardLoading