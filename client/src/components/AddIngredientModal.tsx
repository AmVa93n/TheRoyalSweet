import { useState } from "react";
import { useAdminStore } from "../store";
import { XCircleIcon } from "@phosphor-icons/react";

type Props = {
    onClose: () => void;
    onConfirm: (id: string, amount: number, component?: string) => void;
    recipeComponents?: { name: string, multiplier: number }[];
};

export default function AddIngredientModal({ onClose, onConfirm, recipeComponents }: Props) {
    const { ingredients } = useAdminStore();
    const ingredientOptions = ingredients.sort((a, b) => a.name.localeCompare(b.name))
    const componentOptions = recipeComponents?.map(rc => rc.name) || [];
    const [newIngredientId, setNewIngredientId] = useState("");
    const [newIngredientAmount, setNewIngredientAmount] = useState(0);
    const [newIngredientComponent, setNewIngredientComponent] = useState("");

    return (
        <div className="inset-0 fixed bg-black/50 flex items-center justify-center">
            <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8 relative">
                <h2 className="text-xl font-bold mb-4 text-center">Add Ingredient</h2>
                <div className="flex flex-col gap-2 min-w-[300px]">
                    <label className="font-semibold">Ingredient:</label>
                    <select
                        value={newIngredientId}
                        onChange={(e) => setNewIngredientId(e.target.value)}
                        className="flex-1 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    >
                        <option value="">Select an ingredient</option>
                        {ingredientOptions.map((ing) => (
                            <option key={ing._id} value={ing._id}>{ing.name}</option>
                        ))}
                    </select>

                    <label className="font-semibold">Amount:</label>
                    <input
                        type="number"
                        value={newIngredientAmount}
                        onChange={(e) => setNewIngredientAmount(Number(e.target.value))}
                        placeholder="Amount"
                        className="w-28 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />

                    {componentOptions.length > 0 && (
                    <>
                        <label className="font-semibold">Component:</label>
                        <select
                            value={newIngredientComponent}
                            onChange={(e) => setNewIngredientComponent(e.target.value)}
                            className="flex-1 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                        >
                            <option value="">Select a component</option>
                            {componentOptions.map((comp) => (
                                <option key={comp} value={comp}>{comp}</option>
                            ))}
                        </select>
                    </>
                    )}

                    <button
                        onClick={() => {onConfirm(newIngredientId, newIngredientAmount, newIngredientComponent); onClose()}}
                        disabled={newIngredientId === "" || newIngredientAmount <= 0}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-indigo-700 cursor-pointer disabled:cursor-not-allowed mt-4"
                    >
                        Confirm
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                    <XCircleIcon className="w-8 h-8" />
                </button>
            </div>
        </div>
    )
}