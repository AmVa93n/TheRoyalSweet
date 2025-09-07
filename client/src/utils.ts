import type { CakeComponent, CustomCake, Product } from './types'

export function calculatePrice(product: Product | CakeComponent) {
    const workHourPrice = 10
    const electricityHourPrice = 0.54
    const fixedCosts = 2
    const gainMultiplier = 1.2 // 20% gain

    const electricityCost = product.electricityHours * electricityHourPrice
    const ingredientsCost = product.recipe.reduce((total, item) => {
        return total + (item.ingredient.pricePerUnit * item.amount);
    }, 0);

    const totalCost = ingredientsCost + electricityCost + fixedCosts
    const workHoursValue = product.workHours * workHourPrice
    const rawPrice = (totalCost + workHoursValue) * gainMultiplier
    const price = (Math.round(rawPrice * 10) / 10)
    const netGain = price - totalCost
    return { price, totalCost, netGain }
}

export function getCustomCakePrice(customCake: CustomCake) {
    const { price: doughPrice } = calculatePrice(customCake.dough)
    const { price: fillingPrice } = calculatePrice(customCake.filling)
    const { price: frostingPrice } = calculatePrice(customCake.frosting)
    const totalPrice = doughPrice + fillingPrice + frostingPrice
    return totalPrice
}

export const imagePlaceholder = "https://deintortenbild.de/cdn/shop/files/tortenbaender-2-stueck-a-26-x-10-cm-online-designer-910.webp?v=1737648157&width=1000"