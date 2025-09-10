import type { Ingredient } from "../../types";

type Props = {
    recipe: { ingredient: Ingredient; amount: number }[];
}

export default function Recipe({ recipe }: Props) {
    return (
        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recipe</h2>
          <div className="overflow-x-auto">
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
                {recipe.map((item) => (
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
        </div>
    )
}