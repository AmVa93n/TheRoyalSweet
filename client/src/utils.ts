import type { Product, Ingredient } from './types'

export function calculatePrice(product: Product, ingredients: Ingredient[]) {
    const workHourPrice = 10
    const electricityHourPrice = 0.54
    const fixedCosts = 2
    const gainMultiplier = 1.2 // 20% gain

    const electricityCost = product.electricityHours * electricityHourPrice
    const ingredientsCost = product.recipe.reduce((total, item) => {
        const ingredient = ingredients.find(i => i._id === item.ingredient._id)!;
        return total + (ingredient?.pricePerUnit * item.amount);
    }, 0);

    const totalCost = ingredientsCost + electricityCost + fixedCosts
    const workHoursValue = product.workHours * workHourPrice
    const rawPrice = (totalCost + workHoursValue) * gainMultiplier
    const price = (Math.round(rawPrice * 10) / 10)
    const netGain = price - totalCost
    return { price, totalCost, netGain }
}