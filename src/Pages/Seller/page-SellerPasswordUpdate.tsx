
import { BiSolidLockAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { MdVpnKey } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { passwordsType, zodPasswordSchema } from "../User/page-UserPasswordUpdate";
import { syncUpdateSellerPassword } from "@/Store/ServerStore/sync-Seller";



function SellerPasswordUpdate() {
    
    const [disableSubmit, setDisableSubmit] = useState(false)
    const [currentPassword, seeCurrentPassword] = useState(false)
    const Navigate = useNavigate()
    const [newPassword, seeNewPassword] = useState(false)
    const [fadeOut, setFadeOut] = useState(true)
    const { mutate } = syncUpdateSellerPassword(setDisableSubmit)
        
    
    useEffect(()=>{
        setFadeOut(false)
        window.scrollTo({ top: 0 })
      },[])
      
    const form = useForm<passwordsType>({
            mode:"onSubmit",
            resolver:zodResolver(zodPasswordSchema)
    })
    const { register, formState, handleSubmit } = form
    const { errors } = formState

    const changeRoute = () => {
        setFadeOut(true)
        setTimeout(() => {
           Navigate('/seller/profile')
        }, 300);
    }
       
    const onSubmit = ( data:passwordsType ) => {
         mutate(data)
         setDisableSubmit(true)
    }


    return (
         <div className={`mx-auto w-[19rem] xs:w-[26rem] sm:w-[30rem] flex flex-col rounded-2xl overflow-hidden bg-gradient-to-br bg-slate-700 shadow-md relative min-h-[26rem] ${fadeOut?'opacity-0':'opacity-100'} transition-opacity duration-300`}>

            <div className={`flex flex-col pt-6 pb-4 xs:pt-10 xs:pb-8 pl-8 xs:pl-12 bg-slate-700`}>
               <h1 className="text-slate-200 font-bold leading-7 text-xl xs:text-2xl">
                  Change Password
               </h1>
            </div>
               
            <form className="px-4 xs:px-8 pt-10 pb-4 flex flex-col grow items-center gap-y-2 rounded-t-xl xs:rounded-t-3xl bg-white"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
               >

               <div className={`text-slate-100 flex items-center w-full p-2 rounded-md bg-slate-200 ${ errors.currentPassword ? "ring-1 ring-red-500" :"focus-within:ring-1 ring-slate-700"}`}>
                        <label htmlFor="currentPassword"
                            className=" mr-2 self-stretch flex items-center px-2 text-xl">
                            <p className="bg-slate-700 rounded-md text-slate-200 p-2 text-lg">
                                <MdVpnKey/>
                            </p>
                        </label>
                        <input className={`px-1 grow py-1 outline-none bg-transparent rounded-full min-w-0 styledPlaceholder text-slate-700 font-semibold`}  
                            type={currentPassword?"text":"password"}
                            id="currentPassword"
                            {...register("currentPassword")}
                            placeholder="Current Password"
                            autoComplete="off"
                            autoFocus/>
                        <button type="button" className=" ml-2 self-stretch flex items-center px-2 text-xl text-slate-700"
                            onClick={() => seeCurrentPassword(prev => !prev)}>
                            {
                                currentPassword
                                ? <BsEyeSlashFill/>
                                : <BsEyeFill/>
                            }
                        </button>
                </div>
                <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-10 relative">
                        {errors.currentPassword?.message}
               </p>


               <div className={`text-slate-100 flex items-center w-full p-2 rounded-md bg-slate-200 ${ errors.newPassword ? "ring-1 ring-red-500" :"focus-within:ring-1 ring-slate-700"}`}>
                        <label htmlFor="newPassword"
                            className=" mr-2 self-stretch flex items-center px-2 text-xl">
                            <p className="bg-slate-700 rounded-md text-slate-200 p-2 text-lg">
                                <BiSolidLockAlt/>
                            </p>
                        </label>
                        <input className={`px-1 grow py-1 outline-none bg-transparent rounded-full min-w-0 styledPlaceholder text-slate-700 font-semibold`}  
                            type={newPassword?"text":"password"}
                            id="newPassword"
                            {...register("newPassword")}
                            placeholder="New Password"
                            autoComplete="off"/>
                        <button type="button" className=" ml-2 self-stretch flex items-center px-2 text-xl text-slate-700"
                            onClick={() => seeNewPassword(prev => !prev)}>
                            {
                                newPassword
                                ? <BsEyeSlashFill/>
                                : <BsEyeFill/>
                            }
                        </button>
                </div>
                <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-10 relative">
                        {errors.newPassword?.message}
               </p>


                <button type="submit"
                        className={`mt-4 px-4 py-2 rounded-md font-bold bg-gray-950 hover:bg-gray-800 text-slate-200 self-end flex items-center gap-x-4 ${disableSubmit ? 'opacity-50': 'opacity-100'}`}
                        disabled={disableSubmit}>
                    <span className={`w-4 h-4 rounded-full border-b-slate-100 border-l-slate-100 border-[0.2rem] border-slate-900 animate-spin ${disableSubmit ? 'inline' : 'hidden'}`}/>
                    Update
                </button>
            </form>

            <div className={`bg-slate-100`}>
                <button className={`ml-12 my-2 py-2 text-sm text-slate-700 hover:text-emerald-700 self-start`}
                    onClick={changeRoute}>
                    Go to Profile
                </button>
            </div>
         </div>
    )
}
 
export default SellerPasswordUpdate