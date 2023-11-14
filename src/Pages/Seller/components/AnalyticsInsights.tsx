import { syncFetchInsights } from "@/Store/ServerStore/sync-Seller-Analytics"
import { MdInsights } from "react-icons/md"
import { ResponsiveContainer, LineChart, Line, CartesianGrid,
        XAxis, YAxis, Tooltip } from "recharts"
import { sectionRefProps } from "../page-SellerAnalytics"



function AnalyticsInsights(props:sectionRefProps) {
    const { revenueSectionRef } = props
    const { data } = syncFetchInsights()

    return (
        <div className={`flex flex-col gap-y-2 overflow-x-hidden relative`}
         ref={revenueSectionRef}>            
            <p className={`text-lg font-semibold py-4 flex items-center gap-x-3 px-4 bg-slate-700 text-white rounded-md`}>
               <MdInsights className={`text-xl`}/>
               Insights
            </p>
            <div className={`flex flex-col gap-y-4 py-8`}>
                <div className={`h-72 flex flex-col gap-y-4`}>
                    <p className={`px-2 py-1 bg-green-100 rounded-md self-start`}>
                        Users / month
                    </p>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                        margin={{ top: 10, left: -10, right: 20, bottom: 0 }}
                        width={500}
                        height={300}
                        data={data && data.userInsights}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" height={60}/>
                            <YAxis allowDecimals={false}/>
                            <Tooltip />
                            <Line type="monotone" dataKey="users" stroke="#16a34a" strokeWidth={2}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className={`h-72 flex flex-col gap-y-4`}>
                    <p className={`px-2 py-1 bg-green-100 rounded-md self-start`}>
                        Revenue / month
                    </p>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                        margin={{ top: 10, left: -10, right: 20, bottom: 0 }}
                        width={500}
                        height={300}
                        data={data && data.revenueInsights}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" height={60}/>
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
        </div>
    )
}
 
export default AnalyticsInsights