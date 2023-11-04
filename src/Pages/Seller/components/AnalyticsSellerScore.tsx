import { AiFillStar } from "react-icons/ai"
import { BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from "recharts"



function AnalyticsSellerScore() {
    const ratings = getSellerData()
    return (
        <div className={`flex flex-col gap-y-4 xs:gap-y-8`}
         >            
            <p className={`text-lg font-semibold py-4 flex items-center gap-x-3 px-4 bg-slate-700 text-white rounded-md`}>
               <AiFillStar className={`text-xl`}/>
               Seller
            </p>
            <div className={`flex flex-col xs:flex-row pr-4 gap-y-4 gap-x-2`}>
                <div className={`shadow-md flex-none xs:w-52 sm:w-60 md:w-48 lg:w-72 p-4 flex flex-col`}>
                    <p className={`text-lg font-semibold flex items-center gap-x-2 px-4 py-1 rounded-md bg-green-100 text-green-700`}>
                        <AiFillStar className={`text-xl`}/>
                        <p className={`whitespace-nowrap`}>
                            Seller Score
                        </p>
                    </p>
                    <p className={`text-4xl py-4 text-center font-bold text-green-600`}>
                        4/5
                    </p>
                    <p className={`text-center text-sm grow flex flex-col justify-end`}>
                        Your seller score is the avarage of all the ratings of your products
                    </p>
                    
                </div>
                <ResponsiveContainer width='100%' height={200}
                >
                    <BarChart
                        margin={{ top: 10, left: -20, right: 0, bottom: 0 }}
                        data={ratings}
                        layout="vertical"
                        >
                        <XAxis type="number" dataKey="users" />
                        <YAxis type="category" dataKey="rating" />
                        <Tooltip />
                        <Bar dataKey="users" fill="#4ade80" />
                    </BarChart>         
                </ResponsiveContainer>
            </div>
        </div>
    )
}
 
export default AnalyticsSellerScore







function getSellerData () {
    const ratings = [
        { "rating": "★1", "users": 30 },
        { "rating": "★2", "users": 180 },
        { "rating": "★3", "users": 240 },
        { "rating": "★4", "users": 130 },
        { "rating": "★5", "users": 80 },
     ]
    return ratings 
 }