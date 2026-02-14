import { useState } from "react";
import { sizes } from "../utils";
import { useStore, useAdminStore } from "../store";
import { XCircleIcon } from "@phosphor-icons/react";

type Props = {
    onClose: () => void;
    onConfirm: (id: string, size: "small" | "standard", quantity: number) => void;
};

export default function AddProductModal({ onClose, onConfirm }: Props) {
    const { products } = useAdminStore();
    const { language } = useStore();
    const productOptions = products.sort((a, b) => a.name[language].localeCompare(b.name[language]))
    const [newProductId, setNewProductId] = useState("");
    const [newProductSize, setNewProductSize] = useState<("small" | "standard")>("small");
    const [newProductQuantity, setNewProductQuantity] = useState(0);

    return (
        <div className="inset-0 fixed bg-black/50 flex items-center justify-center">
            <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8 relative">
                <h2 className="text-xl font-bold mb-4 text-center">Add Product</h2>
                <div className="flex flex-col gap-2 min-w-[300px]">
                    <label htmlFor="product" className="font-semibold">Product</label>
                    <select
                        value={newProductId}
                        onChange={(e) => setNewProductId(e.target.value)}
                        className="flex-1 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    >
                        <option value="">Select Product</option>
                        {productOptions.map((p) => (
                            <option key={p._id} value={p._id}>{p.name[language]}</option>
                        ))}
                    </select>

                    <label htmlFor="size" className="font-semibold">Size</label>
                    <select
                        value={newProductSize}
                        onChange={e => setNewProductSize(e.target.value as "small" | "standard")}
                        className="w-30 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    >
                        {Object.entries(sizes).map(([key, value]) => (
                            <option key={key} value={key}>
                                {value[language]}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="quantity" className="font-semibold">Quantity</label>
                    <input
                        type="number"
                        value={newProductQuantity}
                        onChange={(e) => setNewProductQuantity(Number(e.target.value))}
                        min={0}
                        max={99}
                        className="w-24 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />

                    <button
                        onClick={() => {onConfirm(newProductId, newProductSize, newProductQuantity); onClose()}}
                        disabled={newProductId === "" || newProductQuantity <= 0}
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