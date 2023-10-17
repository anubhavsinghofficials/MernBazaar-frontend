
import { BiSolidLockAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { z } from 'zod'
import { MdVpnKey } from "react-icons/md";
import { syncUpdateUserPassword } from "@/Store/ServerStore/sync-User";
import { useNavigate } from "react-router-dom";




export type passwordsType = z.infer<typeof zodPasswordSchema>
export const zodPasswordSchema = z.object({

    currentPassword     : z.string()
                    .trim()
                    .nonempty("Enter Current Password")
                    .max(10,"It should not exceed length 10")
                    .min(6,"It should be atleast length 6"),
    newPassword     : z.string()
                    .trim()
                    .nonempty("Enter New Password required")
                    .max(10,"It should not exceed length 10")
                    .min(6,"It should be atleast length 6"),
})


function UserPasswordUpdate() {
    
    const [disableSubmit, setDisableSubmit] = useState(false)
    const [currentPassword, seeCurrentPassword] = useState(false)
    const Navigate = useNavigate()
    const [newPassword, seeNewPassword] = useState(false)
    const [fadeOut, setFadeOut] = useState(true)
    const { mutate } = syncUpdateUserPassword(setDisableSubmit)
        
    
    useEffect(()=>{
        setFadeOut(false)
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
           Navigate('/user/profile')
        }, 300);
    }
       
    const onSubmit = ( data:passwordsType ) => {
         mutate(data)
         setDisableSubmit(true)
    }


    return (
        <div className={`w-screen min-h-screen flex items-center flex-col bg-slate-900`}
        >
         <div className={` py-2 flex flex-col rounded-2xl overflow-hidden  bg-gradient-to-br bg-slate-950 relative mt-14 xs:mt-32 xxs:scale-[0.8] xs:scale-100 border-b-2 border-b-slate-700 border-t-emerald-400 min-h-[26rem] ${fadeOut?'opacity-0':'opacity-100'} transition-opacity duration-300`}>

            <div className={`flex flex-col pt-16 pl-12`}>
               <h1>
                  <button className="hover:text-emerald-400 active:text-emerald-600 text-emerald-500 font-bold leading-7 text-2xl"
                          disabled={disableSubmit}>
                  Change Password
                  </button>
               </h1>
            </div>
               
            <form className=" px-8 pt-10 pb-4 flex flex-col grow items-center gap-y-2 rounded-t-3xl rounded-b-xl"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
               >

               <div className={`text-slate-100 flex items-center w-full p-2 rounded-full focus-within:bg-slate-700 ${ errors.currentPassword ? "ring-2 ring-red-400" :""}`}>
                        <label htmlFor="currentPassword"
                            className=" mr-2 self-stretch flex items-center px-2 text-xl">
                            <p className="bg-slate-300 rounded-full text-slate-800 p-1">
                                <MdVpnKey/>
                            </p>
                        </label>
                        <input className={`px-1 grow py-1 outline-none bg-transparent rounded-full min-w-0 styledPlaceholder`}  
                            type={currentPassword?"text":"password"}
                            id="currentPassword"
                            {...register("currentPassword")}
                            placeholder="Current Password"
                            autoComplete="off"
                            autoFocus/>
                        <button type="button" className=" ml-2 self-stretch flex items-center px-2 text-xl"
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


               <div className={`text-slate-100 flex items-center w-full p-2 rounded-full focus-within:bg-slate-700 ${ errors.newPassword ? "ring-2 ring-red-400" :""}`}>
                        <label htmlFor="newPassword"
                            className=" mr-2 self-stretch flex items-center px-2 text-xl">
                            <p className="bg-slate-300 rounded-full text-slate-800 p-1">
                                <BiSolidLockAlt/>
                            </p>
                        </label>
                        <input className={`px-1 grow py-1 outline-none bg-transparent rounded-full min-w-0 styledPlaceholder`}  
                            type={newPassword?"text":"password"}
                            id="newPassword"
                            {...register("newPassword")}
                            placeholder="New Password"
                            autoComplete="off"/>
                        <button type="button" className=" ml-2 self-stretch flex items-center px-2 text-xl"
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

            
            <button className={`text-emerald-500 px-4 py-2 text-sm hover:text-emerald-400 self-start`}
                onClick={changeRoute}>
                Go to Profile
            </button>
         </div>
         
      </div>
    )
}
 
export default UserPasswordUpdate