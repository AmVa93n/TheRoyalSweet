export type Ingredient = {
    _id: string,
    supermarkets: string[],
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
    recipe: {
        ingredient: Ingredient,
        amount: number
    }[],
    category: ProductCategory
    workHours: number,
    electricityHours: number,
    internal: boolean,
}

export type CakeComponent = {
    _id: string,
    name: {
        en: string, 
        pt: string
    },
    recipe: {
        ingredient: Ingredient,
        amount: number
    }[],
    category: CakeComponentCategory,
    workHours: number,
    electricityHours: number,
    internal: boolean,
}

export type Order = {
    _id: string,
    name: string,
    email: string,
    phone: string,
    items: CartItem[],
    pickup: boolean,
    shipping: {
        city: string,
        address: string,
        zip: string,
    },
    deliveryDate: string
    createdAt: string
    additionalIngredients: {
        ingredient: Ingredient,
        amount: number
    }[]
}

export type CartItem = {
    product?: Product,
    customCake?: CustomCake,
    size: number,
    quantity: number,
    price: number,
    note?: string
}

export type CustomCake = {
    label: string,
    dough: CakeComponent,
    filling: CakeComponent,
    frosting: CakeComponent,
    topping?: CakeComponent,
}

export type ProductCategory = "cake" | "pie" | "cheesecake" | "dessert" | "mini";
export type CakeComponentCategory = "dough" | "filling" | "frosting" | "topping";