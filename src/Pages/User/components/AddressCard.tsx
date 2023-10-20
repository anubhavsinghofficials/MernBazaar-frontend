
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import AddressOptionCard from "./AddressOptionCard"
import AddressForm from "./AddressForm";
import { useState } from "react";
import { syncFetchUserShippingInfo } from "@/Store/ServerStore/sync-User";
import AddressOptionCardLoading from "./Loading-Ui/Loading-AddressOptionCard";
import { AddressType } from "../page-UserCart";


export type AddressCardPropsType = {
    setShippingInfo: React.Dispatch<React.SetStateAction<AddressType | undefined>>
    shippingInfo:AddressType | undefined
    isNewAddress:boolean
    setIsNewAddress: React.Dispatch<React.SetStateAction<boolean>>
}

function AddressCard(props:AddressCardPropsType) {
    const { setShippingInfo, shippingInfo, isNewAddress, setIsNewAddress } = props
    const [formOpen, setFormOpen] = useState(false)
    const { data, isLoading, isRefetching } = syncFetchUserShippingInfo()

    const handleFormToggle = () => {
    // this func controls the 'overflow-hidden', because
    // we need 'overflow-visible' for phone dropdown but
    // gotta remove it for accordian well functioning
        if (formOpen) {
            setFormOpen(false)
        } else {
            setTimeout(() => {
                setFormOpen(true)
            }, 1000);
        }
    }
     
    const selectAddress = (address:AddressType) => {
        setShippingInfo(address)
        setIsNewAddress(false)
    }

    return (
        <div className={`bg-white w-96 rounded-b-md`}>
           <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="hover:no-underline bg-slate-700 text-white px-4 font-semibold rounded-t-md">
                        Choose a Shipping address
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className={`flex flex-col px-4 py-2 pt-4 gap-y-2 overflow-y-auto max-h-96 accordianScrollbar`}>
                        {
                            (isLoading || isRefetching)
                            ? <AddressOptionCardLoading/>
                            : data.map((address:any,i:number) => {
                        
                        const selected = address.address === shippingInfo?.address    
                        return  <label key={i}>
                                    <input
                                        type="radio"
                                        name="addressOption"
                                        className="peer hidden"
                                        defaultChecked={selected}
                                        onChange={()=>selectAddress(address)}
                                    />
                                    <div className="peer-checked:ring-2 ring-green-600 rounded-md duration-100 relative peer-checked:[&>*]:bg-green-50 peer-hover:[&>*]:bg-green-50">
                                        <AddressOptionCard shippingInfo={address}/>
                                    </div>
                                </label>
                            })
                        }
                        {
                            (!isLoading && !isRefetching && data.length === 0) &&
                            <p className="font-semibold text-base">
                                No Address found
                            </p>
                        }
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="hover:no-underline bg-slate-700 text-white px-4 font-semibold"
                    onClick={handleFormToggle}>
                        Add a new Address
                    </AccordionTrigger>
                    <AccordionContent className={`${formOpen?'overflow-visible':''} data-[state=closed]:overflow-hidden`}>
                        <AddressForm
                            setShippingInfo={setShippingInfo}
                            shippingInfo={shippingInfo}
                            isNewAddress={isNewAddress}
                            setIsNewAddress={setIsNewAddress}/>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            
        </div>
    )
}
 
export default AddressCard