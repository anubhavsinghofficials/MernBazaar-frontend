
import { RiDashboardFill } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'


function DashboardSideMenu() {
    return (
        <div className={`bg-white h-[38rem] self-start md:w-64 lg:w-80 sticky top-20 mb-4 rounded-md overflow-hidden hidden md:flex flex-col shadow-md`}>
            <h1 className={`bg-slate-700 text-slate-200 text-xl p-4 font-semibold flex items-center gap-x-2`}>
                <RiDashboardFill/>
                DashBoard
            </h1>
            <div className={`bg-white grow p-4`}
            >
                <p className='font-semibold py-2'>
                    Products
                </p>
                <div className={`flex flex-col`}>
                    <NavLink to={'/seller/profile'}
                            className={({isActive})=> (
                            isActive
                            ? `p-2 px-4 bg-slate-600 text-white rounded-md`
                            : `p-2 px-4 rounded-md`
                            )}>
                        My Profile
                    </NavLink>
                    <NavLink to={'/seller/password'}
                            className={({isActive})=> (
                            isActive
                            ? `p-2 px-4 bg-slate-600 text-white rounded-md`
                            : `p-2 px-4 rounded-md`
                            )}>
                        Change Password
                    </NavLink>
                </div>
                <p className='font-semibold py-2'>
                    Account
                </p>
                <div className={`flex flex-col`}>
                    <NavLink to={'/seller/profile'}
                            className={({isActive})=> (
                            isActive
                            ? `p-2 px-4 bg-slate-600 text-white rounded-md`
                            : `p-2 px-4 rounded-md`
                            )}>
                        My Profile
                    </NavLink>
                    <NavLink to={'/seller/password'}
                            className={({isActive})=> (
                            isActive
                            ? `p-2 px-4 bg-slate-600 text-white rounded-md`
                            : `p-2 px-4 rounded-md`
                            )}>
                        Change Password
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
 
export default DashboardSideMenu



// all product & filters
// product create
// product update