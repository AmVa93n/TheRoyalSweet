import type { Product, CakeComponent } from "../../types";
import { fixedCostsPerItem, getProductPrice, getCakeComponentPrice, gainMultiplier, workHourPrice, electricityHourPrice, getInfo, 
  getTotalProductCost, getTotalCakeComponentCost, getProductIngredientsCost, getCakeComponentIngredientsCost } from '../../utils';

type Props = {
    product: Product | CakeComponent;
}

export default function Pricing({ product }: Props) {
    const { electricityCost, workHoursValue } = getInfo(product);
    const isProduct = "description" in product; // Check if it's a Product
    const ingredientsCost = isProduct ? getProductIngredientsCost(product) : getCakeComponentIngredientsCost(product);
    const totalCost = isProduct ? getTotalProductCost(product) : getTotalCakeComponentCost(product);
    const price = isProduct ? getProductPrice(product) : getCakeComponentPrice(product);
    const netGain = price - totalCost;

    return (
        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8 relative">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pricing</h2>
          <div className='text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)]'>
            <span>Ingredients Cost</span> {ingredientsCost.toFixed(2)} €
          </div>
          <div className="text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)]">
            <span>Electricity Cost</span> {electricityCost.toFixed(2)} €
          </div>
          <div className="text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)]">
            <span>Fixed Costs</span> {fixedCostsPerItem.toFixed(2)} €
          </div>
          <hr className="my-1 border-gray-600" />
          <div className="text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)] mb-4 font-medium">
            <span>Total Cost</span> {totalCost.toFixed(2)} €
          </div>

          <div className='text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)]'>
            <span>Work Hours Value</span> {workHoursValue.toFixed(2)} €
          </div>
          <div className='text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)]'>
            <span>20% Gain Multiplier</span> {((totalCost + workHoursValue) * (gainMultiplier - 1)).toFixed(2)} €
          </div>
          <hr className="my-1 border-gray-600" />
          <div className="text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)] mb-4 font-medium">
            <span>Price</span> {price.toFixed(2)} €
          </div>

          <div className="text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)] font-medium">
            <span>Net Gain</span> {netGain.toFixed(2)} €
          </div>

          <div className="absolute top-8 right-8 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            Work Hour Price {workHourPrice} €
          </div>
          <div className="absolute top-16 right-8 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            Electricity Hour Price {electricityHourPrice} €
          </div>
        </div>
    )
}