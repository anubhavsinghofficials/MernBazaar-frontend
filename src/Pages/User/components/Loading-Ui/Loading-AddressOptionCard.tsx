

const shippingInfo = {
    address: '593, Sector 12, RK Puram',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    pinCode: '110023',
    phoneNo: '9984320523'
}

function AddressOptionCardLoading() {

    return (
        <div className={`relative bg-white overflow-hidden rounded-md`}>
            <div className="p-4 rounded-md">
                <p className="whitespace-nowrap overflow-hidden text-ellipsis font-semibold text-slate-300 bg-slate-300 animate-pulse">
                    #
                </p>
                <p className="text-slate-300 font-semibold bg-slate-300 w-2/5 mt-1 leading-3 animate-pulse">
                    #
                </p>
                <p className="mt-4 text-slate-300 bg-slate-300 w-1/3 animate-pulse">
                    #
                </p>
            </div>
        </div>
    )
}
 
export default AddressOptionCardLoading