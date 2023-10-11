


function ReviewCardLoading() {
    return (
             <div className={`rounded-xl bg-slate-100 shadow-md h-[7.7rem] flex flex-col gap-y-2 p-4`}>
                <div className="grow flex gap-x-4">
                    <div className="w-12 h-full bg-slate-300 rounded-md animate-pulse"/>
                    <div className="w-28 h-full bg-slate-300 animate-pulse"/>
                </div>
                <div className="grow-[2] bg-slate-300 rounded-md animate-pulse"/>
             </div>
    )
}
 
export default ReviewCardLoading