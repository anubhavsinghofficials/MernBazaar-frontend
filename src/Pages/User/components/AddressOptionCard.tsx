
import { Country, State } from 'country-state-city'
type AddressCardOptionType = {
     shippingInfo: {
        address : string,
        city    : string,
        state   : string,
        country : string,
        pinCode : string,
        phone   : string
     }
}

function AddressOptionCard(props:AddressCardOptionType) {
    const { shippingInfo } = props
    const state = State.getStateByCodeAndCountry(shippingInfo.state,shippingInfo.country)
    const country = Country.getCountryByCode(shippingInfo.country)

    return (
        <div className={`relative bg-white overflow-hidden rounded-md `}>
            <div className="p-4 rounded-md">
                <p className="line-clamp-1 font-semibold text-slate-800 ">
                    {`${shippingInfo.address}, ${shippingInfo.city}`}
                </p>
                <p className="text-green-700 font-semibold">
                    {country?.flag} &nbsp; {`${state?.name}, ${country?.name} (${shippingInfo.pinCode})`}
                </p>
                <p className="pt-2 text-slate-800">
                    Ph: {shippingInfo.phone}
                </p>
            </div>
        </div>
    )
}
 
export default AddressOptionCard
