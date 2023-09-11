

import { useEffect, useRef } from "react"

function useSideEffect(sideEffect:any, dependencies:any) {
    const firstMount = useRef(true)
    useEffect(()=>{
        if (firstMount.current) {
            firstMount.current = false
        } else {
            return sideEffect()
        }
    },dependencies)
}
 
export default useSideEffect
