import type { CartItem } from '../../types';
import { useParams } from 'react-router-dom';
import { useStore } from '../../store';
import EditOrder from '../../components/admin/EditOrder';
import { useState } from 'react';
import { PencilIcon } from '@phosphor-icons/react';

export default function OrderPage() {
    const { orderId } = useParams();
    const { orders } = useStore();
    const order = orders.find(order => order._id === orderId)!;
    const ingredientRegistry = createIngredientRegistry();
    const grandTotalPrice = calculateGrandTotalPrice(order.items);
    const totalIngredientsPrice = ingredientRegistry.reduce((total, ing) => total + ing.totalPrice, 0);
    const [isEditing, setIsEditing] = useState(false);

    function createIngredientRegistry() {
        const registry: {[key: string]: { name: string; units: string; totalAmount: number; totalPrice: number }} = {};
    
        // Iterate through each item in the order and accumulate ingredient data
        order.items.forEach(item => {
          const { product, customCake } = item;
          const { dough, filling, frosting } = customCake || {};
          const recipe = product?.recipe || [...dough!.recipe, ...filling!.recipe, ...frosting!.recipe];
          recipe.forEach(({ ingredient, amount }) => {
            if (!registry[ingredient._id]) {
              registry[ingredient._id] = {
                name: ingredient.name,
                units: ingredient.recipeUnits,
                totalAmount: 0,
                totalPrice: 0,
              };
            }
    
            const entry = registry[ingredient._id];
            entry.totalAmount += amount * item.quantity;
            entry.totalPrice += entry.totalAmount * ingredient.pricePerUnit;
          });
        });

        // Add additional ingredients from the order
        order.additionalIngredients.forEach(({ ingredient, amount }) => {
          if (!registry[ingredient._id]) {
            registry[ingredient._id] = {
              name: ingredient.name,
              units: ingredient.recipeUnits,
              totalAmount: 0,
              totalPrice: 0,
            };
          }

          const entry = registry[ingredient._id];
          entry.totalAmount += amount;
          entry.totalPrice += amount * ingredient.pricePerUnit;
        });
    
        return Object.values(registry);
    }
    
    function calculateGrandTotalPrice(items: CartItem[]) {
        return items.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
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
                      {item.product?.name.pt || `Bolo Personalizado`}
                    </td>
                    <td className="px-4 py-2 text-gray-500">{item.note}</td>
                    <td className="px-4 py-2 text-center">{item.quantity}</td>
                    <td className="px-4 py-2 text-center">
                      {item.price.toFixed(2)} €
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

        {/* Ingredients */}
        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Total Ingredients
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Ingredient</th>
                  <th className="px-4 py-2 text-center">Total Amount</th>
                  <th className="px-4 py-2 text-center">Total Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ingredientRegistry.map((ingredient, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-800">
                      {ingredient.name}
                    </td>
                    <td className="px-4 py-2 text-center text-gray-600">
                      {ingredient.totalAmount} {ingredient.units}
                    </td>
                    <td className="px-4 py-2 text-center font-medium text-gray-800">
                      {ingredient.totalPrice.toFixed(3)} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="max-w-5xl mx-auto mt-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-medium">Grand Total Price:</span>{" "}
              {grandTotalPrice.toFixed(2)} €
            </p>
            <p className="text-lg">
              <span className="font-medium">Total Ingredients Price:</span>{" "}
              {totalIngredientsPrice.toFixed(3)} €
            </p>
            <p className="text-lg">
              <span className="font-medium">Net Gain:</span>{" "}
              {(grandTotalPrice - totalIngredientsPrice).toFixed(3)} €
            </p>
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