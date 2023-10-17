
import { BiSolidUserCircle } from "react-icons/bi";
import { GrMail } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { UserSignUpFormType, zodUserSignupSchema } from "../Public/FormValidators/type-user";
import { AxiosError } from "axios";
import { syncFetchUserDetails, syncUpdateUserDetails } from "@/Store/ServerStore/sync-User";
import { modalStore } from "@/Store/ClientStore/store-Modals";
import { NavLink, useNavigate } from "react-router-dom";
import UserProfileLoading from "./components/Loading-Ui/Loading-UserProfile";



export type userProfileType = Omit<UserSignUpFormType,'password'>

function UserProfile() {

   const [disableSubmit, setDisableSubmit] = useState(false)
   const [Editable, setEditable] = useState(false)
   const [fadeOut, setFadeOut] = useState(true)
   const Navigate = useNavigate()
   const focusDivRef = useRef<HTMLInputElement|null>(null)
   const { setGenericMessage, toggleGenericModal } = modalStore()
   const { data:user, isLoading } = syncFetchUserDetails()
   const { mutate, isError, error } = syncUpdateUserDetails(setEditable)
      
   const zodUserProfileSchema = zodUserSignupSchema.omit({ password: true });
   const form = useForm<userProfileType>({
         defaultValues:{
               name: '',
               email: '',
         },
         mode:"onSubmit",
         resolver:zodResolver(zodUserProfileSchema)
   })
   const { register, formState, handleSubmit } = form
   const { errors } = formState

    useEffect(()=>{
        if (isError) {
            // inferior method, instead handle it in
            // onError inside the custom react query
            const errorData = (error as AxiosError<{error:string}>).response?.data!
            setDisableSubmit(false)
            setGenericMessage(errorData?.error)
            toggleGenericModal()
        }
        if (Editable && focusDivRef.current) {
            const focusDiv = focusDivRef.current.children
            const focusInput = Array.from(focusDiv)[1] as HTMLInputElement
            focusInput.focus()
        }

        if (user) {
            // see below comment
            form.setValue("name", user.name);
            form.setValue("email", user.email);
        }
    },[isError, Editable, user])

    useEffect(()=>{
      setFadeOut(false)
    },[])

    const changeRoute = () => {
      setFadeOut(true)
      setTimeout(() => {
         Navigate('/user/password')
      }, 300);
    }
     

    const onSubmit = ( data:userProfileType ) => {
       const sameEmail = data.email === user.email
       const sameName = data.name === user.name
       if (!sameEmail || !sameName) {
         mutate(data)
         setDisableSubmit(true)
      }
    }

    return (
      <div className={`w-screen min-h-screen flex items-center flex-col bg-slate-900`}>
        {
         isLoading
         ? <UserProfileLoading/>
         : 
         <div className={` py-2 flex flex-col rounded-2xl overflow-hidden  bg-gradient-to-br bg-slate-950 relative mt-14 xs:mt-32 xxs:scale-[0.8] xs:scale-100 border-b-2 border-b-slate-700 ${Editable ? 'border-t-emerald-400' : 'border-t-slate-900'} duration-100 min-h-[30rem] ${fadeOut?'opacity-0':'opacity-100'} transition-opacity duration-300`}>

            <div className={`flex flex-col pt-16 pl-12`}>
               <h1>
                  <button className="hover:text-emerald-400 active:text-emerald-600 text-emerald-500 font-bold leading-7 text-3xl"
                           onClick={()=>setEditable(prev => !prev)}
                           disabled={disableSubmit}>
                  Profile
                  </button>
               </h1>
               <p className="text-emerald-100 opacity-40">
                  click on profile to edit
               </p>
            </div>
               
            <form className=" px-8 pt-10 pb-4 flex flex-col grow items-center gap-y-1 rounded-t-3xl rounded-b-xl"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
               >
               <div className={`text-slate-100 flex items-center w-full p-2  rounded-full focus-within:bg-slate-800 ${ errors.name ? "ring-2 ring-red-400" :""}`}
               ref={focusDivRef}
               >
                  <label htmlFor="name"
                        className=" mr-2 self-stretch flex items-center px-2 text-3xl text-slate-300">
                        <BiSolidUserCircle/>
                  </label>
                  <input className={`px-1 grow py-1 outline-none bg-transparent rounded-full min-w-0 styledPlaceholder`}  
                        type="text"
                        id="name"
                        {...register("name")}
                        placeholder="Enter Your Name"
                        autoComplete="off"
                        disabled={!Editable || disableSubmit}
                        />
               </div>
               <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-10 relative">
                        {errors.name?.message}
               </p>


               <div className={`text-slate-100 flex items-center w-full p-2  rounded-full focus-within:bg-slate-800 ${ errors.email ? "ring-2 ring-red-400" :""}`}>
                  <label htmlFor="email"
                        className=" mr-2 self-stretch flex items-center px-2 text-xl">
                        <p className="bg-slate-300 rounded-full text-slate-800 p-1">
                           <GrMail/>
                        </p>
                  </label>
                  <input className={`px-1 grow py-1 outline-none bg-transparent rounded-full min-w-0 styledPlaceholder`}  
                        type="text"
                        id="email"
                        {...register("email")}
                        placeholder="Enter Your Email"
                        autoComplete="off"
                        disabled={!Editable || disableSubmit}
                        />
               </div>
               <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-10 relative">
                        {errors.email?.message}
               </p>
            {
               Editable &&
               <button type="submit"
                        className={`mt-4 px-4 py-2 rounded-md font-bold bg-gray-950 hover:bg-gray-800 text-slate-200 self-end flex items-center gap-x-4 ${disableSubmit ? 'opacity-50': 'opacity-100'}`}
                        disabled={disableSubmit}>
                  <span className={`w-4 h-4 rounded-full border-b-slate-100 border-l-slate-100 border-[0.2rem] border-slate-900 animate-spin ${disableSubmit ? 'inline' : 'hidden'}`}/>
                  Update Profile
               </button>
            }
            </form>

            <button  className={`text-emerald-500 px-4 py-2 text-sm hover:text-emerald-400 self-start`}
                     onClick={changeRoute}>
               Change Password
            </button>
         </div>
        }
         
      </div>
    )
}
 
export default UserProfile




// can also do it like:
// form.reset({
//    name:user.name,
//    email:user.email
// })

