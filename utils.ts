import type { CakeComponent, CustomCake, Product, Size } from '@/types'

export const cakeComponentCategories = {
    dough: { en: 'Dough', pt: 'Massa' },
    filling: { en: 'Filling', pt: 'Recheio' },
    frosting: { en: 'Frosting', pt: 'Cobertura' },
    topping: { en: 'Topping', pt: 'Decoração' },
};

export const sizes = {
    small: { en: "Small", pt: "Pequeno", multiplier: 0.67 },
    medium: { en: "Medium", pt: "Médio", multiplier: 1 },
    big: { en: "Big", pt: "Grande", multiplier: 1.5 },
}

const workHourPrice = 8
const electricityHourPrice = 0.54
const fixedCostsPerItem = 2
const gainMultiplier = 1.2 // 20% gain

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

// Product

function getProductIngredientsCost(product: Product, size: Size) {
    const multiplier = sizes[size].multiplier;
    const ingredientCost = product.recipe.reduce((total, item) => {
        return total + (item.ingredient.pricePerUnit * item.amount * multiplier);
    }, 0);
    return ingredientCost;
}

function getTotalProductCost(product: Product, size: Size) {
    const electricityCost = getElectricityCost(product)
    const ingredientsCost = getProductIngredientsCost(product, size)
    return ingredientsCost + electricityCost + fixedCostsPerItem
}

export function getProductPrice(product: Product, size: Size) {
    const totalCost = getTotalProductCost(product, size)
    const workHoursValue = getWorkHoursValue(product)
    const rawPrice = (totalCost + workHoursValue) * gainMultiplier
    return roundToNextWholeOrHalf(rawPrice)
}

// Cake Component

function getCakeComponentIngredientsCost(product: CakeComponent, size: Size) {
    const multiplier = sizes[size].multiplier;
    const ingredientCost = product.recipe.reduce((total, item) => {
        return total + (item.ingredient.pricePerUnit * item.amount * multiplier);
    }, 0);
    return ingredientCost;
}

function getTotalCakeComponentCost(cakeComponent: CakeComponent, size: Size) {
    const electricityCost = getElectricityCost(cakeComponent)
    const ingredientsCost = getCakeComponentIngredientsCost(cakeComponent, size)
    return ingredientsCost + electricityCost
}

export function getCakeComponentPrice(component: CakeComponent, size: Size) {
    const totalCost = getTotalCakeComponentCost(component, size)
    const workHoursValue = getWorkHoursValue(component)
    const rawPrice = (totalCost + workHoursValue) * gainMultiplier
    return roundToNextWholeOrHalf(rawPrice)
}

// Custom Cake

export function getCustomCakePrice(customCake: CustomCake, size: Size) {
    const { dough, filling, frosting, topping } = customCake
    const components = topping ? [dough, filling, frosting, topping] : [dough, filling, frosting]
    const totalCost = components.reduce((total, component) => total + getTotalCakeComponentCost(component, size), 0) + fixedCostsPerItem
    const workHoursValue = components.reduce((total, component) => total + getWorkHoursValue(component), 0)
    const rawPrice = (totalCost + workHoursValue) * gainMultiplier
    return roundToNextWholeOrHalf(rawPrice)
}