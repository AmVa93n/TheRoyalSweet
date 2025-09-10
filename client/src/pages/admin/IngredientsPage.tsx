import { useEffect } from "react";
import adminService from '../../services/admin.service'
import type { Ingredient } from "../../types";
import { useStore } from "../../store";
import { PlusIcon, SortAscendingIcon, SortDescendingIcon } from '@phosphor-icons/react';
import { useNavigate } from "react-router-dom";

function IngredientsPage() {
    const { ingredients, setIngredients, sortPreferences, setSortPreferences } = useStore()
    const { criteria: sortCriteria, direction: sortDirection } = sortPreferences.ingredients;
    const navigate = useNavigate();

    useEffect(() => {
        adminService.getIngredients().then(setIngredients);
    }, []);

    async function handleCreateIngredient() {
        const newIngredient = await adminService.createIngredient();
        const updatedIngredients = [...ingredients, newIngredient];
        setIngredients(updatedIngredients); // Add the new ingredient to the list
        navigate(`/admin/ingredients/${newIngredient._id}`, { state: { new: true } }); // Navigate to the new ingredient's page
    };

    function sortFunction(a: Ingredient, b: Ingredient) {
        switch (sortCriteria) {
            case 'name':
            case 'brand':
            case 'recipeUnits':
            case 'packageUnits':
                return sortDirection === 'asc' ? a[sortCriteria].localeCompare(b[sortCriteria]) : b[sortCriteria].localeCompare(a[sortCriteria]);
            case 'pricePerUnit':
            case 'price':
            case 'unitsPerPackage':
                return sortDirection === 'asc' ? a[sortCriteria] - b[sortCriteria] : b[sortCriteria] - a[sortCriteria];
            case 'supermarkets': {
                const supermarketA = a.supermarkets.sort((a, b) => b.localeCompare(a))[0];
                const supermarketB = b.supermarkets.sort((a, b) => b.localeCompare(a))[0];
                return sortDirection === 'asc' ? supermarketA.localeCompare(supermarketB) : supermarketB.localeCompare(supermarketA);
            }
            default:
                return 0;
        }
    }

    return (
        <div className="pt-20 pb-10 min-h-screen">
            <div className="max-w-7xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8">
            
                {/* Sort Options */}
                <div className="flex items-center justify-center mb-6">
                    <p className='mr-4 text-lg font-medium text-gray-700'>Sort by:</p>
        
                    <select
                        className='rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1'
                        value={sortCriteria}
                        onChange={(e) => setSortPreferences('ingredients', { criteria: e.target.value, direction: sortDirection })}
                    >
                        <option value="name">Name</option>
                        <option value="supermarket">Supermarkets</option>
                        <option value="brand">Brand</option>
                        <option value="recipeUnits">Recipe Units</option>
                        <option value="pricePerUnit">Price / Unit</option>
                        <option value="price">Price</option>
                        <option value="unitsPerPackage">Units / Package</option>
                        <option value="packageUnits">Package Units</option>
                    </select>
                    
                    <button 
                        onClick={() => setSortPreferences('ingredients', { criteria: sortCriteria, direction: sortDirection === 'asc' ? 'desc' : 'asc' })} 
                        className="ml-2 cursor-pointer"
                        title={sortDirection === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
                    >
                        {sortDirection === 'desc' ? <SortDescendingIcon size={24} /> : <SortAscendingIcon size={24} />}
                    </button>
                </div>
        
                {/* Ingredients List */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Supermarkets</th>
                                <th className="px-4 py-2 text-left">Brand</th>
                                <th className="px-4 py-2 text-center">Recipe Units</th>
                                <th className="px-4 py-2 text-center">Price / Unit</th>
                                <th className="px-4 py-2 text-center">Price</th>
                                <th className="px-4 py-2 text-center">Units / Package</th>
                                <th className="px-4 py-2 text-center">Package Units</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {ingredients.sort(sortFunction).map((ingredient) => (
                            <tr key={ingredient._id} className="hover:bg-gray-100 cursor-pointer" onClick={() => navigate(`/admin/ingredients/${ingredient._id}`)}>
                                <td className="px-4 py-2 text-gray-800">{ingredient.name}</td>
                                <td className="px-4 py-2 text-gray-800">{ingredient.supermarkets.join(", ")}</td>
                                <td className="px-4 py-2 text-gray-800">{ingredient.brand}</td>
                                <td className="px-4 py-2 text-center">{ingredient.recipeUnits}</td>
                                <td className="px-4 py-2 text-center">{ingredient.pricePerUnit} €</td>
                                <td className="px-4 py-2 text-center">{ingredient.price} €</td>
                                <td className="px-4 py-2 text-center">{ingredient.unitsPerPackage}</td>
                                <td className="px-4 py-2 text-center">{ingredient.packageUnits}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        
            {/* Floating Add Button */}
            <button
                onClick={handleCreateIngredient}
                className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
                title="Create Ingredient"
            >
                <PlusIcon size={24} />
            </button>
        </div>
    )
}

export default IngredientsPage