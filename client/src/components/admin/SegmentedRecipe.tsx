import type { Product } from "../../types";
import { supermarkets, getComponentIngredients } from "../../utils";

type Props = {
    product: Product;
}

export default function SegmentedRecipe({ product }: Props) {
    const { recipe, recipeComponents } = product;
    const supermarketList = Object.keys(supermarkets).sort((a, b) => getSupermarketShare(b) - getSupermarketShare(a)).filter(sm => getSupermarketShare(sm) > 0);
    const segments = [...recipeComponents, { name: 'Uncategorized', multiplier: 1 }];

    function getSupermarketShare(supermarket: string) {
      const totalIngredients = recipe.length;
      const ingredientsInSupermarket = recipe.filter(item => item.ingredient.supermarkets.includes(supermarket)).length;
      return (ingredientsInSupermarket / totalIngredients) * 100;
    }

    return (
        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recipe</h2>
          {segments.map((component) => {
            const ingredientsInComponent = getComponentIngredients(product, component.name);
            if (ingredientsInComponent.length === 0) return null;

            return (
              <div className="overflow-x-auto">
                <h3 className="text-lg font-medium text-gray-700 mt-6 mb-2">
                  {component.name} {component.multiplier !== 1 && `(x${component.multiplier} for big size)`}
                </h3>
                <table className="w-full border-collapse">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left">Ingredient</th>
                      <th className="px-4 py-2 text-center">Amount</th>
                      <th className="px-4 py-2 text-center">Price / Unit</th>
                      <th className="px-4 py-2 text-center">Total Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {ingredientsInComponent.map((item) => (
                      <tr key={item.ingredient._id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-gray-800">{item.ingredient.name}</td>
                        <td className="px-4 py-2 text-center">{item.amount} {item.ingredient.recipeUnits}</td>
                        <td className="px-4 py-2 text-center">{item.ingredient.pricePerUnit.toFixed(3)} €</td>
                        <td className="px-4 py-2 text-center font-medium text-gray-800">{(item.ingredient.pricePerUnit * item.amount).toFixed(3)} €</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          })}

          <div className="flex flex-col gap-2 mt-6">
            {supermarketList.map(sm => (
              <div key={sm} className="flex items-center gap-4">
                {supermarkets[sm] ? <img src={supermarkets[sm]} alt={sm} className="w-12 object-fit" /> : sm}
                <div className="flex items-center gap-2 w-full">
                  <div className={`h-2 bg-indigo-500 rounded`} style={{ width: `${getSupermarketShare(sm)}%` }}></div>
                  <span className="text-sm text-gray-600">{Math.round(getSupermarketShare(sm))}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
    )
}