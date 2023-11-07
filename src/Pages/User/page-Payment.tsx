
import goldChip from '@/assets/goldChip.png'
import { SERVER_URL } from '@/Store/ClientStore/store-Constants'
import { modalStore } from '@/Store/ClientStore/store-Modals'
import { paymentStore } from '@/Store/ClientStore/store-Payment'
import { syncFetchUserDetails } from '@/Store/ServerStore/sync-User'
import {CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements} from '@stripe/react-stripe-js'
import { useQueryClient } from '@tanstack/react-query'

import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { BiBarcodeReader } from 'react-icons/bi'
import { BsFillCalendarDateFill, BsFillCreditCard2BackFill, BsStripe } from 'react-icons/bs'
import {useNavigate} from 'react-router-dom'


function PaymentPage() {

    useEffect(()=>{
        window.scrollTo({ top: 0 })
        setFadeOut(false)
        if (totalPrice <= 0 || !shippingInfo.address) {
            Navigate('/user/cart')
        }
    },[])

    const queryClient = useQueryClient()
    const [fadeOut, setFadeOut] = useState(true)
    const Navigate = useNavigate()
    const [disableSubmit, setDisableSubmit] = useState(false)
    const { paymentDetails, setPaymentDetails } = paymentStore()
    const { totalPrice, shippingInfo, orderItems, isNewAddress } = paymentDetails
    const stripe = useStripe()
    const elements = useElements()
    const { data, isLoading, isRefetching } = syncFetchUserDetails()
    const { setGenericMessage, toggleGenericModal } = modalStore()
    const { setGenericToastMessage, toggleGenericToast, setGenericToastType } = modalStore()

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setDisableSubmit(true)

        try {
            const {data:{client_secret}} = await axios.post(
                `${SERVER_URL}/payment/process`,{
                    amount:Math.round(totalPrice*100)
                },{
                    withCredentials:true,
                    headers:{
                        'Content-Type':'application/json'
                    }
                })

            if (!stripe || !elements) {
                return
            }
            const result = await stripe.confirmCardPayment(
                client_secret,
                {
                    payment_method:{
                        card:elements.getElement(CardNumberElement)!,
                        billing_details:{
                            name: data.name,
                            email: data.email,
                            address:{
                                line1:shippingInfo.address,
                                city:shippingInfo.city,
                                state:shippingInfo.state,
                                postal_code:shippingInfo.pinCode,
                                country:shippingInfo.country
                            }
                        }                    
                }
            })

            if (result.error) {
                if (result.error.message) {
                    setGenericMessage(result.error.message)
                    toggleGenericModal()
                    setDisableSubmit(false)
                }
            }
            else {
                if (result.paymentIntent.status === "succeeded") {
                    const order = {
                        shippingInfo,
                        isNewAddress,
                        orderItems,
                        totalPrice,
                        paymentInfo: {
                            id:result.paymentIntent.id,
                            status:result.paymentIntent.status,
                        }
                    }

                    const resp = await axios.post(`${SERVER_URL}/order/new`,
                        order,
                        {
                            withCredentials:true,
                            headers:{
                                'Content-Type':'application/json'
                            }
                        })

                        if (resp.status===201) {
                            setDisableSubmit(false)
                            Navigate("/user/orders")
                            setPaymentDetails({
                                totalPrice : 0,
                                orderItems : [],
                                isNewAddress : false,
                                shippingInfo : {
                                    address:'',
                                    city:'',
                                    state:'',
                                    country:'',
                                    pinCode:'',
                                    phone:''
                                },
                            })
                            queryClient.invalidateQueries(['userDetails'])
                            setTimeout(() => {
                                setGenericToastMessage("Purchase successfull!!")
                                setGenericToastType('success')
                                toggleGenericToast(true)    
                            }, 1000);
                        }
                        else{
                            setGenericMessage("Couldn't store your order!!, try again later")
                            toggleGenericModal()
                            setDisableSubmit(false)
                            Navigate("/user/cart")
                        }
                }
                else{
                    setGenericMessage("An error occured, try again later")
                    toggleGenericModal()
                    setDisableSubmit(false)
                    Navigate("/user/cart")
                }
            }

        } catch (error) {
            const errorData = error as AxiosError<{error:string}>
            if (errorData.response) {
                setGenericMessage(errorData.response.data.error)
                toggleGenericModal()
            }
            setDisableSubmit(false)
        }
    }
 
    return (
    <div className={`w-screen min-h-screen flex justify-center items-center bg-slate-900 p-2 xs:p-4 relative`}
    >
        <div className={`w-[90vw] h-[80vh] bg-gradient-to-br from-slate-700 to-slate-900 absolute rounded-3xl opacity-20 mt-8`}/>
           
        <form className={`w-[max(80%,20rem)] xs:w-[28rem] p-6 xs:p-8 flex flex-col items-center text-black rounded-xl relative bg-[url('@/assets/cardBg.jpeg')] bg-cover bg-center shadow-lg shadow-black scale-90 xs:scale-100 duration-500 ${fadeOut ? 'opacity-0':'opacity-100'}`}
            onSubmit={handleSubmit}>
            
            <div className='absolute -top-12 left-4 font-semibold text-slate-400 flex flex-col text-sm'>
                <p>
                    test: 4242 4242 4242 4242,
                </p>
                <p>
                    <span className='pr-12'>
                        cvv: 312,
                    </span>
                    exp: 12/24
                </p>
            </div>

            <div className='font-bold text-xl xs:text-2xl text-violet-50 w-full line-clamp-1 rounded-md bg-opacity-50 backdrop-blur-md flex justify-end items-end'>
                MernBazaar
            </div>

            <div className={`w-full pb-2 xs:pb-4`}>
                <img
                src={goldChip}
                alt=""
                className='w-10 xs:w-14 aspect-[4/3] object-contain '/>
            </div>

            <div className={`w-full flex flex-col gap-y-2 xs:gap-y-4 text-slate-600`}>
                <div className={`w-full bg-violet-100 px-4 py-2 xs:py-3 flex items-center gap-x-4 rounded-md backdrop-blur-md bg-opacity-80`}> 
                    <BsFillCreditCard2BackFill/>
                    <CardNumberElement className='grow xs:scale-125 origin-left'/>
                </div>

                <div className={`flex justify-between gap-x-4 xs:gap-x-28`}>
                    <div className={`bg-violet-100 px-4 py-2 xs:py-3 flex items-center gap-x-4 rounded-md grow backdrop-blur-md bg-opacity-80`}> 
                        <BiBarcodeReader/>
                        <CardCvcElement className='grow xs:scale-125 origin-left'/>
                    </div>
                    <div className={`bg-violet-100 px-4 py-2 xs:py-3 flex items-center gap-x-4 rounded-md grow-[2] backdrop-blur-md bg-opacity-80`}> 
                        <BsFillCalendarDateFill/>
                        <CardExpiryElement className='grow xs:scale-125 origin-left'/>
                    </div>
                </div>
            </div>

            <button className={`text-white duration-100 font-bold py-2 text-lg flex justify-center items-center gap-x-2 rounded-md absolute -bottom-16 px-8 ring-1 bg-slate-700 ring-slate-500 hover:bg-violet-800 hover:ring-transparent hover:shadow-md active:bg-violet-600 ${disableSubmit && 'opacity-40'}`}
            disabled={isLoading||isRefetching || disableSubmit}>
                {
                    (isLoading || isRefetching || disableSubmit)
                    ?
                    <span className={`w-4 h-4 rounded-full border-b-slate-200 border-l-white border-[0.24rem] border-slate-800 animate-spin mr-5`}/>
                    :
                    <BsStripe className='mr-4'/>
                }
                <p>
                    Pay
                </p>
                {`₹${totalPrice}`}
            </button>
        </form>
    </div>
)
}

export default PaymentPage