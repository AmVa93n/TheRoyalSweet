import type { CakeComponent, CustomCake, Product } from './types'
import pingoDoceLogo from './assets/Pingo_Doce_logo.svg'
import continenteLogo from './assets/Logo_Continente.svg'
import auchanLogo from './assets/Auchan-Logo.svg'
import supercorLogo from './assets/Supercor-supermercados.png'

export const workHourPrice = 10
export const electricityHourPrice = 0.54
export const fixedCosts = 2
export const gainMultiplier = 1.2 // 20% gain

export function getElectricityCost(product: Product | CakeComponent) {
    return product.electricityHours * electricityHourPrice
}

export function getIngredientsCost(product: Product | CakeComponent) {
    return product.recipe.reduce((total, item) => {
        return total + (item.ingredient.pricePerUnit * item.amount);
    }, 0);
}

export function getTotalProductCost(product: Product | CakeComponent) {
    const electricityCost = getElectricityCost(product)
    const ingredientsCost = getIngredientsCost(product)
    return ingredientsCost + electricityCost + fixedCosts
}

export function getWorkHoursValue(product: Product | CakeComponent) {
    return product.workHours * workHourPrice
}

export function getProductPrice(product: Product | CakeComponent) {
    const totalCost = getTotalProductCost(product)
    const workHoursValue = getWorkHoursValue(product)
    const rawPrice = (totalCost + workHoursValue) * gainMultiplier
    return (Math.round(rawPrice * 10) / 10)
}

export function getCustomCakePrice(customCake: CustomCake) {
    const doughPrice = getProductPrice(customCake.dough)
    const fillingPrice = getProductPrice(customCake.filling)
    const frostingPrice = getProductPrice(customCake.frosting)
    const totalPrice = doughPrice + fillingPrice + frostingPrice
    return totalPrice
}

export const imagePlaceholder = "https://deintortenbild.de/cdn/shop/files/tortenbaender-2-stueck-a-26-x-10-cm-online-designer-910.webp?v=1737648157&width=1000"

export const productCategories = {
    cake: { en: 'Cakes', pt: 'Bolos' },
    pie: { en: 'Pies', pt: 'Tartes' },
    cheesecake: { en: 'Cheesecakes', pt: 'Cheesecakes' },
    dessert: { en: 'Desserts', pt: 'Sobremesas' },
    mini: { en: 'Minis', pt: 'Individuais' },
};

export const cakeComponentCategories = {
    dough: { en: 'Dough', pt: 'Massa' },
    filling: { en: 'Filling', pt: 'Recheio' },
    frosting: { en: 'Frosting', pt: 'Cobertura' },
};

export const supermarkets: Record<string, string> = {
    "Pingo Doce": pingoDoceLogo,
    "Continente": continenteLogo,
    "Auchan": auchanLogo,
    "Supercor": supercorLogo,
}