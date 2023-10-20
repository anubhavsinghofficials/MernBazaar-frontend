import { useState } from "react"
import { AiFillDelete } from "react-icons/ai"
import { MdEdit } from "react-icons/md"

type AddressArrayType = {
     shippingInfo: {
        address : string,
        city    : string,
        state   : string,
        country : string,
        pinCode : string,
        phoneNo : string
     }
}

function AddressOptionCard(props:AddressArrayType) {
    const { shippingInfo } = props

    return (
        <div className={`relative bg-white overflow-hidden rounded-md`}>
            <div className="p-4 rounded-md">
                <p className="whitespace-nowrap overflow-hidden text-ellipsis font-semibold text-slate-800">
                    {`${shippingInfo.address}, ${shippingInfo.city}`}
                </p>
                <p className="text-green-700 font-semibold">
                    {`${shippingInfo.state}, ${shippingInfo.country} (${shippingInfo.pinCode})`}
                </p>
                <p className="pt-2 text-slate-800">
                    Ph: {shippingInfo.phoneNo}
                </p>
            </div>
        </div>
    )
}
 
export default AddressOptionCard




// type ButtonClickType = React.MouseEvent<HTMLButtonElement>
// const [disableDelete, setDisableDelete] = useState(false)
// const deleteAddress = (e:ButtonClickType) => {
//     e.stopPropagation()
//     // i used setTimeOut because for some reason
//     // when state chages, it somehow triggers onclick
//     // of the outside parent, ie, <input> of the
//     // AddressCard.tsx
//     setTimeout(() => {
//         setDisableDelete(true)
//     }, 10);
//     console.log('delete',shippingInfo)
// }

// const editAddress = (e:ButtonClickType) => {
//     e.stopPropagation()
// }

// <div className={`flex justify-around text-lg absolute bottom-3 right-3 text-slate-500 h-8 w-14`}>
// <button className="hover:text-green-800 hover:bg-green-100 active:text-slate-900 p-1 rounded-md duration-75"
//         onClick={editAddress}>
//     <MdEdit/>
// </button>
// <button className={`${!disableDelete && 'hover:text-red-800 hover:bg-red-100 active:text-slate-900'} p-1 rounded-md duration-75 group`}
//         onClick={deleteAddress}
//         disabled={disableDelete}>
//     {
//      disableDelete
//      ? <span className={`h-[0.9rem] aspect-square animate-spin rounded-full border-[0.2rem] border-slate-800 border-b-white border-l-white inline-block mr-1`}
//          />
//      : <AiFillDelete/>
//     }
// </button>
// </div>