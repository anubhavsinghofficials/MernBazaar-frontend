
import { useEffect, useState } from "react"
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {z} from 'zod'
import { FaCity, FaHouseChimney } from "react-icons/fa6"
import { TiWorld } from "react-icons/ti"
import { MdLocationPin } from "react-icons/md"
import { AiFillPhone } from "react-icons/ai"
import { BiSolidLandscape } from "react-icons/bi"
import PhoneInput from 'react-phone-input-2'
import { ImCheckmark } from "react-icons/im"
import { AddressCardPropsType } from "./AddressCard"


export type addressSchemaType = z.infer<typeof zodAddressSchema>
export const zodAddressSchema = z.object({

    address         :z.string()
                    .trim()
                    .nonempty("Area/Locality Required")
                    .max(50,"It should not exceed length 50")
                    .min(3,"It should be atleast length 3"),

    city            : z.string()
                    .trim()
                    .nonempty("City Required"),

    state           : z.string()
                    .trim()
                    .nonempty("State required")
                    .max(18,"It should not exceed length 18"),
    
    country         : z.string()
                    .trim()
                    .nonempty("Country Required"),
    
    pinCode         : z.string()
                    .trim()
                    .nonempty("Pin Code Required"),

    phone           : z.string()
                    .trim()
                    .nonempty("Phone number Required")
                    .min(10,"Enter a valid phone number")
                    .max(16,"Enter a valid phone number")
                    .refine((value) => {
                        const pattern = /^(\+|\d|-)*$/;
                        return pattern.test(value);
                      }, "Enter a valid phone number")
})

