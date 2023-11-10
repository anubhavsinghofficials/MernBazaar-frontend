import { useSideEffect } from "@/Hooks/useSideEffect"
import { modalStore } from "@/Store/ClientStore/store-Modals"
import React, { useEffect, useState } from "react"


function IntroductionModal() {

    const { showIntroModal, toggleShowIntroModal } = modalStore()
    const [fadeOut, setFadeOut] = useState(true)
    const [currentSlide, setCurrentSlide] = useState(1)

    const [fadeSlide1, setFadeSlide1] = useState(false)
    const [fadeSlide2, setFadeSlide2] = useState(true)
    const [fadeSlide3, setFadeSlide3] = useState(true)

    const [mountSlide1, setMountSlide1] = useState(true)
    const [mountSlide2, setMountSlide2] = useState(false)
    const [mountSlide3, setMountSlide3] = useState(false)

    useEffect(()=>{
        if (showIntroModal) {
            setFadeOut(false)
            window.document.body.style.overflowY = "hidden"
        } else {
            setFadeOut(true)
            window.document.body.style.overflowY = "visible"
        }
    },[showIntroModal])


    useSideEffect(()=>{
      if (currentSlide === 1) {
          setFadeSlide1(false)
      } else if (currentSlide === 2) {
          setFadeSlide1(true)
          setTimeout(() => {
              setMountSlide1(false)
              setMountSlide2(true)
          }, 100)
          setTimeout(() => {
              setFadeSlide2(false)
          }, 125)
      } else if (currentSlide === 3) {
          setFadeSlide2(true)
          setTimeout(() => {
            setMountSlide2(false)
            setMountSlide3(true)
          }, 100)
          setTimeout(() => {
              setFadeSlide3(false)
          }, 125)
      }
    },[currentSlide])


    const handleConfirm = (e:React.MouseEvent) =>{
        e.stopPropagation()

        if (currentSlide < 3) {
            setCurrentSlide(prev => prev + 1)            
        } else {
            setFadeOut(true)
            window.document.body.style.overflowY = "visible"
            setTimeout(() => {
                toggleShowIntroModal()
            }, 500)
        }
    }

    const handleSkip = (e:React.MouseEvent) => {
        e.stopPropagation()
        setFadeOut(true)
        window.document.body.style.overflowY = "visible"
        setTimeout(() => {
            toggleShowIntroModal()
        }, 500);
    }

    if (!showIntroModal) {
        return
    }
     
    return (
        <div className={`fixed w-screen h-screen flex justify-center items-center top-0 left-0 bg-black z-[1000] bg-opacity-70 backdrop-blur-sm transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        >
            <div className={`w-[80%] xs:w-96 md:w-[28rem] h-44 xs:h-56 rounded-lg p-2 xs:p-4 px-6 pb-2 flex flex-col bg-slate-50 relative`}
                 onClick={(e)=> e.stopPropagation()}
            >
                {
                    mountSlide1 &&
                    <div className={`grow flex flex-col items-center justify-center bg-[url('@/assets/welcomeGif.gif')] bg-cover ${fadeSlide1? 'opacity-0' : 'opacity-100'} duration-200`}>
                        <p className={`text-lg xs:text-xl font-semibold text-slate-700`}>
                            Welcome to
                        </p>
                        <p className={`leading-6 text-3xl xs:leading-6 xs:text-4xl font-bold text-green-800`}>
                            MernBazaar
                        </p>
                    </div>
                }
                {
                    mountSlide2 &&
                    <div className={`grow flex flex-col gap-y-2 xs:gap-y-4 items-center justify-center ${fadeSlide2? 'opacity-0' : 'opacity-100'} duration-200`}>
                        <p className={`leading-6 text-2xl xs:leading-6 xs:text-3xl font-bold text-green-800`}>
                            Pick a Role!!
                        </p>
                        <p className={`leading-4 text-sm xs:text-lg xs:leading-6 font-semibold text-slate-600 text-center`}>
                            Be a user and explore the website or be a seller and access  advanced functionalities
                        </p>
                    </div>
                }
                {
                    mountSlide3 &&
                    <div className={`grow flex flex-col gap-y-2 xs:gap-y-4 items-center justify-center ${fadeSlide3? 'opacity-0' : 'opacity-100'} duration-200`}>
                        <p className={`leading-6 text-2xl xs:leading-6 xs:text-3xl font-bold text-green-800 whitespace-nowrap`}>
                            Wanna skip login ?
                        </p>
                        <p className={`leading-4 text-sm xs:text-lg xs:leading-6 font-semibold text-slate-600 text-center xs:px-2`}>
                            Use Dummy login details given on login page so you don't have to use your own credentials
                        </p>
                    </div>
                }


                <div className={`self-stretch flex justify-end items-center`}>
                    <div className={`grow xs:px-4 flex items-center gap-x-2`}>
                        <div className={`h-2 xs:h-3 aspect-square rounded-full ${currentSlide===1?'bg-green-500 scale-105':'bg-slate-300 scale-95'} transition-colors duration-100`}/>
                        <div className={`h-2 xs:h-3 aspect-square rounded-full ${currentSlide===2?'bg-green-500 scale-105':'bg-slate-300 scale-95'} transition-colors duration-100`}/>
                        <div className={`h-2 xs:h-3 aspect-square rounded-full ${currentSlide===3?'bg-green-500 scale-105':'bg-slate-300 scale-95'} transition-colors duration-100`}/>
                    </div>

                    <button
                        className={`px-4 py-2 font-semibold hover:bg-slate-100 active:bg-slate-200 duration-100 text-slate-700 ${fadeSlide3 ? 'opacity-100' : 'opacity-0'} duration-1000`}
                        onClick={handleSkip}>
                        Skip
                    </button>
                    <button
                        className="px-4 py-2 font-semibold hover:bg-green-100 active:bg-green-200 duration-100 text-green-800"
                        onClick={handleConfirm}>
                            {
                                currentSlide < 3
                                ? 'Next'
                                : 'Explore'
                            }
                    </button>
                </div>
           </div>
        </div>
    )
}
 
export default IntroductionModal
