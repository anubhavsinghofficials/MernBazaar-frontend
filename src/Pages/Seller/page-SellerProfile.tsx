
import { GrMail } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { SellerSignUpFormType, zodSellerSignupSchema } from "../Public/FormValidators/type-seller";
import { syncFetchSellerDetails, syncLogOutSeller, syncLogOutSellerAllDevices, syncUpdateSellerDetails } from "@/Store/ServerStore/sync-Seller";
import { useNavigate } from "react-router-dom";
import { modalStore } from "@/Store/ClientStore/store-Modals";
import { BsFillPersonFill } from "react-icons/bs";



export type sellerProfileType = Omit<SellerSignUpFormType,'password'>

function sellerProfile() {

   const [disableSubmit, setDisableSubmit] = useState(false)
   const [Editable, setEditable] = useState(false)
   const [fadeOut, setFadeOut] = useState(true)
   const Navigate = useNavigate()
   const focusDivRef = useRef<HTMLInputElement|null>(null)
   const { data:seller } = syncFetchSellerDetails()
   const { mutate } = syncUpdateSellerDetails(setEditable, setDisableSubmit)
   const { mutate:logOutSeller } = syncLogOutSeller(setEditable)
   const { mutate:logOutSellerAllDevices } = syncLogOutSellerAllDevices(setEditable)
   const { setGenericSubtitle,setGenericTitle, setGenericFunction, toggleGenericConfirmModal } = modalStore()

      
   const zodSellerProfileSchema = zodSellerSignupSchema.omit({ password: true });
   const form = useForm<sellerProfileType>({
         mode:"onSubmit",
         resolver:zodResolver(zodSellerProfileSchema)
   })
   const { register, formState, handleSubmit } = form
   const { errors } = formState

   useEffect(()=>{
      if (Editable && focusDivRef.current) {
         const focusDiv = focusDivRef.current.children
         const focusInput = Array.from(focusDiv)[1] as HTMLInputElement
         focusInput.focus()
      }

      if (seller) {
         form.setValue("name", seller.name);
         form.setValue("email", seller.email);
         form.setValue("address", seller.address)
         form.setValue("description", seller.description)
      }
   },[Editable, seller])


   useEffect(()=>{
      setFadeOut(false)
      window.scrollTo({ top: 0 })
   },[])


   const changeRoute = () => {
      setFadeOut(true)
      setTimeout(() => {
         Navigate('/seller/password')
      }, 300);
   }
   
   const logOut = () => {
      setGenericTitle("Confirm to Logout from this device")
      setGenericSubtitle("you will have to login again to access your data")
      setGenericFunction(logOutSeller)
      toggleGenericConfirmModal()
   }
   
   const logOutAllDevices = () => {
      setGenericTitle("Confirm to Logout from all devices")
      setGenericSubtitle("any other user using this account will be logged out too")
      setGenericFunction(logOutSellerAllDevices)
      toggleGenericConfirmModal()
   }
    

  const onSubmit = ( data:sellerProfileType ) => {
    const sameName = data.name === seller.name
    const sameEmail = data.email === seller.email
    const sameAddress = data.address === seller.address
    const sameDescription = data.description === seller.description
      if (!sameEmail || !sameName || !sameAddress || !sameDescription) {
         mutate(data)
         setDisableSubmit(true)
      }
   }

    return (
      <div className={`w-[19rem] xs:w-[28rem] sm:w-[38rem] md:w-[30rem] lg:w-[38rem] flex flex-col rounded-2xl overflow-hidden  bg-gradient-to-br bg-slate-800 relative  border-b-2 min-h-[30rem] ${fadeOut?'opacity-0':'opacity-100'} transition-opacity duration-300 shadow-md`}
      >
         <div className={`flex py-8 xs:py-10 pl-12 bg-slate-800 justify-between`}>
            <div className={``}>
               <h1 className="text-slate-200 font-bold leading-7 text-3xl">
                  Profile
               </h1>
            </div>
            <div className={`pr-8`}>
               <button className={`text-white self-start flex gap-x-2 items-center hover:bg-slate-700 px-4 py-1 rounded-md active:bg-slate-600 duration-75`}onClick={()=>setEditable(prev => !prev)}
               disabled={disableSubmit}>
                  {
                     Editable ? 'Cancel' : 'Edit'
                  }
               </button>
            </div>
         </div>
            
         <form className=" px-8 pt-12 xs:pt-16 pb-10 flex flex-col grow items-center gap-y-2 bg-white rounded-t-xl xs:rounded-t-2xl"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate>

            <div className={`text-slate-100 flex items-center w-full p-2 rounded-md bg-slate-200 ${ Editable && errors.name ? "ring-1 ring-red-500" :"focus-within:ring-1 ring-slate-700"}`}
            ref={focusDivRef}
            >
                  <label htmlFor="name"
                     className="mr-2 self-stretch flex items-center px-2 text-3xl text-slate-200">
                     <BsFillPersonFill className={`bg-slate-700 rounded-md p-1`}/>
                  </label>
                  <input className={`px-1 grow py-1 outline-none bg-transparent rounded-full min-w-0 styledPlaceholder text-slate-700`}  
                     type="text"
                     id="name"
                     {...register("name")}
                     placeholder="Enter Your Name"
                     autoComplete="off"
                     autoFocus
                     disabled={!Editable}/>
            </div>
            <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-10 relative">
                  {Editable && errors.name?.message}
            </p>

            <div className={`text-slate-100 flex items-center w-full p-2 rounded-md bg-slate-200 ${ Editable && errors.email ? "ring-1 ring-red-500" :"focus-within:ring-1 ring-slate-700"}`}>
               <label htmlFor="email"
                  className="mr-2 self-stretch flex items-center px-2 text-3xl">
                        <GrMail className={`bg-slate-700 rounded-md p-[0.4rem]`}/>
               </label>
               <input className={`px-1 grow py-1 outline-none bg-transparent rounded-full min-w-0 styledPlaceholder text-slate-700`}  
                  type="text"
                  id="email"
                  {...register("email")}
                  placeholder="Enter Your Email"
                  autoComplete="off"
                  disabled={!Editable}/>
            </div>
            <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-10 relative">
                  {Editable && errors.email?.message}
            </p>


            <div className={`flex flex-col items-center w-full gap-2 mt-2`}>
               <label htmlFor="description"
                  className="self-start text-slate-700 font-bold">
                  Shop Description 
               </label>
               <textarea className={`w-full h-24 leading-5 outline-none p-3 resize-none text-slate-700 formScrollbar rounded-lg bg-slate-200 ${ Editable && errors.description ? "ring-1 ring-red-500" :"focus-within:ring-1 ring-slate-700"}`}
                           id="description"
                           {...register("description")}
               spellCheck ={false}
               disabled={!Editable}/>
            </div>
            <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-10 relative">
               {Editable && errors.description?.message}
            </p>


            <div className={`flex flex-col items-center w-full gap-2 mt-2`}>
               <label htmlFor="address"
                  className="ml-1 mr-4 self-start text-slate-700 font-bold">
                  Shop Address
               </label>
               <textarea className={`w-full h-24 leading-5 outline-none p-3 resize-none text-slate-700 formScrollbar rounded-lg bg-slate-200 ${ Editable && errors.address ? "ring-1 ring-red-500" :"focus-within:ring-1 ring-slate-700"}`}
                           id="address"
                           {...register("address")}
               spellCheck={false}
               disabled={!Editable}/>
            </div>
            <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-10 relative">
               {Editable && errors.address?.message}
            </p>

            {
               Editable &&
               <button type="submit"
                     className={`px-4 py-2 mt-4 rounded-md font-bold bg-gray-800 hover:bg-gray-700 text-slate-200 self-end flex items-center gap-x-4 ${disableSubmit ? 'opacity-50': 'opacity-100'}`}
                     disabled={disableSubmit}>
                  <span className={`w-4 h-4 rounded-full border-b-slate-100 border-l-slate-100 border-[0.2rem] border-slate-900 animate-spin ${disableSubmit ? 'inline' : 'hidden'}`}/>
                  Update Profile 
               </button>
            }

         </form>

         <div className={`flex flex-col px-12 py-6 bg-slate-100`}>
            <button  className={`text-slate-700 py-1 text-sm hover:text-emerald-600 self-start`}
                     onClick={changeRoute}>
               Change Password
            </button>
            <button  className={`text-slate-700 py-1 text-sm hover:text-red-700 hover:opacity-100 self-start`}
                     onClick={logOut}>
               Log Out from this device
            </button>
            <button  className={`text-slate-700 py-1 text-sm hover:text-red-700 hover:opacity-100 self-start`}
                     onClick={logOutAllDevices}>
               Log Out from all devices
            </button>
         </div>
      </div>
    )
}

export default sellerProfile

