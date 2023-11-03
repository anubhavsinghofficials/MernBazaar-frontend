
import { AiFillShop, AiFillStar } from 'react-icons/ai'
import { FaKey, FaPlus, FaPowerOff, FaUserAlt, FaUsers } from 'react-icons/fa'
import { RxBorderWidth } from 'react-icons/rx'
import { RiDashboardFill } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { modalStore } from '@/Store/ClientStore/store-Modals'
import { useState } from 'react'
import { syncLogOutSeller } from '@/Store/ServerStore/sync-Seller'
import { BiSolidGift } from 'react-icons/bi'


function DashboardSideMenu() {
    const { setGenericSubtitle,setGenericTitle, setGenericFunction, toggleGenericConfirmModal } = modalStore()
    const [_Editable, setEditable] = useState(false)
    const { mutate:logOutSeller } = syncLogOutSeller(setEditable)

    const logOut = () => {
        setGenericTitle("Confirm to Logout from this device")
        setGenericSubtitle("you will have to login again to access your data")
        setGenericFunction(logOutSeller)
        toggleGenericConfirmModal()
     }
     
    return (
        <div className={`bg-white h-[38rem] self-start md:w-60 lg:w-80 sticky top-20 mb-4 rounded-md overflow-hidden hidden md:flex flex-col shadow-md`}>
            <h1 className={`bg-slate-700 text-slate-200 text-xl p-4 font-semibold flex items-center gap-x-3`}>
                <RiDashboardFill/>
                DashBoard
            </h1>
            <div className={`bg-white grow p-4 text-slate-800`}
            >
                <p className='font-semibold py-2'>
                    Store
                </p>
                <div className={`flex flex-col`}>
                    <NavLink to={'/seller/analytics'}
                        className={({isActive})=> (
                        isActive
                        ? `p-2 px-4 bg-slate-600 text-white rounded-md flex items-center gap-x-4`
                        : `p-2 px-4 rounded-md flex items-center gap-x-4 hover:bg-slate-200 duration-75`
                        )}>
                        <AiFillStar/>
                        Analytics
                    </NavLink>
                    <NavLink to={'/seller/orders'}
                            className={({isActive})=> (
                            isActive
                            ? `p-2 px-4 bg-slate-600 text-white rounded-md flex items-center gap-x-4`
                            : `p-2 px-4 rounded-md flex items-center gap-x-4 hover:bg-slate-200 duration-75`
                            )}>
                        <RxBorderWidth/>
                        Orders
                    </NavLink>
                    <NavLink to={'/seller/users'}
                            className={({isActive})=> (
                            isActive
                            ? `p-2 px-4 bg-slate-600 text-white rounded-md flex items-center gap-x-4`
                            : `p-2 px-4 rounded-md flex items-center gap-x-4 hover:bg-slate-200 duration-75`
                            )}>
                            <FaUsers/>
                            Users
                    </NavLink>
                </div>
                <p className='font-semibold py-2'>
                    Products
                </p>
                <div className={`flex flex-col whitespace-nowrap`}>
                    <NavLink to={'/seller/products'}
                            className={({isActive})=> (
                            isActive
                            ? `p-2 px-4 bg-slate-600 text-white rounded-md flex items-center gap-x-4`
                            : `p-2 px-4 rounded-md flex items-center gap-x-4 hover:bg-slate-200 duration-75`
                            )}>
                        <AiFillShop/>
                        My Products
                    </NavLink>
                    <NavLink to={'/seller/product/new'}
                            className={({isActive})=> (
                            isActive
                            ? `p-2 px-4 bg-slate-600 text-white rounded-md flex items-center gap-x-4`
                            : `p-2 px-4 rounded-md flex items-center gap-x-4 hover:bg-slate-200 duration-75`
                            )}>
                        <FaPlus/>
                        Create Product
                    </NavLink>
                    <NavLink to={'/seller/coupons'}
                            className={({isActive})=> (
                            isActive
                            ? `p-2 px-4 bg-slate-600 text-white rounded-md flex items-center gap-x-4`
                            : `p-2 px-4 rounded-md flex items-center gap-x-4 hover:bg-slate-200 duration-75`
                            )}>
                        <BiSolidGift/>
                        Coupons
                    </NavLink>
                </div>
                <p className='font-semibold py-2'>
                    Account
                </p>
                <div className={`flex flex-col whitespace-nowrap`}>
                    <NavLink to={'/seller/profile'}
                            className={({isActive})=> (
                            isActive
                            ? `p-2 px-4 bg-slate-600 text-white rounded-md flex items-center gap-x-4`
                            : `p-2 px-4 rounded-md flex items-center gap-x-4 hover:bg-slate-200 duration-75 `
                            )}>
                        <FaUserAlt className={`text-sm`}/>
                        My Profile
                    </NavLink>
                    <NavLink to={'/seller/password'}
                            className={({isActive})=> (
                            isActive
                            ? `p-2 px-4 bg-slate-600 text-white rounded-md flex items-center gap-x-4`
                            : `p-2 px-4 rounded-md flex items-center gap-x-4 hover:bg-slate-200 duration-75`
                            )}>
                        <FaKey className={`text-sm`}/>
                        Change Password
                    </NavLink>
                    <button className={`p-2 px-4 text-red-800 font-semibold hover:bg-red-700 active:bg-red-800 hover:text-slate-100 duration-75 rounded-md flex items-center gap-x-4`}
                    onClick={logOut}>
                        <FaPowerOff className={`text-sm`}/>
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    )
}
 
export default DashboardSideMenu



// all product & filters
// product create
// product update