import { AiOutlineShoppingCart } from "react-icons/ai"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { LuExternalLink } from "react-icons/lu"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import { syncAddToCart, syncDeleteCartProduct } from "@/Store/ServerStore/sync-User"
  

export type cartItemType = {
    _id: string
    image: string
    name: string
    price: number
    product: string
    quantity: number
    stock:number
}
type cartArrayType = {
    cart:cartItemType[]
}

function CartItemsBox(props:cartArrayType) {
    const { cart } = props
    const [disableSelect, setDisableSelect] = useState(false)
    const { mutate:updateQuantity } = syncAddToCart(setDisableSelect,false)
    const { mutate:remove } = syncDeleteCartProduct(setDisableSelect)

    const changeQuantity = (newQuantity:number,item:cartItemType) => {
        const {_id, ...cartProduct} = item
        setDisableSelect(true)
        updateQuantity({...cartProduct, quantity:newQuantity})
    }

    const removerProduct = (productId:string) => {
        setDisableSelect(true)
        remove(productId)
    }
     

     return (
        <Accordion className=" bg-white shadow-md rounded-b-md"
                   type="single"
                   defaultValue="cartItems">
            
            <AccordionItem value="cartItems">
                <AccordionTrigger className="flex items-center gap-x-4 bg-slate-800 text-white px-4 py-4 font-semibold rounded-t-md hover:no-underline hover:bg-slate-950 active:bg-slate-800">
                <p className="flex items-center gap-x-4 text-lg px-4">
                            <AiOutlineShoppingCart/>
                            Cart Items
                </p>
                </AccordionTrigger>
                <AccordionContent className="py-4">
                    <div className={`flex flex-col px-2 gap-y-2 xl:max-h-[32rem] xl:overflow-auto accordianScrollbar`}>
                    {
                        cart.map(item => (
                            <div className={`h-32 bg-white rounded-md flex-none shadow-md flex gap-x-4 p-2 relative`}
                                key={item._id}>
                                <NavLink to={`/product/${item.product}`}
                                         className={`absolute h-full w-1/4`}/>
                                    <img
                                        src={item.image} 
                                        alt="Product-image"
                                        className="w-1/4 object-contain" 
                                        />
                                <div className={`w-3/4 flex flex-col justify-between`}>
                                    <NavLink className="font-semibold line-clamp-2 leading-[1.4rem] hover:text-green-700 duration-75"
                                             to={`/product/${item.product}`}>
                                            {item.name}
                                    </NavLink>
                                    <div className={`h-1/2 flex items-start gap-x-2 xs:gap-x-4 bg-red-10 pt-1`}>
                                        <p className="text-lg font-semibold text-green-600">
                                            ₹{item.price}
                                        </p>
                                        {
                                            disableSelect
                                            ? <div className={`w-14 rounded-md h-4 mt-[0.4rem] bg-slate-300 animate-pulse flex-none`}/>
                                            : <select className="mt-1 xs:px-2 font-semibold rounded-md bg-white ring-1 ring-slate-300 shadow-sm text-green-800"
                                                      onChange={(e)=> changeQuantity(+e.target.value,item)}
                                                      defaultValue={item.quantity}>
                                                    {
                                                        Array.from({length:Math.min(item.stock,5)})
                                                        .map((_,i)=>(
                                                            <option key={i} value={i+1}>{i+1} Item{i+1!==1 && `s`}</option>
                                                        ))
                                                    }
                                                </select>
                                        }
                                        <div className={`grow flex justify-end xs:px-4`}>
                                            <button className={`mt-1 ring-1 ring-transparent text-red-700 px-1 xs:px-2 font-semibold text-sm rounded-lg flex items-center gap-x-2 active:text-red-800 ${!disableSelect &&'hover:ring-red-500'} active:bg-red-50 duration-75`}
                                                    onClick={()=>removerProduct(item.product)}disabled={disableSelect}>
                                                {
                                                    disableSelect
                                                    ? <div className={`w-14 rounded-md h-4 mt-[0.4rem] bg-slate-300 animate-pulse flex-none`}/>
                                                    :'remove'
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    {
                        (cart.length === 0) &&
                        <p className="font-semibold text-base px-4 flex items-center gap-x-2">
                            Your Cart is Empty
                            <NavLink className={`text-green-700 px-2 my-2 rounded-lg hover:text-green-600 duration-75 flex items-center gap-x-1 hover:ring-green-400 ring-1 ring-transparent hover:bg-green-50 active:bg-green-100`}
                                     to={'/home'}>
                               Shop now
                               <LuExternalLink/>
                            </NavLink>
                        </p>
                    }
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
 
export default CartItemsBox




{/* <AccordionItem value="cartSummary" className="xl:hidden">
<AccordionTrigger className="flex items-center gap-x-4 bg-slate-800 text-white px-4 py-4 font-semibold rounded-t-md hover:no-underline hover:bg-slate-950 active:bg-slate-800">
<p className="flex items-center gap-x-4 text-lg px-4">
            <MdShoppingCart className='text-xl'/>
            Summary
        </p>
</AccordionTrigger>
<AccordionContent>
    <div className={`flex flex-col mt-4 items-center`}>
        <CartSummaryCard   
            page="cart"
            totalProducts={cart.length}
            subTotal={subTotal!}
            onConfirm={onConfirm}
            isAccordian
            />
    </div>
</AccordionContent>
</AccordionItem> */}
