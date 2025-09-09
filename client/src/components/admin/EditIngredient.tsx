import { useState } from "react";
import type { Ingredient } from "../../types";
import { useStore } from "../../store";
import adminService from '../../services/admin.service'
import { FloppyDiskIcon, XIcon } from "@phosphor-icons/react";

type Props = {
    ingredient: Ingredient;
    onClose: () => void;
};

export default function EditIngredient({ ingredient, onClose }: Props) {
    const { ingredients, setIngredients } = useStore();
    const [ingredientForm, setIngredientForm] = useState(ingredient as Ingredient);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setIngredientForm(prev => ({ ...prev, [name]: value }));
    };

    async function handleSave() {
        try {
            const updatedIngredient = await adminService.updateIngredient(ingredientForm);
            const updatedIngredients = ingredients.map(ingredient => ingredient._id === updatedIngredient._id ? updatedIngredient : ingredient);
            setIngredients(updatedIngredients); // Update the ingredient in the list
        } catch (error) {
            console.error("Error saving ingredient:", error);
        }
        onClose();
    };

    return (
        <div className="pt-24 pb-12 px-6 lg:px-16 min-h-screen">

            {/* Cake Component Details */}
            <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8 space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Cake Component Details</h2>
                <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                    <label className="font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={ingredientForm.name}
                        onChange={handleChange}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                </div>
                <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                    <label className="font-medium text-gray-700">Supermarket:</label>
                    <input
                        type="text"
                        name="supermarket"
                        value={ingredientForm.supermarket}
                        onChange={handleChange}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                </div>
                <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                    <label className="font-medium text-gray-700">Brand:</label>
                    <input
                        type="text"
                        name="brand"
                        value={ingredientForm.brand}
                        onChange={handleChange}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                </div>
                <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                    <label className="font-medium text-gray-700">Recipe Units:</label>
                    <input
                        type="text"
                        name="recipeUnits"
                        value={ingredientForm.recipeUnits}
                        onChange={handleChange}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                </div>
                <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                    <label className="font-medium text-gray-700">Price / Unit:</label>
                    <input
                        type="number"
                        name="pricePerUnit"
                        value={ingredientForm.pricePerUnit}
                        onChange={handleChange}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                </div>
                <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                    <label className="font-medium text-gray-700">Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={ingredientForm.price}
                        onChange={handleChange}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                </div>
                <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                    <label className="font-medium text-gray-700">Units / Package:</label>
                    <input
                        type="number"
                        name="unitsPerPackage"
                        value={ingredientForm.unitsPerPackage}
                        onChange={handleChange}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                </div>
                <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                    <label className="font-medium text-gray-700">Package Units:</label>
                    <input
                        type="text"
                        name="packageUnits"
                        value={ingredientForm.packageUnits}
                        onChange={handleChange}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                </div>
            </div>

            {/* Actions */}
            <button
                onClick={handleSave}
                className="fixed bottom-8 right-24 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
                title="Save Ingredient"
            >
                <FloppyDiskIcon size={24} />
            </button>
            <button
                onClick={onClose}
                className="fixed bottom-8 right-8 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
                title="Close"
            >
                <XIcon size={24} />
            </button>
        </div>
    )
}