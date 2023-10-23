import { AiOutlineShoppingCart } from "react-icons/ai"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { BsFileImageFill } from "react-icons/bs"


function CartItemsBoxLoading({length}:{length:number}) {
     return (
        <Accordion className=" bg-white shadow-md"
                   type="single"
                   defaultValue="cartItems">
            
            <AccordionItem value="cartItems">
                <AccordionTrigger className="flex items-center gap-x-4 bg-slate-800 text-white px-4 py-4 font-semibold rounded-t-md hover:no-underline hover:bg-slate-950 active:bg-slate-800">
                <p className="flex items-center gap-x-4 text-lg px-4">
                            <AiOutlineShoppingCart/>
                            Cart Items
                        </p>
                </AccordionTrigger>
                <AccordionContent >
                    <div className={`flex flex-col px-2 gap-y-2 xl:max-h-[32rem] overflow-auto accordianScrollbar mt-4`}>
                    {
                        Array.from({length:length}).map((_,i) => (
                            <div className={`h-32 bg-white rounded-md flex-none shadow-md flex gap-x-4 p-2`}
                                key={i}>
                                <div className="w-1/4 object-contain bg-slate-200 rounded-md flex justify-center items-center text-5xl text-slate-400">
                                    <BsFileImageFill className='animate-pulse'/>
                                </div>
                                <div className={`w-3/4 flex flex-col justify-between`}>
                                    <p className="font-semibold line-clamp-2 leading-[1.4rem] bg-slate-300 text-slate-300 animate-[pulse_2000ms_400ms_infinite] h-8">
                                            xxx
                                    </p>
                                    <div className={`h-1/2 flex items-start gap-x-4 bg-red-10 pt-1`}>
                                        <p className="text-xl font-semibold text-slate-300 bg-slate-300 rounded-md animate-pulse">
                                            xxx
                                        </p>
                                        <div className="w-12 h-7 bg-slate-300 rounded-md animate-pulse"/>
                                        <div className={`grow flex justify-end xs:px-4`}>
                                            <button className={`mt-1 ring-1 ring-transparent text-slate-300 bg-slate-300 px-2 font-semibold rounded-lg animate-[pulse_2000ms_700ms_infinite]`}>
                                                xxx
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
 
export default CartItemsBoxLoading