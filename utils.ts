import type { CakeComponent, CustomCake, Product, Size } from '@/types'

export const sizes = {
  small: { en: "Small", pt: "Pequeno" },
  medium: { en: "Medium", pt: "Médio" },
  big: { en: "Big", pt: "Grande" },
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

// Product

function getProductIngredientsCost(product: Product, size: Size) {
    const multiplier = product.category?.multipliers[size] || 1
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
    return Math.ceil(rawPrice)
}

// Cake Component

function getCakeComponentIngredientsCost(product: CakeComponent, size: Size) {
    const multiplier = product.category?.multipliers[size] || 1
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
    return Math.ceil(rawPrice)
}

// Custom Cake

export function getCustomCakePrice(customCake: CustomCake, size: Size) {
    const { dough, filling, frosting, topping } = customCake
    const components = topping ? [dough, filling, frosting, topping] : [dough, filling, frosting]
    const totalCost = components.reduce((total, component) => total + getTotalCakeComponentCost(component, size), 0) + fixedCostsPerItem
    const workHoursValue = components.reduce((total, component) => total + getWorkHoursValue(component), 0)
    const rawPrice = (totalCost + workHoursValue) * gainMultiplier
    return Math.ceil(rawPrice)
}