import type { CakeComponent, CustomCake, Product, Size } from '@/types'

export const productCategories = {
  cake: {
    name: { en: 'Cakes', pt: 'Bolos' }, 
    multipliers: { small: 0.67, medium: 1, big: 1.5 }, 
    serving: { 
      small: { en: "6 to 8 slices", pt: "6 a 8 fatias" }, 
      medium: { en: "10 to 12 slices", pt: "10 a 12 fatias" }, 
      big: { en: "14 to 16 slices", pt: "14 a 16 fatias" } 
    }
  },
  pie: { 
    name: { en: 'Pies', pt: 'Tartes' }, 
    multipliers: { small: 0.67, medium: 1, big: 1.5 },
    serving: { 
      small: { en: "6 to 8 slices", pt: "6 a 8 fatias" }, 
      medium: { en: "10 to 12 slices", pt: "10 a 12 fatias" }, 
      big: { en: "14 to 16 slices", pt: "14 a 16 fatias" } 
    }
  },
  cheesecake: { 
    name: { en: 'Cheesecakes', pt: 'Cheesecakes' }, 
    multipliers: { small: 0.67, medium: 1, big: 1.5 },
    serving: { 
      small: { en: "6 to 8 slices", pt: "6 a 8 fatias" }, 
      medium: { en: "10 to 12 slices", pt: "10 a 12 fatias" }, 
      big: { en: "14 to 16 slices", pt: "14 a 16 fatias" } 
    }
  },
  dessert: { 
    name: { en: 'Desserts', pt: 'Sobremesas' }, 
    multipliers: { small: 0.67, medium: 1, big: 1.5 },
    serving: { 
      small: { en: "5 to 7 portions", pt: "5 a 7 porções" }, 
      medium: { en: "8 to 10 portions", pt: "8 a 10 porções" }, 
      big: { en: "12 to 15 portions", pt: "12 a 15 porções" } 
    }
  },
  brigadeiro: { 
    name: { en: 'Brigadeiros', pt: 'Brigadeiros' }, 
    multipliers: { small: 0.5, medium: 1, big: 2 },
    serving: { 
      small: { en: "12 un.", pt: "12 un." }, 
      medium: { en: "25 un.", pt: "25 un." }, 
      big: { en: "50 un.", pt: "50 un." } 
    }
  },
};

export const cakeComponentCategories = {
  dough: { 
    name: { en: 'Dough', pt: 'Massa' }, 
    multipliers: { small: 0.67, medium: 1, big: 1.5 } 
  },
  filling: { 
    name: { en: 'Filling', pt: 'Recheio' }, 
    multipliers: { small: 0.67, medium: 1, big: 1.5 } 
  },
  frosting: { 
    name: { en: 'Frosting', pt: 'Cobertura' }, 
    multipliers: { small: 0.67, medium: 1, big: 1.5 } 
  },
  topping: { 
    name: { en: 'Topping', pt: 'Decoração' }, 
    multipliers: { small: 0.67, medium: 1, big: 1.5 } 
  },
};

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
    const multiplier = productCategories[product.category].multipliers[size];
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
    const multiplier = cakeComponentCategories[product.category].multipliers[size];
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