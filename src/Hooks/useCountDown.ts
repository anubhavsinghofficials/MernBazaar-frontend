
import { useEffect, useState } from 'react'
import { nextSaleDate } from '../Store/ClientStore/store-Constants'


function useCountDown() {
    const nextSaleTime = new Date(nextSaleDate).getTime()
    const [CountDown, setCountDown] = useState({
        Days:0,
        Hrs:0,
        Mins:0,
        Secs:0
    })

    useEffect(()=>{
        const timer = setInterval(()=>{
        const currentTime = new Date().getTime()
        const timeLeft = nextSaleTime - currentTime

        if (timeLeft <= 0) {
            clearInterval(timer);
            setCountDown({ Days: 0, Hrs: 0, Mins: 0, Secs: 0 });
        }

        const Days = Math.floor(timeLeft/(1000*60*60*24))
        const Hrs = Math.floor(timeLeft%(1000*60*60*24)/(1000*60*60))
        const Mins = Math.floor(timeLeft%(1000*60*60)/(1000*60))
        const Secs = Math.floor(timeLeft%(1000*60)/1000)    
        setCountDown({Days,Hrs,Mins,Secs})
        },1000)
        return () => clearInterval(timer)
    },[])

    return CountDown
}
 
export default useCountDown













// Alternate method: ____________________________


// import { useEffect, useState } from 'react'
// import { nextSaleDate } from '../Store/ClientStore/store-Constants'

// type getTimeProps = 'd' | 'h' | 'm' | 's'

// function useCountDown() {
//     const nextSaleTime = new Date(nextSaleDate).getTime()
//     const [Days, setDays] = useState(0)
//     const [Hrs, setHrs] = useState(0)
//     const [Mins, setMins] = useState(0)
//     const [Secs, setSecs] = useState(0)
//     let remaining = 0

//     useEffect(()=>{
//         const timer = setInterval(()=>{
//         const currentTime = new Date().getTime()
//         const timeLeft = nextSaleTime - currentTime
//         const daysLeft = Math.floor(timeLeft/(1000*60*60*24))
//         setDays(daysLeft)
//         remaining = timeLeft/(1000*60*60*24) - daysLeft
//         const HrsLeft = Math.floor(remaining*24)
//         setHrs(HrsLeft)
//         remaining = remaining*24 - HrsLeft
//         const minsLeft = Math.floor(remaining*60)
//         setMins(minsLeft)
//         remaining = remaining*60 - minsLeft
//         const secsLeft = Math.floor(remaining*60)    
//         setSecs(secsLeft)
//       },1000)

//       return () => clearInterval(timer)
//     },[])

//     return { Days, Hrs, Mins, Secs }
// }
 
// export default useCountDown