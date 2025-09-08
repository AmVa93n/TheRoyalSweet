import { useState } from "react";
import type { Ingredient, Product, ProductCategory } from "../../types";
import { useStore } from "../../store";
import adminService from '../../services/admin.service'
import { TrashIcon, FloppyDiskIcon, XIcon, ArrowUpIcon, ArrowDownIcon } from "@phosphor-icons/react";
import { productCategories } from "../../utils";

type Props = {
    product?: Product;
    onClose: () => void;
};

export default function EditProduct({ product, onClose }: Props) {
    const { ingredients, products, setProducts, language } = useStore();
    const [productForm, setProductForm] = useState(product as Product);
    const [newIngredientId, setNewIngredientId] = useState("");
    const [newIngredientAmount, setNewIngredientAmount] = useState(0);
    const [newImageUrl, setNewImageUrl] = useState("");
    type textKey = 'name' | 'description' | 'intro' | 'serve' | 'store'

    function handleChangeText(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, language: 'pt' | 'en') {
        const { name, value } = e.target;
        setProductForm((prev) => {
            return { ...prev, [name]: { ...prev[name as textKey], [language]: value } };
        });
    };

    function handleAddIngredient() {
        setProductForm((prev) => ({
            ...prev,
            recipe: [
                ...prev.recipe,
                {
                    ingredient: ingredients.find(ingredient => ingredient._id === newIngredientId) as Ingredient,
                    amount: newIngredientAmount
                }
            ]
        }));
        setNewIngredientId(""); // Clear input
        setNewIngredientAmount(0); // Clear amount
    };

    function handleAddImage() {
        setProductForm((prev) => ({ ...prev, images: [...prev.images, newImageUrl] }));
        setNewImageUrl(""); // Clear input
    };
    
    function handleDeleteIngredient(ingredientId: string) {
        setProductForm((prev) => ({
            ...prev,
            recipe: prev.recipe.filter(item => item.ingredient._id !== ingredientId)
        }));
    };

    function handleDeleteImage(index: number) {
        setProductForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };

    function handleMoveIngredient(direction: 'up' | 'down', ingredientId: string) {
        setProductForm((prev) => {
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

    function handleChangeImage(index: number, newUrl: string) {
        setProductForm((prev) => ({ ...prev, images: prev.images.map((url, i) => i === index ? newUrl : url) }));
    };

    async function handleSave() {
        try {
            const updatedProduct = await adminService.updateProduct(productForm);
            const updatedProducts = products.map((product) => product._id === updatedProduct._id ? updatedProduct : product);
            setProducts(updatedProducts);
        } catch (error) {
            console.error("Failed to save product:", error);
        }
        onClose(); // Close the modal after saving
    };

    return (
        <div className="pt-24 pb-12 px-6 lg:px-16 min-h-screen">

            {/* Product Text */}
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Product Text</h2>
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
                        value={productForm.name.pt}
                        onChange={(e) => handleChangeText(e, 'pt')}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                    <input
                        type="text"
                        name="name"
                        value={productForm.name.en}
                        onChange={(e) => handleChangeText(e, 'en')}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                </div>
                <div className="text-gray-600 grid grid-cols-3 grid-cols-[150px_1fr_1fr] gap-2">
                    <span className="font-medium">Intro:</span> 
                    <textarea
                        name="intro"
                        value={productForm.intro.pt}
                        onChange={(e) => handleChangeText(e, 'pt')}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1 h-30"
                    />
                    <textarea
                        name="intro"
                        value={productForm.intro.en}
                        onChange={(e) => handleChangeText(e, 'en')}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1 h-30"
                    />
                </div>
                <div className="text-gray-600 grid grid-cols-3 grid-cols-[150px_1fr_1fr] gap-2">
                    <span className="font-medium">Description:</span> 
                    <textarea
                        name="description"
                        value={productForm.description.pt}
                        onChange={(e) => handleChangeText(e, 'pt')}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1 h-30"
                    />
                    <textarea
                        name="description"
                        value={productForm.description.en}
                        onChange={(e) => handleChangeText(e, 'en')}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1 h-30"
                    />
                </div>
                <div className="text-gray-600 grid grid-cols-3 grid-cols-[150px_1fr_1fr] gap-2">
                    <span className="font-medium">Serve:</span> 
                    <input
                        type="text"
                        name="serve"
                        value={productForm.serve.pt}
                        onChange={(e) => handleChangeText(e, 'pt')}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                    <input
                        type="text"
                        name="serve"
                        value={productForm.serve.en}
                        onChange={(e) => handleChangeText(e, 'en')}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                </div>
                <div className="text-gray-600 grid grid-cols-3 grid-cols-[150px_1fr_1fr] gap-2">
                    <span className="font-medium">Store:</span> 
                    <input
                        type="text"
                        name="store"
                        value={productForm.store.pt}
                        onChange={(e) => handleChangeText(e, 'pt')}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                    <input
                        type="text"
                        name="store"
                        value={productForm.store.en}
                        onChange={(e) => handleChangeText(e, 'en')}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                </div>
            </div>

            {/* Product Details */}
            <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8 space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Product Details</h2>
                <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                    <label className="font-medium text-gray-700">Category:</label>
                    <select
                        value={productForm.category}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, category: e.target.value as ProductCategory }))}
                        className="flex-1 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    >
                        <option value="">Select a category</option>
                        {Object.entries(productCategories).map(([key, cat]) => (
                            <option key={key} value={key}>{cat[language]}</option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                    <label className="font-medium text-gray-700">Work Hours:</label>
                    <input
                        type="number"
                        name="workHours"
                        value={productForm.workHours}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, workHours: Number(e.target.value) }))}
                        className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                </div>
                <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                    <label className="font-medium text-gray-700">Electricity Hours:</label>
                    <input
                        type="number"
                        name="electricityHours"
                        value={productForm.electricityHours}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, electricityHours: Number(e.target.value) }))}
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
                                <th className="px-4 py-2 text-center">Amount</th>
                                <th className="px-4 py-2 text-center">Price / Unit</th>
                                <th className="px-4 py-2 text-center">Total Price</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {productForm.recipe.map((item, index) => (
                                <tr key={item.ingredient._id} className="hover:bg-gray-50 relative">
                                    <td className="px-4 py-2 text-gray-800">{item.ingredient.name}</td>
                                    <td className="px-4 py-2 text-center">{item.amount} {item.ingredient.recipeUnits}</td>
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
                                            disabled={index === productForm.recipe.length - 1}
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
                <div className="flex gap-2 mt-4">
                    <select
                        value={newIngredientId}
                        onChange={(e) => setNewIngredientId(e.target.value)}
                        className="flex-1 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    >
                        <option value="">Select an ingredient</option>
                        {ingredients.map((ing) => (
                            <option key={ing._id} value={ing._id}>{ing.name}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={newIngredientAmount}
                        onChange={(e) => setNewIngredientAmount(Number(e.target.value))}
                        placeholder="Amount"
                        className="w-28 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                    <button
                        onClick={handleAddIngredient}
                        disabled={newIngredientId === "" || newIngredientAmount <= 0}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-indigo-700 cursor-pointer disabled:cursor-not-allowed"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Images */}
            <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Images</h2>
                <div className="flex flex-col gap-4 mb-4">
                    {productForm.images.map((img, index) => (
                        <div className="grid grid-cols-[auto_1fr_auto] gap-4">
                            <img src={img} className="w-12 h-12 object-cover rounded-md" />
                            <input 
                                value={img} 
                                onChange={(e)=> handleChangeImage(index, e.target.value)}
                                className="w-full h-auto rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                            />
                            <button
                                onClick={() => handleDeleteImage(index)}
                                className="text-red-500 hover:text-red-700 cursor-pointer"
                                title="Remove Image"
                            >
                                <TrashIcon size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Add Image */}
                <div className="flex gap-2 mt-4">
                    <input
                        type="text"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="Image URL"
                        className="w-full rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                    <button
                        onClick={handleAddImage}
                        disabled={newImageUrl === ""}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-indigo-700 cursor-pointer disabled:cursor-not-allowed"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Actions */}
            <button
                onClick={handleSave}
                className="fixed bottom-8 right-24 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
                title="Save Product"
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