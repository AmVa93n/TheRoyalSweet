import type { CakeComponent, CustomCake, Product } from './types'
import pingoDoceLogo from './assets/Pingo_Doce_logo.svg'
import continenteLogo from './assets/Logo_Continente.svg'
import auchanLogo from './assets/Auchan-Logo.svg'
import supercorLogo from './assets/Supercor-supermercados.png'

export const workHourPrice = 10
export const electricityHourPrice = 0.54
export const fixedCosts = 2
export const gainMultiplier = 1.2 // 20% gain

function getElectricityCost(product: Product | CakeComponent) {
    return product.electricityHours * electricityHourPrice
}

function getIngredientsCost(product: Product | CakeComponent, size: number = 1) {
    const ingredientCost = product.recipe.reduce((total, item) => {
        return total + (item.ingredient.pricePerUnit * item.amount);
    }, 0);
    return ingredientCost * size;
}

export function getTotalProductCost(product: Product | CakeComponent, size: number = 1) {
    const electricityCost = getElectricityCost(product)
    const ingredientsCost = getIngredientsCost(product, size)
    return ingredientsCost + electricityCost + fixedCosts
}

function getWorkHoursValue(product: Product | CakeComponent) {
    return product.workHours * workHourPrice
}

export function getProductInfo(product: Product | CakeComponent, size: number = 1) {
    const electricityCost = getElectricityCost(product)
    const ingredientsCost = getIngredientsCost(product, size)
    const totalCost = getTotalProductCost(product, size)
    const workHoursValue = getWorkHoursValue(product)
    return { electricityCost, ingredientsCost, totalCost, workHoursValue }
}

export function getCustomCakeInfo(customCake: CustomCake, size: number = 1) {
    const { dough, filling, frosting, topping } = customCake
    const electricityCost = getElectricityCost(dough) + getElectricityCost(filling) + getElectricityCost(frosting) + (topping ? getElectricityCost(topping) : 0)
    const ingredientsCost = getIngredientsCost(dough, size) + getIngredientsCost(filling, size) + getIngredientsCost(frosting, size) + (topping ? getIngredientsCost(topping, size) : 0)
    const totalCost = getTotalProductCost(dough, size) + getTotalProductCost(filling, size) + getTotalProductCost(frosting, size) + (topping ? getTotalProductCost(topping, size) : 0)
    const workHoursValue = getWorkHoursValue(dough) + getWorkHoursValue(filling) + getWorkHoursValue(frosting) + (topping ? getWorkHoursValue(topping) : 0)
    return { electricityCost, ingredientsCost, totalCost, workHoursValue }
}

export function getProductPrice(product: Product | CakeComponent, size: number = 1) {
    const totalCost = getTotalProductCost(product, size)
    const workHoursValue = getWorkHoursValue(product)
    const rawPrice = (totalCost + workHoursValue) * gainMultiplier
    return (Math.round(rawPrice * 10) / 10)
}

export function getCustomCakePrice(customCake: CustomCake, size: number = 1) {
    const { dough, filling, frosting, topping } = customCake
    const doughPrice = getProductPrice(dough, size)
    const fillingPrice = getProductPrice(filling, size)
    const frostingPrice = getProductPrice(frosting, size)
    const toppingPrice = topping ? getProductPrice(topping, size) : 0
    return (doughPrice + fillingPrice + frostingPrice + toppingPrice)
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
    topping: { en: 'Topping', pt: 'Decoração' },
};

export const supermarkets: Record<string, string> = {
    "Pingo Doce": pingoDoceLogo,
    "Continente": continenteLogo,
    "Auchan": auchanLogo,
    "Supercor": supercorLogo,
};

export const sizes = {
    1: { en: "Small", pt: "Pequeno" },
    1.5: { en: "Standard", pt: "Padrão" },
}