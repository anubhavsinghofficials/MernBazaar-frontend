
import { addressSchemaType } from '@/Pages/User/components/AddressForm'
import { cartItemType } from '@/Pages/User/components/CartItemsBox'
import { create } from 'zustand'


type paymentDetailsType = {
    totalPrice:number
    orderItems:Omit<cartItemType,"_id"|"stock">[],
    isNewAddress:boolean
    shippingInfo:addressSchemaType
}
type paymentStoreType = {
    paymentDetails:paymentDetailsType,
    setPaymentDetails: (paymentDetails:paymentDetailsType) => void
}


export const paymentStore = create<paymentStoreType>((set,_get)=>({
    paymentDetails:{
        totalPrice:0,
        orderItems:[],
        isNewAddress:false,
        shippingInfo:{
            address:'',
            city:'',
            state:'',
            country:'',
            pinCode:'',
            phone:''
        }
    },
    setPaymentDetails: (paymentDetails) => set(()=>({paymentDetails})),
}))