function AddressForm(props:AddressCardPropsType) {

    const { setShippingInfo, shippingInfo, isNewAddress, setIsNewAddress } = props
    const [disableSubmit, setDisableSubmit] = useState(false)
    const [openForm, setOpenForm] = useState(false)

    useEffect(()=>{
        if (!openForm) {
            setOpenForm(true)
        }
    },[])

    const form = useForm<addressSchemaType>({
        defaultValues: isNewAddress ? shippingInfo : {},
        mode:"onSubmit",
        resolver:zodResolver(zodAddressSchema)
    })
    const { register, formState, handleSubmit, control } = form
    const { errors } = formState
     
    const handleFocus = (e:React.FocusEvent) => {
        if (e.target.tagName === 'INPUT') {
            setDisableSubmit(false)
            setIsNewAddress(false)
        }
    }
     
    const onSubmit = ( data:addressSchemaType ) => {
        setDisableSubmit(true)
        setShippingInfo(data)
        setIsNewAddress(true)
    }

    return (
        <form className="px-4 pt-4 flex flex-col grow items-center gap-y-1 rounded-t-3xl rounded-b-xl"
        onSubmit={handleSubmit(onSubmit)}
        onFocus={handleFocus}
        noValidate>

            <div className={`text-slate-800 font-semibold bg-slate-200 flex items-center w-full p-2 rounded-md ring-[0.1rem] ${errors.address ? "ring-red-400" :"focus-within:ring-slate-700 ring-transparent"}`}>
                <label htmlFor="address"
                    className=" mr-2 self-stretch flex items-center px-2 text-xl">
                        <FaHouseChimney className='text-slate-700 text-2xl'/>
                </label>
                <input className={`px-1 grow py-1 outline-none bg-transparent rounded-full min-w-0 styledPlaceholder`}  
                    type="text"
                    id="address"
                    {...register("address")}
                    placeholder="Area/Locality/House"
                    autoComplete="off"/>
            </div>
            <p className="text-red-600 font-normal bottom-[0.2rem] self-start left-10 relative">
                    {errors.address?.message}
            </p>
            <div className={`text-slate-800 font-semibold bg-slate-200 flex items-center w-full p-2  rounded-md ring-[0.1rem] ${errors.city ? "ring-red-400" :"focus-within:ring-slate-700 ring-transparent"}`}>
                <label htmlFor="city"
                    className=" mr-2 self-stretch flex items-center px-2 text-xl">
                        <FaCity className='text-slate-700 text-2xl'/>
                </label>
                <input className={`px-1 grow py-1 outline-none bg-transparent rounded-full min-w-0 styledPlaceholder`}  
                    type="text"
                    id="city"
                    {...register("city")}
                    placeholder="City"
                    autoComplete="off"/>
            </div>
            <p className="text-red-600 font-normal bottom-[0.2rem] self-start left-10 relative">
                    {errors.city?.message}
            </p>
            <div className={`text-slate-800 font-semibold bg-slate-200 flex items-center w-full p-2  rounded-md ring-[0.1rem] ${errors.state ? "ring-red-400" :"focus-within:ring-slate-700 ring-transparent"}`}>
                <label htmlFor="state"
                    className=" mr-2 self-stretch flex items-center px-2 text-xl">
                        <BiSolidLandscape className='text-slate-700 text-2xl'/>
                </label>
                <input className={`px-1 grow py-1 outline-none bg-transparent rounded-full min-w-0 styledPlaceholder`}  
                    type="text"
                    id="state"
                    {...register("state")}
                    placeholder="State"
                    autoComplete="off"/>
            </div>
            <p className="text-red-600 font-normal bottom-[0.2rem] self-start left-10 relative">
                    {errors.state?.message}
            </p>
            <div className={`text-slate-800 font-semibold bg-slate-200 flex items-center w-full p-2  rounded-md ring-[0.1rem] ${errors.country ? "ring-red-400" :"focus-within:ring-slate-700 ring-transparent"}`}>
                <label htmlFor="country"
                    className=" mr-2 self-stretch flex items-center px-2 text-xl">
                        <TiWorld className='text-slate-700 text-2xl'/>
                </label>
                <input className={`px-1 grow py-1 outline-none bg-transparent rounded-full min-w-0 styledPlaceholder`}  
                    type="text"
                    id="country"
                    {...register("country")}
                    placeholder="Country"
                    autoComplete="off"/>
            </div>
            <p className="text-red-600 font-normal bottom-[0.2rem] self-start left-10 relative">
                    {errors.country?.message}
            </p>
            <div className={`text-slate-800 font-semibold bg-slate-200 flex items-center w-full p-2  rounded-md ring-[0.1rem] ${errors.pinCode ? "ring-red-400" :"focus-within:ring-slate-700 ring-transparent"}`}>
                <label htmlFor="pinCode"
                    className=" mr-2 self-stretch flex items-center px-2 text-xl">
                        <MdLocationPin className='text-slate-700 text-2xl'/>
                </label>
                <input className={`px-1 grow py-1 outline-none bg-transparent rounded-full min-w-0 styledPlaceholder`}  
                    type="text"
                    id="pinCode"
                    {...register("pinCode")}
                    placeholder="Pin Code"
                    autoComplete="off"/>
            </div>
            <p className="text-red-600 font-normal bottom-[0.2rem] self-start left-10 relative">
                    {errors.pinCode?.message}
            </p>
            
            <div className={`flex w-full px-2 rounded-md text-slate-800 font-semibold bg-slate-200 items-center ring-[0.1rem] ${errors.phone ? "ring-red-400" :"focus-within:ring-slate-700 ring-transparent"}`}>
                <label htmlFor="phone"
                    className=" mr-2 self-stretch flex items-center px-2 text-xl">
                    <AiFillPhone
                    className='text-slate-700 text-2xl rotate-90'/>
                </label>
                <Controller
                    control={control}
                    name="phone"
                    render={({ 
                        field: { onChange, value, name}
                    }) => (
                        <PhoneInput
                            country={'in'}
                            value={value}
                            onChange={(phone: string, country: any)=>{
                                const reducedPhone = phone.replace(country.dialCode,'')
                                onChange('+' + country.dialCode + '-' + reducedPhone)
                            }}
                            inputProps={{ name }}
                            inputClass="h-full bg-black w-10"
                            inputStyle={{
                                width: '100%',
                                height: '2.7rem',
                                backgroundColor:'#e2e8f0',
                                border: 'none',
                                paddingLeft: '3.4rem'
                            }}
                            buttonClass="h-[80%] my-1"
                            buttonStyle={{
                                backgroundColor:'white',
                                borderRadius: '0.3rem'
                            }}
                            dropdownClass="h-40"
                            placeholder="Phone Number"
                            countryCodeEditable={false}
                            />
                    )}
                />
            </div>

            <p className="text-red-600 font-normal bottom-[0.2rem] self-start left-10 relative">
                    {errors.phone?.message}
            </p>

            <button type="submit"
                    className={`w-32 h-8 mt-2 rounded-md font-bold bg-gray-700 text-slate-200 self-end flex justify-center items-center gap-x-4 ${disableSubmit || isNewAddress ? 'bg-green-600': 'hover:bg-gray-600'}`}
                    disabled={disableSubmit}>
                        {   
                            disableSubmit || isNewAddress
                            ? <ImCheckmark className='text-2xl'/>
                            : 'Add Address'
                        }
            </button>
        </form>

    )
}
 
export default AddressForm


// required: true,
{/* <div className={`text-slate-800 font-semibold bg-slate-200 flex items-center w-full p-2  rounded-md ring-[0.1rem] ${errors.phone ? "ring-red-400" :"focus-within:ring-slate-700 ring-transparent"}`}>
<label htmlFor="phone"
    className=" mr-2 self-stretch flex items-center px-2 text-xl">
        <AiFillPhone
        className='text-slate-700 text-2xl rotate-90'/>
</label>
<input className={`px-1 grow py-1 outline-none bg-transparent rounded-full min-w-0 styledPlaceholder`}  
    type="text"
    id="phone"
    {...register("phone")}
    placeholder="Phone Number"
    autoComplete="off"/>
</div> */}


{/* <span className={`w-4 h-4 rounded-full border-b-slate-100 border-l-slate-100 border-[0.2rem] border-slate-900 animate-spin ${disableSubmit ? 'inline' : 'hidden'}`}/> */}
