import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { syncChangeOrderStatus, syncFetchSellerOrder } from "@/Store/ServerStore/sync-Products"
import { days, months } from "@/Store/ClientStore/store-Constants"
import { orderStatusType } from "./page-SellerOrders"



function OrderInfo() {

  useEffect(()=>{
    window.scrollTo({ top: 0 })
  },[])

  const { id } = useParams()
  if (!id) {
      return
  }
  const [disableStatusButton, setDisableStatusButton] = useState(false)
  const { data, isLoading } = syncFetchSellerOrder(id)
  const { mutate } = syncChangeOrderStatus(setDisableStatusButton)


  const handleOrderStatusChange = (newOrderStatus:orderStatusType, id:string) => {
    setDisableStatusButton(true)
    mutate({orderId:id, orderStatus:newOrderStatus})
  }

  return (
      <div className={`mx-auto w-[98vw] xs:w-[96vw] md:w-[70vw] lg:w-[70vw] max-w-[64rem] flex flex-col rounded-2xl overflow-hidden  bg-gradient-to-br bg-white relative  border-b-2 min-h-[30rem] transition-opacity duration-300 shadow-md`}
      >  
      {
        isLoading
        ?
          <div className={`absolute w-full h-full flex justify-center items-center text-xl`}>
                <span className={`mr-4 w-4 h-4 inline-block rounded-full border-b-slate-300 border-l-white border-[0.24rem] border-slate-800 animate-spin`}/>
                loading...
          </div>
        :
        <>
          <div className="px-6 xs:px-4 py-6 bg-slate-800 border-b-0 text-xs xs:text-sm md:text-base flex items-center justify-between">
            <div className="font-semibold flex flex-col items-start xs:items-center xs:flex-row lg:gap-x-4 text-slate-300 lg:py-2">
                <p className="xs:px-4 whitespace-nowrap">
                  Order Id:
                </p>
                <p className="text-green-400">
                  {data.order._id}
                </p>
            </div>
            <div className={`xs:mr-4 shadow-md text-xs xs:text-sm`}>
              {
                disableStatusButton
                ?
                <p className={`font-semibold w-full rounded-full py-1 px-2 xs:px-4 text-center bg-slate-300 text-slate-300 animate-pulse`}>
                  delivered
                </p>
                :
                <select
                    className={`font-semibold w-full rounded-full py-1 px-2 xs:px-4 text-center bg-white text-slate-800`}
                    defaultValue={data.order.orderStatus}
                    onChange={(e)=>handleOrderStatusChange(e.target.value as orderStatusType, data.order._id)}
                    disabled={data.order.orderStatus === 'delivered'}
                    >
                    {
                        data.order.orderStatus === 'pending' &&
                        <>
                          <option value={'pending'} disabled>
                              pending
                          </option>
                          <option value={'shipped'}>shipped</option>
                          <option value={'delivered'}>delivered</option>
                        </>
                    }
                    {
                        data.order.orderStatus === 'shipped' &&
                        <>
                          <option value={'shipped'} disabled>
                              shipped
                          </option>
                          <option value={'delivered'}>delivered</option>
                        </>
                    }
                    {
                        data.order.orderStatus === 'delivered' &&
                        <option value={'delivered'} disabled>
                          delivered
                        </option>
                    }
                  </select>
              }

            </div>
          </div>
          <div className="bg-white grid grid-cols-2 sm:grid-cols-4 gap-1 xs:gap-2 sm:gap-0 relative py-2 sm:py-0">
              <div className="flex flex-col">
                  <p className="bg-slate-200 text-slate-800 md:text-base xl:text-lg font-semibold py-4 text-center rounded-t-lg sm:rounded-t-none">
                    <span className="translate-y-1 inline-block whitespace-nowrap">
                      Address
                    </span>
                  </p>
                  <div className="px-6 lg:px-8 py-4 bg-white text-slate-800 grow flex justify-center items-center flex-col gap-y-1 font-semibold rounded-b-lg sm:rounded-none">
                      <p className="text-center line-clamp-2 text-xs lg:text-sm">
                        {`${data.order.shippingInfo.address}, ${data.order.shippingInfo.city}, ${data.order.shippingInfo.state}, ${data.order.shippingInfo.country} - ${data.order.shippingInfo.pinCode}`}
                      </p>
                      <p className="text-xs xs:font-bold text-green-600 rounded-b-lg sm:rounded-none">
                          {data.order.shippingInfo.phone}
                      </p>
                  </div>
              </div>
              <div className="flex flex-col">
                  <p className="bg-slate-200 text-slate-800 md:text-base xl:text-lg font-semibold py-4 text-center rounded-t-lg sm:rounded-t-none">
                    <span className="translate-y-1 inline-block">
                      Total Items
                    </span>
                  </p>
                  <p className="flex justify-center items-center text-xl py-4 bg-white text-slate-800 grow font-semibold rounded-b-lg sm:rounded-none">
                      {data.order.orderItems.length}
                  </p>
              </div>
              <div className="flex flex-col">
                  <p className="bg-slate-200 text-slate-800 md:text-base xl:text-lg font-semibold py-4 text-center rounded-t-lg sm:rounded-t-none">
                    <span className="translate-y-1 inline-block">
                      Amount Paid
                    </span>
                  </p>
                  <p className="flex justify-center items-center py-4 bg-white text-slate-800 grow font-semibold rounded-b-lg sm:rounded-none">
                      ₹{data.order.totalPrice}
                  </p>
              </div>
              <div className="flex flex-col">
                  <p className="bg-slate-200 text-slate-800 md:text-base xl:text-lg font-semibold py-4 text-center rounded-t-lg sm:rounded-t-none">
                    <span className="translate-y-1 inline-block">
                      Ordered On
                    </span>
                  </p>
                  <div className="flex flex-col justify-center items-center py-4 bg-white text-slate-800 grow rounded-b-lg sm:rounded-none">
                      <p className="text-sm sm:text-base md:text-sm lg:text-base font-semibold">
                        {
                          (()=>{
                              const inputDate = new Date(data.order.createdAt)
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
                              const inputDate = new Date(data.order.createdAt)
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
          <div className="grid grid-cols-1 md:grid-cols-2 p-2 xs:p-3 sm:p-4 gap-2 xs:gap-3 relative bg-white">
          {
              data.order.orderItems.map((item:any) => (
                <div className={` xs:h-32 bg-white rounded-md flex-none shadow-md flex gap-x-4 p-4 pr-4 relative`}
                    key={item.image}>
                    <NavLink to={`/product/${'item.product'}`}
                              className={`absolute h-full`}/>
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
        </>
      }
      </div>
  )
}
 
export default OrderInfo