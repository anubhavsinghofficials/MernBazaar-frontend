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
    pageLength  : 2,
}



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
        "createdAt|-1",
    ]
}

export const categoryBadges = {
    strings : [
        "Phones", "Menswear", "Womenswear", "Laptops",
        "Watches", "Furniture", "Toys", "Pet Supplies",
         "Books", "Beauty & Personal Care", "Groceries",
        "Medicines", "Gym Equipments", "Others"
    ],
    values  : [
        "phones", "menswear", "womenswear", "laptops",
        "watches", "furniture", "toys", "pets", "books",
        "beauty", "groceries", "medicines", "gym", "others"
    ],
}

export const ratingBadges = {
    strings : [
        "4★ and above",
        "3★ and above",
        "2★ and above",
        "1★ and above"
    ],
    values  : [ "4", "3", "2", "1" ]
}

export const discountBadges = {
    strings : [ "50% off","40% off","30% off","20% off" ],
    values  : [ "50", "40", "30", "20" ]
}
