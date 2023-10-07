import { searchObjectType } from "./store-Filters"



export const serverUrl = 'http://localhost:3000/api/v1'


export const priceRange = {
    max:25000,
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
    pageLength  : 10,
}


export const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
]

// Badges for BadgePicker______________________________

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


// Modal Messages ______________________________

export const tempPaymentNote = '*Note: Currently all the payments are test payments, no actual amounts will be deducted from your bank account upon buying the products. You can use test cards provided in the payment gateway to test the payment systems'
export const reviewModalTitle = 'Are you sure you want to delete your review ?'
export const reviewModalMessage = 'Your review will be permanently deleted for this product. You can review it again after that'


// General
// only categoryBadges (value,strings), why?
// user role verify
// top 7 best whatever for initial search suggestions (category + name backend search)

// User
// Cart Product count

// simplyfy the categoryis plurals first