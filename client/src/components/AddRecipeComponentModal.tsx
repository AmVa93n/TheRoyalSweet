import { useState } from "react";
import { XCircleIcon } from "@phosphor-icons/react";

type Props = {
    onClose: () => void;
    onConfirm: (name: string, multiplier: number) => void;
};

export default function AddRecipeComponentModal({ onClose, onConfirm }: Props) {
    const [componentName, setComponentName] = useState("");
    const [componentMultiplier, setComponentMultiplier] = useState(0);

    return (
        <div className="inset-0 fixed bg-black/50 flex items-center justify-center">
            <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8 relative">
                <h2 className="text-xl font-bold mb-4 text-center">Add Recipe Component</h2>
                <div className="flex flex-col gap-2 min-w-[300px]">
                    <label className="font-semibold">Component Name:</label>
                    <input
                        type="text"
                        value={componentName}
                        onChange={(e) => setComponentName(e.target.value)}
                        placeholder="Filling, Frosting, etc."
                        className="w-full rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />

                    <label className="font-semibold">Multiplier for big size:</label>
                    <input
                        type="number"
                        value={componentMultiplier}
                        onChange={(e) => setComponentMultiplier(Number(e.target.value))}
                        className="w-28 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />

                    <button
                        onClick={() => {onConfirm(componentName, componentMultiplier); onClose()}}
                        disabled={componentName === "" || componentMultiplier <= 0}
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