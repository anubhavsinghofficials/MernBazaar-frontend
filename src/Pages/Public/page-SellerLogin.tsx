
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { BiSolidChevronRight, BiSolidChevronDown, BiSolidLockAlt, BiSolidChevronLeft } from "react-icons/bi";
import { GrMail } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SellerLogInFormType, zodSellerLogInSchema } from "./FormValidators/type-seller";
import { useNavigate } from "react-router-dom";
import { testSeller } from "@/Store/ClientStore/store-Constants";
import { syncLoginSeller } from "@/Store/ServerStore/sync-Seller";
import { AxiosError } from "axios";
import { modalStore } from "@/Store/ClientStore/store-Modals";






function SellerLogIn() {

    const [Password, seePassword] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const { setGenericMessage, toggleGenericModal } = modalStore()
    const { mutate, isError, error } = syncLoginSeller()
    const Navigate = useNavigate()
  
    useEffect(()=>{
      if (!openForm) {
          window.scrollTo({ top: 0 })
          setOpenForm(true)
      }
      if (isError) {
          const errorData = (error as AxiosError<{error:string}>).response?.data!
          setDisableSubmit(false)
          setGenericMessage(errorData?.error)
          toggleGenericModal()
      }
  },[isError])
  
  
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
     
  
    const form = useForm<SellerLogInFormType>({
      defaultValues: {
        email: testSeller.email,
        password: testSeller.password,
      },
      mode: "onSubmit",
      resolver: zodResolver(zodSellerLogInSchema),
    })
    const { register, formState, handleSubmit } = form;
    const { errors } = formState;
  
    const onSubmit = (data: SellerLogInFormType) => {
      setDisableSubmit(true);
      mutate(data)
    }

    return (
    <div className={`flex min-h-screen w-screen flex-col items-center justify-start bg-slate-900`}
    >
        <div
          className={`relative mt-20 flex max-h-0 flex-col overflow-hidden rounded-2xl border-t-2 border-t-yellow-400 bg-slate-900 bg-gradient-to-br px-4 py-2 shadow-lg shadow-slate-950 xxs:scale-[0.9] xs:mt-32 xs:scale-100 xs:px-0 ${
            openForm ? "openForm" : "collapseForm"}`}>
          <div className={`flex flex-col gap-y-1 pt-16 xxs:pl-4 xs:pl-12 xs:pt-20`}
          >
            <p className="absolute right-0 top-0 rounded-bl-xl bg-yellow-400 px-9 py-1 font-bold text-black">
              Seller
            </p>
            <h1 className="text-3xl font-bold leading-7 text-slate-100">
              Log In
            </h1>
  
            {/* <div className={`h-1 bg-slate-600 w-1/2`}/> */}
            <div className="absolute top-28 w-[90%] leading-5 text-slate-400 xs:left-12 xs:top-32">
              <p>Use these given test details for testing,</p>
              <p>You can also use your own credentials</p>
            </div>
          </div>
  
          <button className="absolute left-0 top-0 flex items-center gap-x-2 rounded-br-lg bg-slate-900 px-2 py-1 text-white hover:bg-slate-950"
          onClick={backToHome}>
            <p className="animate-hoverWaveLR">
              <BiSolidChevronLeft />
            </p>
            Home
          </button>
  
          <form
            className=" flex grow flex-col items-center gap-y-2 rounded-b-xl rounded-t-3xl pb-24 pt-20 xs:px-8"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div
              className={`flex w-full items-center rounded-full p-2  text-slate-100 focus-within:bg-slate-700 ${
                errors.email ? "ring-2 ring-red-400" : ""}`}
            >
              <label
                htmlFor="email"
                className=" mr-2 flex items-center self-stretch px-2 text-xl"
              >
                <p className="rounded-full bg-slate-300 p-1 text-slate-800">
                  <GrMail />
                </p>
              </label>
              <input
                className={`styledPlaceholder min-w-0 grow rounded-full bg-transparent px-1 py-1 outline-none`}
                type="text"
                id="email"
                {...register("email")}
                placeholder="Enter Your Email"
                autoComplete="off"
              />
            </div>
            <p className="relative bottom-[0.2rem] left-10 self-start font-normal text-red-500">
              {errors.email?.message}
            </p>
  
            <div
              className={`flex w-full items-center rounded-full p-2 text-slate-100 focus-within:bg-slate-700 ${
                errors.password ? "ring-2 ring-red-400" : ""
              }`}
            >
              <label
                htmlFor="password"
                className=" mr-2 flex items-center self-stretch px-2 text-xl"
              >
                <p className="rounded-full bg-slate-300 p-1 text-slate-800">
                  <BiSolidLockAlt />
                </p>
              </label>
              <input
                className={`styledPlaceholder min-w-0 grow rounded-full bg-transparent px-1 py-1 outline-none`}
                type={Password ? "text" : "password"}
                id="password"
                {...register("password")}
                placeholder="Enter Your Password"
                autoComplete="off"
              />
              <button
                type="button"
                className=" ml-2 flex items-center self-stretch px-2 text-xl"
                onClick={() => seePassword((prev) => !prev)}
              >
                {Password ? <BsEyeSlashFill /> : <BsEyeFill />}
              </button>
            </div>
            <p className="relative bottom-[0.2rem] left-10 self-start font-normal text-red-500">
              {errors.password?.message}
            </p>
  
            <button
              type="submit"
              className={`mt-4 flex items-center gap-x-2 self-end rounded-md bg-gray-900 px-4 py-2 font-bold text-slate-200 hover:bg-gray-950 ${
                disableSubmit ? "opacity-50" : "opacity-100"
              }`}
              disabled={disableSubmit}
            >
              <span
                className={`h-4 w-4 animate-spin rounded-full border-[0.2rem] border-slate-900 border-b-slate-100 border-l-slate-100 ${
                  disableSubmit ? "inline" : "hidden"
                }`}
              />
              Log In
              <p className="animate-hoverWaveLR ">
                <BiSolidChevronRight />
              </p>
            </button>
          </form>
  
          <div
            className={`group absolute -bottom-36 flex w-full flex-col gap-y-3 rounded-t-3xl bg-slate-900 px-8 py-8 duration-300 hover:bottom-0 hover:bg-slate-950`}
          >
            <div className={`flex items-center gap-x-2 pb-4 text-slate-300`}>
                <p className="animate-hoverWaveTB text-xl">
                    <BiSolidChevronDown />
                </p>
                <p className="font-semibold">
                    Don't have an Account yet ?
                </p>
            </div>
            <button
              className="flex items-center justify-between rounded-md bg-gradient-to-r from-yellow-800 via-yellow-700 to-yellow-800 px-4 py-2 text-left font-bold text-yellow-100 hover:brightness-110 active:brightness-90"
              onClick={() => handleRoute("/register/seller")}
            >
              Create Account
              <BiSolidChevronRight />
            </button>
            <button
              className="flex items-center justify-between rounded-md bg-gradient-to-r from-yellow-800 via-yellow-700 to-yellow-800 px-4 py-2 text-left font-bold text-yellow-100 hover:brightness-110 active:brightness-90"
              onClick={() => handleRoute("/login/user")}
            >
              Login as User
              <BiSolidChevronRight />
            </button>
          </div>
        </div>
      </div>
    )
}
 
export default SellerLogIn






