import type { Ingredient } from '../../types';
import { useLocation, useParams } from 'react-router-dom';
import { useStore } from '../../store';
import EditOrder from '../../components/admin/EditOrder';
import { useState } from 'react';
import { PencilIcon } from '@phosphor-icons/react';
import { getProductPrice, fixedCosts, electricityHourPrice, getProductInfo, getCustomCakeInfo } from '../../utils';
import Recipe from '../../components/admin/Recipe';

export default function OrderPage() {
    const { orderId } = useParams();
    const { orders, language } = useStore();
    const order = orders.find(order => order._id === orderId)!;
    const recipe = createRecipe();
    const location = useLocation();
    const [isEditing, setIsEditing] = useState(location.state?.new || false);
    const customCakeTitle = language === 'pt' ? 'Bolo Personalizado' : 'Custom Cake';
    const ingredientsCost = getTotalIngredientsCost();
    const electricityCost = getTotalElectricityCost();
    const totalCost = ingredientsCost + electricityCost + fixedCosts;
    const itemsPrice = order.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const additionalIngredientsCost = order.additionalIngredients.reduce((total, item) => total + item.ingredient.pricePerUnit * item.amount, 0);
    const totalPrice = itemsPrice + additionalIngredientsCost;
    const netGain = totalPrice - (totalCost + additionalIngredientsCost);

    function createRecipe() {
        const orderRecipe: { ingredient: Ingredient; amount: number }[] = [];
    
        // Iterate through each item in the order and accumulate ingredient amounts
        order.items.forEach(item => {
          const { product, customCake } = item;
          const { dough, filling, frosting } = customCake || {};
          const recipe = product?.recipe || [...dough!.recipe, ...filling!.recipe, ...frosting!.recipe];
          recipe.forEach(({ ingredient, amount }) => {
            let entry = orderRecipe.find(ing => ing.ingredient._id === ingredient._id);
            if (!entry) {
              entry = { ingredient, amount: 0 };
              orderRecipe.push(entry);
            }
            
            entry.amount += amount * item.quantity;
          });
        });

        // Add additional ingredients from the order
        order.additionalIngredients.forEach(({ ingredient, amount }) => {
          let entry = orderRecipe.find(ing => ing.ingredient._id === ingredient._id);
          if (!entry) {
            entry = { ingredient, amount: 0 };
            orderRecipe.push(entry);
          }

          entry.amount += amount;
        });
    
        return orderRecipe
    }

    function getTotalIngredientsCost() {
      const { items } = order;
      const products = items.filter(item => item.product);
      const IngredientsFromProductsCost = products.reduce((total, item) => total + getProductInfo(item.product!).ingredientsCost * item.quantity, 0);
      const customCakes = items.filter(item => item.customCake);
      const IngredientsFromCustomCakesCost = customCakes.reduce((total, item) => total + getCustomCakeInfo(item.customCake!).ingredientsCost * item.quantity, 0);
      return IngredientsFromProductsCost + IngredientsFromCustomCakesCost;
    }

    function getTotalElectricityCost() {
      const { items } = order;
      const products = items.filter(item => item.product);
      const ElectricityFromProductsCost = products.reduce((total, item) => total + getProductInfo(item.product!).electricityCost * item.quantity, 0);
      const customCakes = items.filter(item => item.customCake);
      const ElectricityFromCustomCakesCost = customCakes.reduce((total, item) => total + getCustomCakeInfo(item.customCake!).electricityCost * item.quantity, 0);
      return ElectricityFromProductsCost + ElectricityFromCustomCakesCost;
    }

    if (isEditing) {
      return <EditOrder order={order} onClose={() => setIsEditing(false)} />;
    }

    return (
      <div className="pt-24 pb-12 px-6 lg:px-16 min-h-screen">
        {/* Order Details */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Order Details
          </h2>
          <p className="text-gray-600">
            <span className="font-medium">Customer:</span> {order.name}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Email:</span> {order.email}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Phone:</span> {order.phone}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Created:</span>{" "}
            {order.createdAt.split("T")[0]}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Delivery Date:</span>{" "}
            {order.deliveryDate?.split("T")[0]}
          </p>

          {order.pickup ? (
            <p className="px-3 py-2 bg-blue-50 text-blue-700 rounded-md font-medium w-fit">
              Pickup
            </p>
          ) : (
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-700">
                Shipping Details
              </h2>
              <div className="mt-2 space-y-1 text-gray-600">
                <p>📍 City: {order.shipping.city}</p>
                <p>🏠 Address: {order.shipping.address}</p>
                <p>📮 ZIP: {order.shipping.zip}</p>
              </div>
            </div>
          )}
        </div>

        {/* Ordered Items */}
        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Ordered Items
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-left">Note</th>
                  <th className="px-4 py-2 text-center">Quantity</th>
                  <th className="px-4 py-2 text-center">Price (each)</th>
                  <th className="px-4 py-2 text-center">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <tr key={item.product?._id || item.customCake?.label} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-800">
                      {item.product?.name[language] || customCakeTitle}
                      {item.customCake && (
                        <div className='mt-1 text-xs text-gray-600 space-y-1 pl-2'>
                          <p className='grid grid-cols-[1fr_3fr]'>
                            <span className='font-medium'>{language === 'pt' ? 'Massa' : 'Dough'}:</span> {item.customCake.dough.name[language]}
                          </p>
                          <p className='grid grid-cols-[1fr_3fr]'>
                            <span className='font-medium'>{language === 'pt' ? 'Recheio' : 'Filling'}:</span> {item.customCake.filling.name[language]}
                          </p>
                          <p className='grid grid-cols-[1fr_3fr]'>
                            <span className='font-medium'>{language === 'pt' ? 'Cobertura' : 'Frosting'}:</span> {item.customCake.frosting.name[language]}
                          </p>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2 text-gray-500">{item.note}</td>
                    <td className="px-4 py-2 text-center">{item.quantity}</td>
                    <td className="px-4 py-2 text-center">
                      {item.price.toFixed(2)} €
                      {item.customCake && (
                        <div className='mt-1 text-xs text-gray-600 space-y-1'>
                          <p>{getProductPrice(item.customCake.dough).toFixed(2)} €</p>
                          <p>{getProductPrice(item.customCake.filling).toFixed(2)} €</p>
                          <p>{getProductPrice(item.customCake.frosting).toFixed(2)} €</p>
                          {item.customCake.topping && 
                            <p>{getProductPrice(item.customCake.topping).toFixed(2)} €</p>
                          }
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2 text-center font-medium text-gray-800">
                      {(item.price * item.quantity).toFixed(2)} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Ingredients */}
        {order.additionalIngredients.length > 0 &&
          <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Additional Ingredients
            </h2>
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
                  {order.additionalIngredients.map((item) => (
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
        }

        {/* Ingredients Breakdown */}
        <Recipe recipe={recipe} />

        {/* Summary */}
        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8 relative">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
          <div className='text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)]'>
            <span>Ingredients Cost</span> {ingredientsCost.toFixed(2)} €
          </div>
          <div className="text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)]">
            <span>Electricity Cost</span> {electricityCost.toFixed(2)} €
          </div>
          <div className="text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)]">
            <span>Fixed Costs</span> {fixedCosts.toFixed(2)} €
          </div>
          <hr className="my-1 border-gray-600" />
          <div className="text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)] mb-4 font-medium">
            <span>Total Cost</span> {totalCost.toFixed(2)} €
          </div>

          <div className="text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)]">
            <span>Items Price</span> {itemsPrice.toFixed(2)} €
          </div>
          <div className="text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)]">
            <span>Additional Ingredients Cost</span> {additionalIngredientsCost.toFixed(2)} €
          </div>
          <hr className="my-1 border-gray-600" />
          <div className="text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)] mb-4 font-medium">
            <span>Total Price</span> {totalPrice.toFixed(2)} €
          </div>

          <div className="text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)] font-medium">
            <span>Net Gain</span> {netGain.toFixed(2)} €
          </div>

          <div className="absolute top-8 right-8 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            Electricity Hour Price {electricityHourPrice} €
          </div>
        </div>

        {/* Floating Edit Button */}
        <button
          onClick={() => setIsEditing(true)}
          className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
          title="Edit Order"
        >
          <PencilIcon size={24} />
        </button>
      </div>
    )
}