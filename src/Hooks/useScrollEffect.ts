

import { useEffect, useState } from "react"

type useScrollEffectPropsType = {
    scrollPadRef : React.RefObject<HTMLElement | null>
    scrollBy     : number
}


export const useScrollEffect = (props:useScrollEffectPropsType) => {

    const { scrollPadRef, scrollBy } = props
    const [rightScroll, setRightScroll] = useState(false)
    const [leftScroll, setLeftScroll] = useState(false)

    useEffect(() => {
        const categoryBarElement = scrollPadRef.current
        if (categoryBarElement) {
            categoryBarElement.addEventListener('scroll',toggleScrollButtons)
            toggleScrollButtons()
        }
        return () => {
            if (categoryBarElement) {
                categoryBarElement.removeEventListener('scroll', toggleScrollButtons)
            }
        }
    },[scrollPadRef.current?.children])

    function toggleScrollButtons() {
        const categoryBarElement = scrollPadRef.current
        if (categoryBarElement) {
            const scrollLeft = categoryBarElement.scrollLeft
            const scrollWidth = categoryBarElement.scrollWidth
            const clientWidth = categoryBarElement.clientWidth
            setLeftScroll( scrollLeft > 0 )
            setRightScroll( scrollLeft < scrollWidth - clientWidth )
        }
    }

    const handleScrollX = (direction:number) => {
        const categoryBar = scrollPadRef.current
        if (categoryBar && direction === -1) {
            categoryBar.scrollLeft = categoryBar.scrollLeft - scrollBy
        } else if (categoryBar && direction === 1) {
            categoryBar.scrollLeft = categoryBar.scrollLeft + scrollBy
        }
        toggleScrollButtons()
    }

    return { handleScrollX, leftScroll, rightScroll }
}












// Extra _________________________________________________

    // useEffect(() => {
    //     const categoryBarElement = categoryBarRef.current;
    //     if (categoryBarElement) {
    //         categoryBarElement.addEventListener('scroll',toggleScrollButtons);
    //         toggleScrollButtons();
    //     }
    //     return () => {
    //         if (categoryBarElement) {
    //             categoryBarElement.removeEventListener('scroll', toggleScrollButtons);
    //         }
    //     }
    // }, []);

    // function toggleScrollButtons() {
    //     const categoryBarElement = categoryBarRef.current;
    //     if (categoryBarElement) {
    //     setLeftScroll(categoryBarElement.scrollLeft > 0);
    //     setRightScroll(
    //         categoryBarElement.scrollLeft <
    //         categoryBarElement.scrollWidth - categoryBarElement.clientWidth
    //     );
    //     }
    // }
     

    // const handleScrollX = (direction:number) => {
    //     const categoryBar = categoryBarRef.current
    //     if (categoryBar && direction === -1) {
    //         categoryBar.scrollLeft = categoryBar.scrollLeft - 100
    //     } else if (categoryBar && direction === 1) {
    //         categoryBar.scrollLeft = categoryBar.scrollLeft + 100
    //     }
    //     toggleScrollButtons()
    // }
     