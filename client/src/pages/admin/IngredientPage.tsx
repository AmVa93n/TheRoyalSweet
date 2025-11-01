import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useAdminStore } from '../../store';
import EditIngredient from '../../components/admin/EditIngredient';
import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import { supermarkets } from '../../utils';
import DeleteConfirmation from '../../components/admin/DeleteConfirmation';
import adminService from '../../services/admin.service';

export default function IngredientPage() {
    const { ingredientId } = useParams();
    const { ingredients, setIngredients } = useAdminStore();
    const ingredient = ingredients.find(ingredient => ingredient._id === ingredientId)!;
    const location = useLocation();
    const [isEditing, setIsEditing] = useState(location.state?.new || false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    async function handleDelete() {
      try {
        await adminService.deleteIngredient(ingredient._id);
        setIngredients(ingredients.filter(i => i._id !== ingredient._id));
        navigate('/admin/ingredients'); // Redirect to ingredients list after deletion
      } catch (error) {
        console.error("Failed to delete ingredient:", error);
      }
    }

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

        {/* Actions */}
        <button
          onClick={() => setIsEditing(true)}
          className="fixed bottom-8 right-24 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
          title="Edit Ingredient"
        >
          <PencilIcon size={24} />
        </button>
        <button
          onClick={() => setIsDeleting(true)}
          className="fixed bottom-8 right-8 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
          title="Delete Ingredient"
        >
          <TrashIcon size={24} />
        </button>

        {/* Modals */}
        {isDeleting && (
          <DeleteConfirmation
            name={ingredient.name}
            onClose={() => setIsDeleting(false)}
            onConfirm={handleDelete}
          />
        )}
      </div>
    )
}