import { MdInsights } from "react-icons/md"
import { ResponsiveContainer, LineChart, Line, CartesianGrid,
        XAxis, YAxis, Tooltip, Legend } from "recharts"



function AnalyticsInsights() {
    const { usersGraph, revenueGraph } = getInsights()


    return (
        <div className={`flex flex-col gap-y-2 overflow-x-hidden relative`}
         >            
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
                        data={usersGraph}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" height={60}/>
                            <YAxis />
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
                        data={revenueGraph}
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




function getInsights() {
    const usersGraph = [
        {month:'Jan', users:84},
        {month:'Feb', users:484},
        {month:'Mar', users:2384},
        {month:'Apr', users:1344},
        {month:'May', users:2384},
        {month:'June', users:3364},
        {month:'July', users:4384},
        {month:'Aug', users:884},
        {month:'Sept', users:10},
        {month:'Oct', users:4384},
        {month:'Nov', users:384},
        {month:'Dec', users:4384},
    ]
    const revenueGraph = [
        {month:'Jan', revenue:184},
        {month:'Feb', revenue:84},
        {month:'Mar', revenue:23084},
        {month:'Apr', revenue:13414},
        {month:'May', revenue:2384},
        {month:'June', revenue:33464},
        {month:'July', revenue:43834},
        {month:'Aug', revenue:884},
        {month:'Sept', revenue:10000},
        {month:'Oct', revenue:4384},
        {month:'Nov', revenue:3874},
        {month:'Dec', revenue:43834},
    ]

    return ({usersGraph, revenueGraph})
}
