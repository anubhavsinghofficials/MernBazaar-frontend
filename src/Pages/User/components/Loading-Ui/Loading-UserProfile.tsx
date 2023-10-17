
import { BiSolidUserCircle } from "react-icons/bi";
import { GrMail } from "react-icons/gr";




function UserProfileLoading() {

    return (
        <div className={` py-2 flex flex-col rounded-2xl overflow-hidden  bg-gradient-to-br bg-slate-950 relative mt-14 xs:mt-32 xxs:scale-[0.8] xs:scale-100 border-b-2 border-b-slate-700 duration-100 min-h-[30rem] `}>

            <div className={`flex flex-col pt-16 pl-12`}>
                <h1>
                  <button className="hover:text-emerald-400 active:text-emerald-600 text-emerald-500 font-bold leading-7 text-3xl"
                    >
                    Profile
                  </button>
                </h1>
                <p className="bg-emerald-100 opacity-30 self-start text-emerald-100 mt-1 leading-3 animate-[pulse_2100ms_400ms_infinite]">
                  click on profile to edit
                </p>
            </div>
                
            <form className=" px-8 pt-12 pb-4 flex flex-col grow items-center gap-y-3 rounded-t-3xl rounded-b-xl"
            >
                <div className={`text-slate-100 flex items-center w-full p-2  rounded-full`}>
                        <label htmlFor="name"
                            className=" mr-2 self-stretch flex items-center px-2 text-3xl text-slate-400">
                            <BiSolidUserCircle/>
                        </label>
                        <input className={`px-1 grow py-1 outline-none bg-slate-800 rounded-full min-w-0 animate-pulse`}  
                        disabled/>
                </div>

                <div className={`text-slate-100 flex items-center w-full p-2  rounded-full`}>
                        <label htmlFor="email"
                            className=" mr-2 self-stretch flex items-center px-2 text-xl">
                            <p className="bg-slate-400 rounded-full text-slate-800 p-1">
                                <GrMail/>
                            </p>
                        </label>
                        <input className={`px-1 grow py-1 outline-none bg-slate-800 rounded-full min-w-0 animate-pulse`}  
                        disabled/>
                </div>
            </form>

            <div className={`flex flex-col gap-y-2 px-12 pb-10`}>
               <button  className={`text-slate-800 bg-slate-800 leading-3 py-1 text-sm self-start animate-pulse`}>
                  Change Password
               </button>
               <button  className={`text-slate-800 bg-slate-800 leading-3 py-1 text-sm self-start animate-pulse`}>
                  Log Out from this device
               </button>
               <button  className={`text-slate-800 bg-slate-800 leading-3 py-1 text-sm self-start animate-pulse`}>
                  Log Out from all devices
               </button>
            </div>
        </div>
    )
}
 
export default UserProfileLoading






