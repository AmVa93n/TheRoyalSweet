import type { Ingredient, CakeComponentCategory, Order } from '../types';
import { useAdminStore } from '../store';
import { useState } from 'react';
import { getCustomCakeInfo, cakeComponentCategories, getProductIngredientsCost, supermarkets } from '../utils';
import { CircleIcon, CheckCircleIcon } from '@phosphor-icons/react';

export default function GroceryListPage() {
  const { orders } = useAdminStore();
  const orderOptions = orders.filter(order => {
    // Exclude orders with delivery date in the past
    const deliveryDate = new Date(order.deliveryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return deliveryDate >= today;
  });
  const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);
  const groceryList = selectedOrders.reduce((acc, order) => {
      const orderRecipe = aggregateOrderIngredients(order);
      orderRecipe.forEach(({ ingredient, amount }) => {
          const entry = acc.find(ing => ing.ingredient._id === ingredient._id);
          if (entry) {
              entry.amount += amount;
          } else {
              acc.push({ ingredient, amount });
          }
      });
      return acc;
  }, [] as { ingredient: Ingredient; amount: number }[]);
  const ingredientsCost = selectedOrders.reduce((total, order) => total + getTotalIngredientsCost(order), 0);
  const supermarketList = Object.keys(supermarkets).sort((a, b) => getSupermarketShare(b) - getSupermarketShare(a)).filter(sm => getSupermarketShare(sm) > 0);
    
  function getSupermarketShare(supermarket: string) {
    const totalIngredients = groceryList.length;
    const ingredientsInSupermarket = groceryList.filter(item => item.ingredient.supermarkets.includes(supermarket)).length;
    return (ingredientsInSupermarket / totalIngredients) * 100;
  }

  function aggregateOrderIngredients(order: Order) {
      const orderRecipe: { ingredient: Ingredient; amount: number }[] = [];
      const products = order.items.filter(item => item.product)
      const customCakes = order.items.filter(item => item.customCake)
  
      // Iterate through each product in the order and accumulate ingredient amounts
      products.forEach(item => {
        const { recipe, recipeComponents } = item.product!;
        // For each ingredient in the product's recipe
        recipe.forEach(({ ingredient, amount, component }) => {
          const entry = orderRecipe.find(ing => ing.ingredient._id === ingredient._id);
          const comp = recipeComponents.find(rc => rc.name === component);
          const multiplier = item.size === 'standard' && comp ? comp.multiplier : 1;
          const addedAmount = amount * multiplier * item.quantity;
          if (entry) {
            entry.amount += addedAmount;
          } else {
            orderRecipe.push({ ingredient, amount: addedAmount });
          }
        });
      });

      // Iterate through each custom cake in the order and accumulate ingredient amounts
      customCakes.forEach(item => {
        const components = ["dough", "filling", "frosting", "topping"] as CakeComponentCategory[];
        // For each component of the custom cake
        components.forEach((componentName) => {
          const { recipe } = item.customCake![componentName]!;
          // For each ingredient in the component's recipe
          recipe.forEach(({ ingredient, amount }) => {
            const entry = orderRecipe.find(ing => ing.ingredient._id === ingredient._id);
            const multiplier = item.size === 'standard' ? cakeComponentCategories[componentName].multiplier : 1
            const addedAmount = amount * multiplier * item.quantity;
            if (entry) {
              entry.amount += addedAmount;
            } else {
              orderRecipe.push({ ingredient, amount: addedAmount });
            }
          });
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

  function getTotalIngredientsCost(order: Order) {
    const { items } = order;
    const products = items.filter(item => item.product);
    const IngredientsFromProductsCost = products.reduce((total, item) => total + getProductIngredientsCost(item.product!, item.size) * item.quantity, 0);
    const customCakes = items.filter(item => item.customCake);
    const IngredientsFromCustomCakesCost = customCakes.reduce((total, item) => total + getCustomCakeInfo(item.customCake!, item.size).ingredientsCost * item.quantity, 0);
    return IngredientsFromProductsCost + IngredientsFromCustomCakesCost;
  }

  function toggleIncludeOrder(order: Order) {
    if (selectedOrders.find(o => o._id === order._id)) {
      setSelectedOrders(selectedOrders.filter(o => o._id !== order._id));
    } else {
      setSelectedOrders([...selectedOrders, order]);
    }
  }

  return (
    <div className="pt-24 pb-12 px-6 lg:px-16 min-h-screen">
      {/* Orders List */}
      <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8">
        {orderOptions.length > 0 ?
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-center">Created</th>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-center">Items</th>
                <th className="px-4 py-2 text-center">Total Price</th>
                <th className="px-4 py-2 text-center">Delivery Date</th>
                <th className="px-4 py-2 text-center">Include</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orderOptions.map((order) => (
              <tr 
                key={order._id} 
                className={`cursor-pointer ${selectedOrders.find(o => o._id === order._id) ? 'bg-green-100 hover:bg-green-200' : 'hover:bg-gray-100'}`} 
                onClick={() => toggleIncludeOrder(order)}
              >
                <td className="px-4 py-2 text-center">{order.createdAt.split('T')[0]}</td>
                <td className="px-4 py-2 text-gray-800">{order.name}</td>
                <td className="px-4 py-2 text-center">{order.items.length}</td>
                <td className="px-4 py-2 text-center">{order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)} €</td>
                <td className="px-4 py-2 text-center">{order.deliveryDate.split('T')[0]}</td>
                <td className="px-4 py-2 text-center">
                  <div className='p-1 flex justify-center items-center'>
                    {selectedOrders.find(o => o._id === order._id) ? <CheckCircleIcon size={24} className="text-green-500" /> : <CircleIcon size={24} className="text-gray-400" />}
                  </div>
                </td>
              </tr>
              ))}
            </tbody>
            </table>
          </div>
        :
          <p className="max-w-5xl mx-auto text-center text-gray-600">You currently have no upcoming orders.</p>
        }
      </div>

      {/* Ingredients Breakdown */}
      <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Grocery List</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Ingredient</th>
                <th className="px-4 py-2 text-center">Amount</th>
                <th className="px-4 py-2 text-center">Units / Package</th>
                <th className="px-4 py-2 text-center">Packages Needed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {groceryList.map((item) => (
                <tr key={item.ingredient._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-800">{item.ingredient.name}</td>
                  <td className="px-4 py-2 text-center">{item.amount} {item.ingredient.recipeUnits}</td>
                  <td className="px-4 py-2 text-center">{item.ingredient.unitsPerPackage} {item.ingredient.packageUnits}</td>
                  <td className="px-4 py-2 text-center"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

      {/* Summary */}
      <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8 relative">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
        <div className='text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)]'>
          <span>Included Orders</span> {selectedOrders.length}
        </div>
        <div className='text-gray-800 grid grid-cols-2 grid-cols-[repeat(2,1fr)]'>
          <span>Ingredients Cost</span> {ingredientsCost.toFixed(2)} €
        </div>
      </div>

    </div>
  )
}