import { BsFillLaptopFill, BsFillPhoneFill } from "react-icons/bs"
import { BiChair, BiSolidWatchAlt } from "react-icons/bi"
import { GiFruitBowl, GiLargeDress, GiMirrorMirror } from "react-icons/gi"
import { searchObjectType } from "./store-Filters"
import { BiSolidTShirt } from "react-icons/bi"
import { TbHorseToy } from "react-icons/tb"
import { FaDog, FaDumbbell } from "react-icons/fa"
import { ImBook } from "react-icons/im"
import { AiFillMedicineBox } from "react-icons/ai"



export const SERVER_URL = import.meta.env.VITE_SERVER_URL
export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

export const priceRange = {
    max:200000,
    min:0,
    step:100
}

export const defaultValues:searchObjectType = {
    category    : null,
    ratings     : null,
    discount    : null,
    sort        : null,
    price       : [priceRange.min,priceRange.max],
    keyword     : null,
    pageNo      : 1,
    pageLength  : 30,
}

export const testUser = {
    email: 'user@mernbazaar.com',
    password: 'mernbazaar'
}

export const testSeller = {
    email: 'seller@mernbazaar.com',
    password: 'mernbazaar'
}

export const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
]

export const days = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday', 'Sunday'
]

export const nextSaleDate = '2024-01-01T00:00:00'
export const myGitHub = 'https://github.com/anubhavsinghofficials'


// Badges for BadgePicker_____________________________

export const sortingBadges = {
    strings : [
        "Price: low to high",
        "Price: high to low",
        "Ratings: low to high",
        "Ratings: high to low",
        "latest",
    ],
    values  : [
        "price|1",
        "price|-1",
        "ratings|1",
        "ratings|-1",
        "date|-1",
    ]
}

export const categoryBadges = {
    strings : [
        "Phones", "Menswear", "Womenswear", "Laptops",
        "Watches", "Furniture", "Toys", "Pet Supplies",
        "Books", "Beauty & Personal Care", "Groceries",
        "Medicines", "Gym Equipments"
    ],
    values  : [
        "phones", "menswear", "womenswear", "laptops",
        "watch", "furniture", "toys", "pets", "books",
        "beauty", "groceries", "medicines", "gym"
    ],
    icons   : [
        BsFillPhoneFill, BiSolidTShirt, GiLargeDress,
        BsFillLaptopFill, BiSolidWatchAlt, BiChair,
        TbHorseToy, FaDog, ImBook, GiMirrorMirror,
        GiFruitBowl, AiFillMedicineBox, FaDumbbell
    ]
}

export const ratingBadges = {
    strings : [
        "1★ and above",
        "2★ and above",
        "3★ and above",
        "4★ and above"
    ],
    values  : [  "1", "2", "3", "4" ]
}

export const discountBadges = {
    strings : [ 
        "30% or more", 
        "40% or more", 
        "50% or more", 
        "60% or more", 
        "70% or more", 
    ],
    values  : [ "30", "40", "50", "60", "70" ]
}



// Modal Messages ___________________________________

export const tempPaymentNote = '*Note: Currently all the payments are test payments, no actual amounts will be deducted from your bank account. Test card details will be provided when you buy any product, You can use them to test the payment systems'



