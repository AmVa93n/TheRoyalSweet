export type Ingredient = {
    _id: string,
    supermarket: string,
    brand: string,
    name: string,
    recipeUnits: string,
    pricePerUnit: number,
    price: number,
    unitsPerPackage: number,
    packageUnits: string,
}

export type Product = {
    _id: string,
    name: {
        en: string, 
        pt: string
    },
    intro: {
        en: string, 
        pt: string
    },
    description: {
        en: string, 
        pt: string
    },
    serve: {
        en: string, 
        pt: string
    },
    store: {
        en: string, 
        pt: string
    },
    images: string[],
    recipe: [{
        ingredient: Ingredient,
        amount: number
    }],
    category: Category
    workHours: number,
    electricityHours: number,
}

export type Order = {
    _id: string,
    name: string,
    email: string,
    items: CartItem[],
    pickup: boolean,
    shipping: {
        city: string,
        address: string,
        zip: string,
    },
    total: number
}

export type CartItem = {
    product: Product,
    size: Size,
    quantity: number
    price: number,
}

export type Size = "small" | "medium" | "big"

export type Category = "cake" | "pie" | "cheesecake" | "dessert" | "mini"