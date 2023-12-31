
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { BiSolidChevronRight, BiSolidChevronDown, BiSolidLockAlt, BiSolidChevronLeft } from "react-icons/bi";
import { GrMail } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserLogInFormType, zodUserLogInSchema } from "./FormValidators/type-user";
import { useNavigate } from "react-router-dom";
import { testUser } from "@/Store/ClientStore/store-Constants";
import { syncLoginUser } from "@/Store/ServerStore/sync-User";





function UserLogIn() {

    const [Password, seePassword] = useState(false)
    const [disableSubmit, setDisableSubmit] = useState(false)
    const [openForm, setOpenForm] = useState(false)
    const { mutate } = syncLoginUser(setDisableSubmit)
    const Navigate = useNavigate()

    useEffect(()=>{
        if (!openForm) {
            window.scrollTo({ top: 0 })
            setOpenForm(true)
        }
    },[])


    const handleRoute = (route:string) => {
        setOpenForm(false)
        setTimeout(() => {
            Navigate(route)
        }, 500)
    }

    const backToHome = () => {
        setOpenForm(false)
        setTimeout(() => {
            Navigate('/home')
        }, 500)
    }

    const form = useForm<UserLogInFormType>({
        defaultValues:{
            email: testUser.email,
            password: testUser.password,
        },
        mode:"onSubmit",
        resolver:zodResolver(zodUserLogInSchema)
    })
    const { register, formState, handleSubmit } = form
    const { errors } = formState

    const onSubmit = ( data:UserLogInFormType ) => {
        setDisableSubmit(true)
        mutate(data)
    }

    return (
        <div className={`w-screen min-h-screen flex items-center flex-col bg-slate-900`}>

        <div className={`py-2 flex flex-col rounded-2xl overflow-hidden bg-gradient-to-br bg-slate-900 relative mt-14 xs:mt-32 xxs:scale-[0.8] xs:scale-100 border-t-2 border-t-emerald-400 shadow-lg shadow-slate-950 max-h-0 ${openForm?'openForm':'collapseForm'}`}>

            <div className={`flex flex-col gap-y-1 pt-20 pl-12`}>
                <p className="bg-emerald-400 text-black rounded-bl-xl absolute top-0 right-0 py-1 px-8 font-bold flex items-center">
                    User
                </p>
                <h1 className="text-slate-100 font-bold leading-7 text-3xl">
                    Log In
                </h1>

                <div className="w-[80%] absolute left-12 text-slate-400 top-32 leading-5">
                    <p>Use these given test details for testing,</p>
                    <p>You can also use your own credentials</p>
                </div>
            </div>

            
            <button className="text-white bg-slate-900 absolute top-0 left-0 px-2 py-1 flex items-center gap-x-2 rounded-br-lg hover:bg-slate-950"
            onClick={backToHome}>
                <p className="animate-hoverWaveLR">
                    <BiSolidChevronLeft/>
                </p>
                Home
            </button>

                
            <form className=" px-8 pt-20 pb-24 flex flex-col grow items-center gap-y-2 rounded-t-3xl rounded-b-xl"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate>
                
                <div className={`text-slate-100 flex items-center w-full p-2  rounded-full focus-within:bg-slate-700 ${ errors.email ? "ring-2 ring-red-400" :""}`}>
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
                            autoComplete="off"/>
                </div>
                <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-10 relative">
                        {errors.email?.message}
                </p>


                <div className={`text-slate-100 flex items-center w-full p-2 rounded-full focus-within:bg-slate-700 ${ errors.password ? "ring-2 ring-red-400" :""}`}>
                        <label htmlFor="password"
                            className=" mr-2 self-stretch flex items-center px-2 text-xl">
                            <p className="bg-slate-300 rounded-full text-slate-800 p-1">
                                <BiSolidLockAlt/>
                            </p>
                        </label>
                        <input className={`px-1 grow py-1 outline-none bg-transparent rounded-full min-w-0 styledPlaceholder`}  
                            type={Password?"text":"password"}
                            id="password"
                            {...register("password")}
                            placeholder="Enter Your Password"
                            autoComplete="off"/>
                        <button type="button" className=" ml-2 self-stretch flex items-center px-2 text-xl"
                                    onClick={() => seePassword(prev => !prev)}>
                                    {
                                    Password
                                    ? <BsEyeSlashFill/>
                                    : <BsEyeFill/>
                                    }
                        </button>
                </div>
                <p className="text-red-500 font-normal bottom-[0.2rem] self-start left-10 relative">
                        {errors.password?.message}
                </p>
                
                <button type="submit"
                        className={`mt-4 px-4 py-2 rounded-md font-bold bg-gray-900 hover:bg-gray-950 text-slate-200 self-end flex items-center gap-x-2 ${disableSubmit ? 'opacity-50': 'opacity-100'}`}
                        disabled={disableSubmit}>
                    <span className={`w-4 h-4 rounded-full border-b-slate-100 border-l-slate-100 border-[0.2rem] border-slate-900 animate-spin ${disableSubmit ? 'inline' : 'hidden'}`}/>
                    Log In 
                    <p className="animate-hoverWaveLR ">
                        <BiSolidChevronRight/>
                    </p>
                </button>
            </form>


            <div className={`bg-slate-900 flex flex-col px-8 py-8 gap-y-3 rounded-t-3xl absolute  -bottom-36 hover:bottom-0 group duration-300 w-full hover:bg-slate-950`}>
                <div className={`pb-4 flex items-center gap-x-2 text-slate-300`}>
                    <p className="text-xl animate-hoverWaveTB">
                        <BiSolidChevronDown/>
                    </p>
                    <p className="font-semibold">
                        Don't have an Account yet ?
                    </p>
                </div>
                <button className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 rounded-md font-bold py-2 px-4 text-left flex justify-between items-center text-emerald-100 hover:brightness-110 active:brightness-90" onClick={() => handleRoute("/register/user")}>
                    Create Account
                    <BiSolidChevronRight/>
                </button>
                <button className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 rounded-md font-bold py-2 px-4 text-left flex justify-between items-center text-emerald-100 hover:brightness-110 active:brightness-90" onClick={() => handleRoute("/login/seller")}>
                    Login as Seller
                    <BiSolidChevronRight/>
                </button>
            </div>
            
        </div>

    </div>
    )
}
 
export default UserLogIn






