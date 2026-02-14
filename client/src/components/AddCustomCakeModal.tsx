import { useState } from "react";
import { sizes } from "../utils";
import { useStore, useAdminStore } from "../store";
import { XCircleIcon } from "@phosphor-icons/react";
import type { CustomCake } from "../types";

type Props = {
    onClose: () => void;
    onConfirm: (customCake: CustomCake, size: "small" | "standard", quantity: number) => void;
};

export default function AddCustomCakeModal({ onClose, onConfirm }: Props) {
    const { cakeComponents } = useAdminStore();
    const { language } = useStore();
    const doughOptions = cakeComponents.filter(component => component.category === 'dough').sort((a, b) => a.name[language].localeCompare(b.name[language]));
    const fillingOptions = cakeComponents.filter(component => component.category === 'filling').sort((a, b) => a.name[language].localeCompare(b.name[language]));
    const frostingOptions = cakeComponents.filter(component => component.category === 'frosting').sort((a, b) => a.name[language].localeCompare(b.name[language]));
    const toppingOptions = cakeComponents.filter(component => component.category === 'topping').sort((a, b) => a.name[language].localeCompare(b.name[language]));
    const [newCustomCake, setNewCustomCake] = useState<CustomCake>({} as CustomCake);
    const [newCustomCakeSize, setNewCustomCakeSize] = useState<"small" | "standard">("small");
    const [newCustomCakeQuantity, setNewCustomCakeQuantity] = useState(0);

    return (
        <div className="inset-0 fixed bg-black/50 flex items-center justify-center">
            <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8 relative">
                <h2 className="text-xl font-bold mb-4 text-center">Add Custom Cake</h2>
                <div className="flex flex-col gap-2 min-w-[300px]">
                    <label htmlFor="dough" className="font-semibold">Dough</label>
                    <select
                        value={newCustomCake.dough?._id}
                        onChange={(e) => setNewCustomCake(prev => ({ ...prev, dough: doughOptions.find(d => d._id === e.target.value)! }))}
                        className="flex-1 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    >
                        <option value="">Select Dough</option>
                        {doughOptions.map((d) => (
                            <option key={d._id} value={d._id}>{d.name[language]}</option>
                        ))}
                    </select>

                    <label htmlFor="filling" className="font-semibold">Filling</label>
                    <select
                        value={newCustomCake.filling?._id}
                        onChange={(e) => setNewCustomCake(prev => ({ ...prev, filling: fillingOptions.find(f => f._id === e.target.value)! }))}
                        className="flex-1 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    >
                        <option value="">Select Filling</option>
                        {fillingOptions.map((f) => (
                            <option key={f._id} value={f._id}>{f.name[language]}</option>
                        ))}
                    </select>

                    <label htmlFor="frosting" className="font-semibold">Frosting</label>
                    <select
                        value={newCustomCake.frosting?._id}
                        onChange={(e) => setNewCustomCake(prev => ({ ...prev, frosting: frostingOptions.find(f => f._id === e.target.value)! }))}
                        className="flex-1 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    >
                        <option value="">Select Frosting</option>
                        {frostingOptions.map((f) => (
                            <option key={f._id} value={f._id}>{f.name[language]}</option>
                        ))}
                    </select>

                    <label htmlFor="topping" className="font-semibold">Topping</label>
                    <select
                        value={newCustomCake.topping?._id}
                        onChange={(e) => setNewCustomCake(prev => ({ ...prev, topping: toppingOptions.find(t => t._id === e.target.value)! }))}
                        className="flex-1 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    >
                        <option value="">Select Topping</option>
                        {toppingOptions.map((t) => (
                            <option key={t._id} value={t._id}>{t.name[language]}</option>
                        ))}
                    </select>

                    <label htmlFor="size" className="font-semibold">Size</label>
                    <select
                        value={newCustomCakeSize}
                        onChange={e => setNewCustomCakeSize(e.target.value as "small" | "standard")}
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
                        value={newCustomCakeQuantity}
                        onChange={(e) => setNewCustomCakeQuantity(Number(e.target.value))}
                        min={0}
                        max={99}
                        className="w-24 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />

                    <button
                        onClick={() => {onConfirm(newCustomCake, newCustomCakeSize, newCustomCakeQuantity); onClose()}}
                        disabled={!newCustomCake.dough || !newCustomCake.filling || !newCustomCake.frosting || newCustomCakeQuantity <= 0}
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