import { useEffect } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { NavLink } from "react-router-dom"
import { syncFetchUserOrders } from "@/Store/ServerStore/sync-Products"
import { days, months } from "@/Store/ClientStore/store-Constants"
import { addressSchemaType } from "./components/AddressForm"
import { cartItemType } from "./components/CartItemsBox"


type orderItemsType = {
  _id:string
  shippingInfo:addressSchemaType
  orderItems:Omit<cartItemType,"_id"|"stock">[]
  totalPrice:number
  orderStatus:"delivered" | "shipped" | "pending"
  createdAt:string
}[]


function UserOrders() {

  useEffect(()=>{
    window.scrollTo({ top: 0 })
  },[])

  const { data, isLoading, isRefetching } = syncFetchUserOrders()

  if (!data || isLoading || isRefetching) {
      return <div className="text-2xl w-screen m-auto max-w-[96rem] h-screen flex justify-center items-center bg-slate-800 text-slate-200 font-semibold">
        <div>
            <span className={`mr-4 w-4 h-4 inline-block rounded-full border-b-slate-300 border-l-white border-[0.24rem] border-slate-800 animate-spin`}/>
            loading...
        </div>
      </div>
  }
  return (
      <div className={`w-screen min-h-screen bg-slate-700 max-w-[96rem] m-auto flex justify-center items-start px-2 md:px-4 lg:px-8 xl:px-12 py-20`}>
        
        <Accordion
          type="multiple"
          className="grow bg-white"
          defaultValue={['item-0']}
          >
            {
              (data.orders as orderItemsType).map((order,i)=>(
                <AccordionItem
                  value={`item-${i}`}
                  key={order._id}
                  className="border-b-2 border-b-slate-700">
                    <AccordionTrigger className="px-4 md:px-8 py-6 hover:scale-[1.001] hover:no-underline hover:shadow-lg shadow-md bg-slate-900 hover:bg-slate-950 duration-100 border-b-0 text-xs xs:text-sm md:text-base">
                      <div className="font-semibold flex flex-col items-start xs:items-center xs:flex-row md:gap-x-4 text-slate-300 lg:py-2 w-[70%] sm:w-3/5">
                          <p className="px-2 xs:px-4">
                            {i+1}.&nbsp;&nbsp;{'Order Id:'}
                          </p>
                          <p className="text-green-400 px-2 xs:px-4 rounded-full bg-slate-900">
                            {order._id}
                          </p>
                      </div>
                      <div className="flex gap-x-4 font-semibold text-slate-300">
                          <p className="hidden sm:block">
                            Status
                          </p>
                          <p className={`rounded-full mr-4 px-2 xs:px-4 ${order.orderStatus === 'pending' && 'bg-[#dc262660] text-slate-300'} ${order.orderStatus === 'shipped' && 'bg-[#2563eb60] text-blue-50'} ${order.orderStatus === 'delivered' && 'bg-[#29e36e50] text-white'} pb-[0.1rem] md:pt-[0.1rem] shadow-md text-xs xs:text-sm`}>
                              {order.orderStatus} 
                          </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-white">
                      <div className="bg-slate-800 sm:bg-slate-200 grid grid-cols-2 sm:grid-cols-4 relative pb-6 px-2 sm:pb-0 sm:px-0">
                          <div className="flex flex-col px-2 sm:p-0">
                              <p className="bg-slate-800 text-slate-300 md:text-lg lg:text-xl font-semibold py-4 text-center">
                                <span className="translate-y-1 inline-block">
                                  Shipping Address
                                </span>
                              </p>
                              <div className="px-2 xs:px-4 lg:px-8 py-4 bg-slate-600 text-slate-300 grow flex justify-center items-center flex-col gap-y-1 font-semibold rounded-md sm:rounded-none">
                                  <p className="text-center line-clamp-2 text-xs lg:text-sm">
                                    {`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country} - ${order.shippingInfo.pinCode}`}
                                  </p>
                                  <p className="text-xs xs:font-bold text-green-400 rounded-md sm:rounded-none">
                                     {order.shippingInfo.phone}
                                  </p>
                              </div>
                          </div>
                          <div className="flex flex-col px-2 sm:p-0">
                              <p className="bg-slate-800 text-slate-300 md:text-lg lg:text-xl font-semibold py-4 text-center">
                                <span className="translate-y-1 inline-block">
                                  Total Items
                                </span>
                              </p>
                              <p className="flex justify-center items-center text-lg lg:text-xl py-3 bg-slate-600 text-slate-300 grow font-semibold rounded-md sm:rounded-none">
                                  {order.orderItems.length}
                              </p>
                          </div>
                          <div className="flex flex-col px-2 sm:p-0">
                              <p className="bg-slate-800 text-slate-300 md:text-lg lg:text-xl font-semibold py-4 text-center">
                                <span className="translate-y-1 inline-block">
                                  Amount Paid
                                </span>
                              </p>
                              <p className="flex justify-center items-center text-lg lg:text-xl py-3 bg-slate-600 text-slate-300 grow font-semibold rounded-md sm:rounded-none">
                                  ₹{order.totalPrice}
                              </p>
                          </div>
                          <div className="flex flex-col px-2 sm:p-0">
                              <p className="bg-slate-800 text-slate-300 md:text-lg lg:text-xl font-semibold py-4 text-center">
                                <span className="translate-y-1 inline-block">
                                  Ordered On
                                </span>
                              </p>
                              <div className="flex flex-col justify-center items-center py-3 bg-slate-600 text-slate-300 grow rounded-md sm:rounded-none">
                                  <p className="text-xs xs:text-base lg:text-lg font-semibold">
                                    {
                                      (()=>{
                                          const inputDate = new Date(order.createdAt)
                                          const date = inputDate.getDate()
                                          const month = months[inputDate.getMonth()]
                                          const year = inputDate.getFullYear()
                                          return `${date} ${month} ${year}` 
                                      })()
                                    }
                                  </p>
                                  <p className="text-xs lg:text-sm">
                                    {
                                      (()=>{
                                          const inputDate = new Date(order.createdAt)
                                          const day = days[inputDate.getDay()-1]
                                          const hours = inputDate.getHours()
                                          let minutes = inputDate.getMinutes().toString()
                                          minutes = +minutes === 0 ? `${minutes}0` : minutes
                                          const amORpm = hours < 12 ? 'am' : 'pm'
                                          return `${day}, ${hours}:${minutes} ${amORpm}` 
                                      })()
                                    }
                                  </p>
                              </div>
                          </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 p-2 xs:p-3 sm:p-4 gap-2 xs:gap-3 relative bg-slate-300">
                      {
                          order.orderItems.map(item => (
                            <div className={` xs:h-32 bg-white rounded-md flex-none shadow-md flex gap-x-4 p-4 pr-4 relative`}
                                key={item.image}>
                                <NavLink to={`/product/${'item.product'}`}
                                         className={`absolute h-full w-1/4`}/>
                                    <img
                                        src={item.image} 
                                        alt="Product-image"
                                        className="w-1/4 object-contain" 
                                        />
                                <div className={`w-3/4 flex flex-col justify-between`}>
                                    <NavLink className="text-sm font-semibold line-clamp-2 xs:leading-[1.4rem] hover:text-green-700 duration-75"
                                             to={`/product/${item.product}`}>
                                            {item.name}
                                    </NavLink>
                                    <div className={`h-1/2 flex items-start gap-x-8 bg-red-10 pt-2`}>
                                        <p className="text-lg font-semibold text-green-600">
                                            ₹{item.price}
                                        </p>
                                        <p className="mt-1 px-2 font-semibold rounded-md bg-white ring-1 ring-slate-300 shadow-sm text-green-800">
                                            {item.quantity} item{`${item.quantity>1?'s':''}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                          ))
                      }
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))
            }
        </Accordion>

      </div>
  )
}
 
export default UserOrders