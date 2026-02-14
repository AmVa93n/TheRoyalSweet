import { useState } from "react";
import type { CakeComponent, CakeComponentCategory } from "../types";
import { useStore, useAdminStore } from "../store";
import adminService from '../service';
import { TrashIcon, FloppyDiskIcon, XIcon, ArrowUpIcon, ArrowDownIcon, PlusCircleIcon } from "@phosphor-icons/react";
import { cakeComponentCategories } from "../utils";
import AddIngredientModal from "./AddIngredientModal";

type Props = {
    cakeComponent?: CakeComponent;
    onClose: () => void;
};

export default function EditCakeComponent({ cakeComponent, onClose }: Props) {
    const { cakeComponents, setCakeComponents, ingredients } = useAdminStore();
    const { language } = useStore();
    const [cakeComponentForm, setCakeComponentForm] = useState(cakeComponent as CakeComponent);
    const [isAddingIngredient, setIsAddingIngredient] = useState(false);
    type textKey = 'name';

    function handleChangeText(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, language: 'pt' | 'en') {
        const { name, value } = e.target;
        setCakeComponentForm((prev) => {
            return { ...prev, [name]: { ...prev[name as textKey], [language]: value } };
        });
    };

    function handleAddIngredient(id: string, amount: number) {
        const ingredient = ingredients.find(ingredient => ingredient._id === id)!
        setCakeComponentForm((prev) => ({...prev, recipe: [...prev.recipe, { ingredient, amount }] }));
    };
    
    function handleDeleteIngredient(ingredientId: string) {
        setCakeComponentForm((prev) => ({
            ...prev,
            recipe: prev.recipe.filter(item => item.ingredient._id !== ingredientId)
        }));
    };

    function handleMoveIngredient(direction: 'up' | 'down', ingredientId: string) {
        setCakeComponentForm((prev) => {
            const index = prev.recipe.findIndex(item => item.ingredient._id === ingredientId);
            if (index === -1) return prev; // Ingredient not found
            const newRecipe = [...prev.recipe];
            if (direction === 'up' && index > 0) {
                [newRecipe[index - 1], newRecipe[index]] = [newRecipe[index], newRecipe[index - 1]];
            } else if (direction === 'down' && index < newRecipe.length - 1) {
                [newRecipe[index + 1], newRecipe[index]] = [newRecipe[index], newRecipe[index + 1]];
            }
            return { ...prev, recipe: newRecipe };
        });
    };

    async function handleSave() {
        try {
            const updatedCakeComponent = await adminService.updateCakeComponent(cakeComponentForm);
            const updatedCakeComponents = cakeComponents.map((cakeComponent) => cakeComponent._id === updatedCakeComponent._id ? updatedCakeComponent : cakeComponent);
            setCakeComponents(updatedCakeComponents);
        } catch (error) {
            console.error("Failed to save cake component:", error);
        }
        onClose();
    };

    return (
        <div className="pt-24 pb-12 px-6 lg:px-16 min-h-screen">
            {/* Cake Component Text */}
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Cake Component Text</h2>
                <div className="grid grid-cols-3 grid-cols-[150px_1fr_1fr]">
                    <div></div>
                    <div className="font-medium text-center flex items-center justify-center gap-1">
                        <img src="https://flagcdn.com/w20/pt.png" alt="PT" /> PT
                    </div>
                    <div className="font-medium text-center flex items-center justify-center gap-1">
                        <img src="https://flagcdn.com/w20/gb.png" alt="EN" /> EN
                    </div>
                </div>
                <div className="text-gray-600 grid grid-cols-3 grid-cols-[150px_1fr_1fr] gap-2">
                    <span className="font-medium">Name:</span> 
                    <input
                        type="text"
                        name="name"
                        value={cakeComponentForm.name.pt}
                        onChange={(e) => handleChangeText(e, 'pt')}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                    <input
                        type="text"
                        name="name"
                        value={cakeComponentForm.name.en}
                        onChange={(e) => handleChangeText(e, 'en')}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                </div>
            </div>

            {/* Cake Component Details */}
            <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8 space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Cake Component Details</h2>
                <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                    <label className="font-medium text-gray-700">Category:</label>
                    <select
                        value={cakeComponentForm.category}
                        onChange={(e) => setCakeComponentForm((prev) => ({ ...prev, category: e.target.value as CakeComponentCategory }))}
                        className="flex-1 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    >
                        <option value="">Select a category</option>
                        {Object.entries(cakeComponentCategories).map(([key, cat]) => (
                            <option key={key} value={key}>{cat[language]}</option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                    <label className="font-medium text-gray-700">Work Hours:</label>
                    <input
                        type="number"
                        name="workHours"
                        value={cakeComponentForm.workHours}
                        onChange={(e) => setCakeComponentForm((prev) => ({ ...prev, workHours: Number(e.target.value) }))}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                </div>
                <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                    <label className="font-medium text-gray-700">Electricity Hours:</label>
                    <input
                        type="number"
                        name="electricityHours"
                        value={cakeComponentForm.electricityHours}
                        onChange={(e) => setCakeComponentForm((prev) => ({ ...prev, electricityHours: Number(e.target.value) }))}
                        className="w-full rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                </div>
            </div>
                
            {/* Recipe */}
            <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recipe</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 py-2 text-left">Ingredient</th>
                                <th className="px-4 py-2 text-left">Amount</th>
                                <th className="px-4 py-2 text-center">Price / Unit</th>
                                <th className="px-4 py-2 text-center">Total Price</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {cakeComponentForm.recipe.map((item, index) => (
                                <tr key={item.ingredient._id} className="hover:bg-gray-50 relative">
                                    <td className="px-4 py-2 text-gray-800">{item.ingredient.name}</td>
                                    <td className="px-4 py-2 text-left flex items-center gap-2">
                                        <input
                                            type="number"
                                            value={item.amount}
                                            onChange={(e) => setCakeComponentForm((prev) => ({ ...prev, recipe: prev.recipe.map((r) => r.ingredient._id === item.ingredient._id ? { ...r, amount: Number(e.target.value) } : r) }))}
                                            className="w-20 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                                        />
                                        {item.ingredient.recipeUnits}
                                    </td>
                                    <td className="px-4 py-2 text-center">{item.ingredient.pricePerUnit.toFixed(3)} €</td>
                                    <td className="px-4 py-2 text-center font-medium text-gray-800">{(item.ingredient.pricePerUnit * item.amount).toFixed(3)} €</td>
                                    <td className="px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleDeleteIngredient(item.ingredient._id)}
                                            className="text-red-500 hover:text-red-700 cursor-pointer"
                                            title="Remove Additional Ingredient"
                                        >
                                            <TrashIcon size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleMoveIngredient('up', item.ingredient._id)}
                                            className="cursor-pointer disabled:opacity-25"
                                            title="Move Ingredient Up"
                                            disabled={index === 0}
                                        >
                                            <ArrowUpIcon size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleMoveIngredient('down', item.ingredient._id)}
                                            className="cursor-pointer disabled:opacity-25"
                                            title="Move Ingredient Down"
                                            disabled={index === cakeComponentForm.recipe.length - 1}
                                        >
                                            <ArrowDownIcon size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Add Ingredient */}
                <div className="flex gap-2 mt-4 justify-center">
                    <button
                        onClick={() => setIsAddingIngredient(true)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-indigo-700 cursor-pointer disabled:cursor-not-allowed flex items-center gap-1"
                    >
                        <PlusCircleIcon size={20} />
                        Ingredient
                    </button>
                </div>
            </div>

            {/* Actions */}
            <button
                onClick={handleSave}
                className="fixed bottom-8 right-24 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
                title="Save Cake Component"
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

            {/* Modals */}
            {isAddingIngredient && (
                <AddIngredientModal onClose={() => setIsAddingIngredient(false)} onConfirm={handleAddIngredient} />
            )}
        </div>
    )
}