import type { CakeComponent, CustomCake, Product } from './types'
import pingoDoceLogo from './assets/Pingo_Doce_logo.svg'
import continenteLogo from './assets/Logo_Continente.svg'
import auchanLogo from './assets/Auchan-Logo.svg'
import supercorLogo from './assets/Supercor-supermercados.png'

export const workHourPrice = 8
export const electricityHourPrice = 0.54
export const fixedCostsPerItem = 2
export const gainMultiplier = 1.2 // 20% gain

function getElectricityCost(product: Product | CakeComponent) {
    return product.electricityHours * electricityHourPrice
}

function getWorkHoursValue(product: Product | CakeComponent) {
    return product.workHours * workHourPrice
}

function roundToNextWholeOrHalf(num: number) {
    const integerPart = Math.floor(num);
    const decimalPart = num - integerPart;

    if (decimalPart === 0) return integerPart; // already whole number
    if (decimalPart < 0.5) return integerPart + 0.5; // round up to next half
    return integerPart + 1; // round up to next whole
}

export function getComponentIngredients(product: Product, componentName: string) {
    const { recipe, recipeComponents } = product;
    if (componentName === 'Uncategorized') {
        return recipe.filter(item => !item.component || !recipeComponents.find(rc => rc.name === item.component));
    }
    return recipe.filter(item => item.component === componentName);
}

export function getInfo(product: Product | CakeComponent) {
    const electricityCost = getElectricityCost(product)
    const workHoursValue = getWorkHoursValue(product)
    return { electricityCost, workHoursValue }
}

// Product

export function getProductIngredientsCost(product: Product, size: string = "small") {
    const ingredientCost = product.recipe.reduce((total, item) => {
        const component = product.recipeComponents.find(rc => rc.name === item.component);
        const multiplier = size === "standard" && component ? component.multiplier : 1; // Use component multiplier if size is standard
        return total + (item.ingredient.pricePerUnit * item.amount * multiplier);
    }, 0);
    return ingredientCost;
}

export function getTotalProductCost(product: Product, size: string = "small") {
    const electricityCost = getElectricityCost(product)
    const ingredientsCost = getProductIngredientsCost(product, size)
    return ingredientsCost + electricityCost + fixedCostsPerItem
}

export function getProductPrice(product: Product, size: string = "small") {
    const totalCost = getTotalProductCost(product, size)
    const workHoursValue = getWorkHoursValue(product)
    const rawPrice = (totalCost + workHoursValue) * gainMultiplier
    return roundToNextWholeOrHalf(rawPrice)
}

// Cake Component

export function getCakeComponentIngredientsCost(product: CakeComponent, size: string = "small") {
    const multiplier = size === "standard" ? cakeComponentCategories[product.category].multiplier : 1 // Use category multiplier if size is standard
    const ingredientCost = product.recipe.reduce((total, item) => {
        return total + (item.ingredient.pricePerUnit * item.amount * multiplier);
    }, 0);
    return ingredientCost;
}

export function getTotalCakeComponentCost(cakeComponent: CakeComponent, size: string = "small") {
    const electricityCost = getElectricityCost(cakeComponent)
    const ingredientsCost = getCakeComponentIngredientsCost(cakeComponent, size)
    return ingredientsCost + electricityCost
}

export function getCakeComponentPrice(component: CakeComponent, size: string = "small") {
    const totalCost = getTotalCakeComponentCost(component, size)
    const workHoursValue = getWorkHoursValue(component)
    const rawPrice = (totalCost + workHoursValue) * gainMultiplier
    return roundToNextWholeOrHalf(rawPrice)
}

// Custom Cake

export function getCustomCakeInfo(customCake: CustomCake, size: string = "small") {
    const { dough, filling, frosting, topping } = customCake
    const electricityCost = getElectricityCost(dough) + getElectricityCost(filling) + getElectricityCost(frosting) + (topping ? getElectricityCost(topping) : 0)
    const ingredientsCost = getCakeComponentIngredientsCost(dough, size) + getCakeComponentIngredientsCost(filling, size) + getCakeComponentIngredientsCost(frosting, size) + (topping ? getCakeComponentIngredientsCost(topping, size) : 0)
    const workHoursValue = getWorkHoursValue(dough) + getWorkHoursValue(filling) + getWorkHoursValue(frosting) + (topping ? getWorkHoursValue(topping) : 0)
    const totalCost = getTotalCakeComponentCost(dough, size) + getTotalCakeComponentCost(filling, size) + getTotalCakeComponentCost(frosting, size) + (topping ? getTotalCakeComponentCost(topping, size) : 0) + fixedCostsPerItem
    return { electricityCost, ingredientsCost, workHoursValue, totalCost }
}

export function getCustomCakePrice(customCake: CustomCake, size: string = "small") {
    const { dough, filling, frosting, topping } = customCake
    const components = topping ? [dough, filling, frosting, topping] : [dough, filling, frosting]
    const totalCost = components.reduce((total, component) => total + getTotalCakeComponentCost(component, size), 0) + fixedCostsPerItem
    const workHoursValue = components.reduce((total, component) => total + getWorkHoursValue(component), 0)
    const rawPrice = (totalCost + workHoursValue) * gainMultiplier
    return roundToNextWholeOrHalf(rawPrice)
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
    dough: { en: 'Dough', pt: 'Massa', multiplier: 1.5 },
    filling: { en: 'Filling', pt: 'Recheio', multiplier: 2 },
    frosting: { en: 'Frosting', pt: 'Cobertura', multiplier: 1.5 },
    topping: { en: 'Topping', pt: 'Decoração', multiplier: 1.5 },
};

export const supermarkets: Record<string, string> = {
    "Pingo Doce": pingoDoceLogo,
    "Continente": continenteLogo,
    "Auchan": auchanLogo,
    "Supercor": supercorLogo,
};

export const sizes = {
    small: { en: "Small", pt: "Pequeno" },
    standard: { en: "Standard", pt: "Padrão" },
}