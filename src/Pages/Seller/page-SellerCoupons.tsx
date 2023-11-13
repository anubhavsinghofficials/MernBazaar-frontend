
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { BiSolidGift } from "react-icons/bi"
import { FaPercentage, FaRupeeSign } from "react-icons/fa"
import { syncCreateCoupon, syncDeleteCoupon, syncFetchCoupons } from "@/Store/ServerStore/sync-Seller"
import { AiTwotoneDelete } from "react-icons/ai"


export type couponSchemaType = z.infer<typeof zodCouponSchema>
const zodCouponSchema = z.object({
   couponCode  : z.string()
               .trim()
               .nonempty('Enter Coupon Code')
               .min(4,'Coupon code too short')
               .max(13,'Coupon code too long'),
   minAmount   : z.number()
               .gte(0,'Invalid Min amount'),
   
   discount    : z.number()
               .gte(0,'Invalid Discount')
               .lte(100, 'Invalid Discount')
})


function SellerCouponsPage() {
   useEffect(()=>{
       setFadeOut(false)
       window.scrollTo({ top: 0 })
   },[])

   const [fadeOut, setFadeOut] = useState(true)
   const { mutate, isLoading:isGeneratingCoupon } = syncCreateCoupon()
   const [selectedCoupon, setSelectedCoupon] = useState<string|null>(null)
   const { data, isLoading:isLoadingCoupons } = syncFetchCoupons()
   const { mutate:deleteCoupon, isLoading:isDeletingCoupon } = syncDeleteCoupon()

   const form = useForm<couponSchemaType>({
      mode:"onSubmit",
      resolver:zodResolver(zodCouponSchema)
   })
   const { register, formState, handleSubmit } = form
   const { errors } = formState


   const handleChange = (couponId:string) => {
      if (couponId !== selectedCoupon) {
         setSelectedCoupon(couponId)
      } else {
         setSelectedCoupon(null)
      }
   }
    
   const handleDelete = (e:React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
      e.preventDefault()
      if (selectedCoupon) {
         deleteCoupon(selectedCoupon)
      }
   }
    
   const onSubmit = (data:couponSchemaType) => {
      mutate(data)
   }
   

   return (
      <div className={`mx-auto w-[19rem] xs:w-[28rem] sm:w-[30rem] md:w-[30rem] lg:w-[34rem] flex flex-col rounded-lg xs:rounded-2xl overflow-hidden bg-gradient-to-br bg-white shadow-md relative min-h-[26rem] ${fadeOut?'opacity-0':'opacity-100'} transition-opacity duration-300`}
      >    
         <Tabs
            defaultValue="allCoupons"
            className="pb-4"
            >
            <TabsList className={`bg-slate-700 flex p-3 rounded-none`}>
               <TabsTrigger
                  className={`grow text-lg font-semibold rounded-md py-2 rounded-tl-lg`}
                  value="allCoupons">
                  My Coupons
               </TabsTrigger>
               <TabsTrigger
                  className={`grow text-lg font-semibold rounded-md py-2 rounded-tr-lg`}
                  value="createCoupons">
                  Create New
               </TabsTrigger>
            </TabsList>
            <TabsContent
               value="allCoupons"
               className={`xs:px-4 h-96 overflow-y-scroll accordianScrollbar relative`}>
                  <div className={`flex font-semibold xs:text-lg bg-slate-200 sticky top-0 py-2 xs:rounded-md z-10`}>
                     <p className={`w-[46%] xs:w-[44%] pl-4`}>
                        <span className={`hidden xs:inline-block xs:pr-2`}>
                           Coupon
                        </span>
                        Codes
                     </p>
                     <p className={`w-[27%] xs:w-[28%]`}>
                        Discount
                     </p>
                     <p className={`w-[27%] xs:w-[28%]`}>
                        Min Amt.
                     </p>
                  </div>
               {
                  isLoadingCoupons
                  ?
                  Array.from({length:10}).map((_,index) => (
                     <div className={` flex mt-2 py-4 hover:bg-red-50`}
                     key={index}
                     >
                        <p className={`w-[46%] xs:w-[44%] pl-4 bg-slate-300 text-slate-300 animate-pulse`}>
                           alslsiruengitp
                        </p>
                        <p className={`w-[27%] xs:w-[28%] bg-slate-300 text-slate-300 animate-pulse`}>
                           100 %
                        </p>
                        <p className={`w-[27%] xs:w-[28%] bg-slate-300 text-slate-300 animate-pulse`}>
                           ₹ 999999
                        </p>
                     </div>
                  ))
                  :
                  data.coupons.map((coupon:any) => (
                     <div key={coupon._id}>
                        <input
                           type="checkbox"
                           className={`hidden`}
                           id={coupon._id}
                           onChange={()=> handleChange(coupon._id)}/>
                        <label
                           className={`relative flex mt-2 py-4 hover:bg-red-50 ${selectedCoupon === coupon._id && 'ring-1 ring-red-400 bg-red-50 rounded-md'}`}
                           htmlFor={coupon._id}>
                           <p className={`w-[46%] xs:w-[44%] pl-4`}>
                              {coupon.couponCode}
                           </p>
                           <p className={`w-[27%] xs:w-[28%]`}>
                              {coupon.discount} %
                           </p>
                           <p className={`w-[27%] xs:w-[28%]`}>
                              ₹ {coupon.minAmount}
                           </p>
                           <button onClick={(e)=>handleDelete(e)}>
                           {
                              isDeletingCoupon
                              ?
                                 <span
                                 className={`p-4 text-4xl rounded-md bg-red-300 shadow-md  absolute right-8 bottom-[50%] translate-y-[50%] animate-pulse ${selectedCoupon === coupon._id ? 'block' : 'hidden'}`}
                                 />
                              :
                                 <AiTwotoneDelete
                                 className={`p-2 text-4xl rounded-md bg-white active:shadow-none active:bg-red-50 active:text-red-900 text-red-700 absolute right-8 shadow-md bottom-[50%] translate-y-[50%] ${selectedCoupon === coupon._id ? 'scale-100' : 'scale-0'} duration-200`}
                                 />
                           }
                           </button>
                        </label>
                     </div>
                  ))
               }
            </TabsContent>
            <TabsContent
               value="createCoupons"
               className={`p-2`}
               >
               <form className="px-4 xs:px-8 pt-10 pb-4 flex flex-col grow items-center gap-y-2 rounded-t-xl xs:rounded-t-3xl bg-white"
                     onSubmit={handleSubmit(onSubmit)}
                     noValidate
                  >
                  <div className={`text-slate-100 flex items-center w-full p-2 rounded-md bg-slate-200 ${ errors.couponCode ? "ring-1 ring-red-500" :"focus-within:ring-1 ring-slate-700"}`}>
                     <label htmlFor="couponCode"
                        className=" mr-2 self-stretch flex items-center px-2 text-xl">
                        <p className="bg-slate-700 rounded-md text-slate-200 p-2 text-lg">
                           <BiSolidGift/>
                        </p>
                     </label>
                     <input className={`px-1 grow py-1 outline-none bg-transparent rounded-full min-w-0 styledPlaceholder text-slate-700 font-semibold`}  
                        type={"text"}
                        id="couponCode"
                        {...register("couponCode")}
                        placeholder="Coupon Code"
                        autoComplete="off"
                        autoFocus/>
                  </div>
                  <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-10 relative">
                        {errors.couponCode?.message}
                  </p>

                  <div className={`text-slate-100 flex items-center w-full p-2 rounded-md bg-slate-200 ${ errors.minAmount ? "ring-1 ring-red-500" :"focus-within:ring-1 ring-slate-700"}`}>
                     <label htmlFor="minAmount"
                        className=" mr-2 self-stretch flex items-center px-2 text-xl">
                        <p className="bg-slate-700 rounded-md text-slate-200 p-2 text-lg">
                           <FaRupeeSign/>
                        </p>
                     </label>
                     <input className={`px-1 grow py-1 outline-none bg-transparent rounded-full min-w-0 styledPlaceholder text-slate-700 font-semibold`}  
                        type={"number"}
                        id="minAmount"
                        {...register("minAmount",{valueAsNumber:true})}
                        placeholder="Min order amount"
                        autoComplete="off"
                        autoFocus/>
                  </div>
                  <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-10 relative">
                        {errors.minAmount?.message}
                  </p>

                  <div className={`text-slate-100 flex items-center w-full p-2 rounded-md bg-slate-200 ${ errors.discount ? "ring-1 ring-red-500" :"focus-within:ring-1 ring-slate-700"}`}>
                     <label htmlFor="discount"
                        className=" mr-2 self-stretch flex items-center px-2 text-xl">
                        <p className="bg-slate-700 rounded-md text-slate-200 p-2 text-lg">
                           <FaPercentage/>
                        </p>
                     </label>
                     <input className={`px-1 grow py-1 outline-none bg-transparent rounded-full min-w-0 styledPlaceholder text-slate-700 font-semibold`}  
                        type={"number"}
                        id="discount"
                        {...register("discount",{valueAsNumber:true})}
                        placeholder="Disount Percentage"
                        autoComplete="off"
                        autoFocus/>
                     <p className={`text-slate-800 font-semibold px-4`}>
                        %
                     </p>
                  </div>
                  <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-10 relative">
                        {errors.discount?.message}
                  </p>

                  <button type="submit"
                        className={`mt-4 px-4 py-2 rounded-md font-bold bg-gray-950 hover:bg-gray-800 text-slate-200 self-end flex items-center gap-x-4 ${isGeneratingCoupon ? 'opacity-50': 'opacity-100'}`}
                        disabled={isGeneratingCoupon}>
                     <span className={`w-4 h-4 rounded-full border-b-slate-100 border-l-slate-100 border-[0.2rem] border-slate-900 animate-spin ${isGeneratingCoupon ? 'inline' : 'hidden'}`}/>
                     Generate
                  </button>

                  <p className={`text-sm text-center pt-4 font-semibold text-slate-500`}>
                     *Coupon code will be applicable only above the minimum order amount you enter
                  </p>
               </form>
            </TabsContent>
         </Tabs>
      </div>
   )
}
 
export default SellerCouponsPage
