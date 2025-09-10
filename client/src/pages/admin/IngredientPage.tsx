import { useLocation, useParams } from 'react-router-dom';
import { useStore } from '../../store';
import EditIngredient from '../../components/admin/EditIngredient';
import { useState } from 'react';
import { PencilIcon } from '@phosphor-icons/react';
import { supermarkets } from '../../utils';

export default function IngredientPage() {
    const { ingredientId } = useParams();
    const { ingredients } = useStore();
    const ingredient = ingredients.find(ingredient => ingredient._id === ingredientId)!;
    const location = useLocation();
    const [isEditing, setIsEditing] = useState(location.state?.new || false);

    if (isEditing) {
      return <EditIngredient ingredient={ingredient} onClose={() => setIsEditing(false)} />;
    }

    return (
      <div className="pt-24 pb-12 px-6 lg:px-16 min-h-screen">

        {/* Ingredient Details */}
        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Ingredient Details</h2>
          <p className="text-gray-600">
            <span className="font-medium">Name:</span> {ingredient.name}
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <span className="font-medium">Supermarkets:</span>
            <td className="px-4 text-gray-800 flex gap-2">
                {ingredient.supermarkets.map(sm => (
                    supermarkets[sm] ? 
                        <img src={supermarkets[sm]} alt={sm} className="w-20 object-fit" />
                    : sm
                ))}
            </td>
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Brand:</span> {ingredient.brand}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Recipe Units:</span> {ingredient.recipeUnits}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Price / Unit:</span> {ingredient.pricePerUnit} €
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Price:</span> {ingredient.price} €
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Units / Package:</span> {ingredient.unitsPerPackage}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Package Units:</span> {ingredient.packageUnits}
          </p>
        </div>

        {/* Floating Edit Button */}
        <button
          onClick={() => setIsEditing(true)}
          className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
          title="Edit Ingredient"
        >
          <PencilIcon size={24} />
        </button>
      </div>
    )
}