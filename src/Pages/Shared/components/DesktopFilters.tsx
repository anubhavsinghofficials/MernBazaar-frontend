import { categoryBadges, defaultValues, discountBadges, priceRange, ratingBadges } from "../../../Store/ClientStore/store-Constants"
import { filterStore } from "../../../Store/ClientStore/store-Filters"
import BadgePicker from "../../../components/BadgePicker"
import RangeSlider from "../../../components/RangeSlider"

 

function DesktopFilters() {

    const { setSearchObject, searchObject,
            setResetBadgeToken, setResetPages } = filterStore()

    const handleCategory = (categories:string[]) => {
        setResetBadgeToken()
        setSearchObject({...defaultValues, category:categories[0]})
        setResetPages()
    }
    const handleRatings = (ratings:string[]) => {
        setSearchObject({...searchObject, ratings:ratings[0]})
        setResetPages()
    }
    const handleDiscounts = (discounts:string[]) => {
        setSearchObject({...searchObject, discount:discounts[0]})
        setResetPages()
    }
    const handlePrice = (price:number[]) => {
        setSearchObject({...searchObject, price})
        setResetPages()
    }
    const handleClear = () => {
        setResetBadgeToken()
        setSearchObject({...defaultValues, keyword:searchObject.keyword})
        setResetPages()
    }
     

    return (
        <div className={`sm:w-44 md:w-56 lg:w-64 sm:block hidden bg-white`}>

            <div className="bg-slate-700 text-white px-4 py-2 flex justify-between sticky top-0">
                <p className="text-lg font-bold">
                    Filters
                </p>
                <button className="ring-2 ring-slate-300 rounded-full px-2 py-1 text-xs self-center active:bg-slate-800 hover:bg-slate-700 font-bold"
                 onClick={handleClear}>
                    Clear Filters
                </button>
            </div>

            <p className="text-black font-bold py-2 pl-3">Category</p>
            <BadgePicker
                badges={categoryBadges.values}
                customBadgeStrings={categoryBadges.strings}
                onSelect={handleCategory}
                activeBgColor="bg-slate-500"
                passiveBgColor="bg-slate-100"
                activeTextColor="text-white"
                passiveTextColor="text-black"
                containerLayout="h-60 overflow-y-scroll flex flex-col px-4 accordianScrollbar"
                badgeLayout="pl-6 py-1"
                />

            <p className="text-black font-bold py-2 pl-3">Price</p>
            <div className={`px-4`}>
            <RangeSlider
                  defaultValue={defaultValues.price? defaultValues.price : [0,priceRange.max]}
                  max={priceRange.max}
                  min={priceRange.min}
                  step={priceRange.step}
                  onValueCommit={handlePrice}
                  />
            </div>

            <p className="text-black font-bold py-2 pl-3">Ratings</p>
            <BadgePicker
                badges={ratingBadges.values}
                customBadgeStrings={ratingBadges.strings}
                onSelect={handleRatings}
                activeBgColor="bg-slate-500"
                passiveBgColor="bg-slate-100"
                activeTextColor="text-white"
                passiveTextColor="text-black"
                containerLayout="flex flex-col px-4"
                badgeLayout="pl-6 py-1"
                />

            <p className="text-black font-bold py-2 pl-3">Discounts</p>
            <BadgePicker
                badges={discountBadges.values}
                customBadgeStrings={discountBadges.strings}
                onSelect={handleDiscounts}
                activeBgColor="bg-slate-500"
                passiveBgColor="bg-slate-100"
                activeTextColor="text-white"
                passiveTextColor="text-black"
                containerLayout="flex flex-col px-4"
                badgeLayout="pl-6 py-1"
                />
        </div>
    )
}
 
export default DesktopFilters
