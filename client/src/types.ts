export type Ingredient = {
    _id: string,
    supermarket: string,
    brand: string,
    name: string,
    units: string,
    priceperunit: number,
    image: string
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
    price: {
        small: number,
        medium: number,
        big: number,
    },
    images: string[],
    recipe: [{
        ingredient: Ingredient,
        amount: number
    }],
    category: string
}

export type Order = {
    name: string,
    email: string,
    items: [{
        product: Product,
        size: string,
        quantity: number
    }],
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
}

export type Size = "small" | "medium" | "big"