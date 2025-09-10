import { useState } from "react";
import type { CustomCake, Order } from "../../types";
import { getCustomCakePrice, getProductPrice } from "../../utils";
import { useStore } from "../../store";
import adminService from '../../services/admin.service';
import { TrashIcon, FloppyDiskIcon, XIcon } from "@phosphor-icons/react";

type Props = {
    order: Order;
    onClose: () => void;
};

export default function EditOrder({ order, onClose }: Props) {
    const { products, ingredients, orders, setOrders, language, cakeComponents } = useStore();
    const [orderForm, setOrderForm] = useState<Order>(order as Order);
    const [newProductId, setNewProductId] = useState("");
    const [newItemQuantity, setNewItemQuantity] = useState(0);
    const [newCustomCake, setNewCustomCake] = useState<CustomCake>({} as CustomCake);
    const [newCustomCakeQuantity, setNewCustomCakeQuantity] = useState(0);
    const [newIngredientId, setNewIngredientId] = useState("");
    const [newIngredientAmount, setNewIngredientAmount] = useState(0);
    const customCakeTitle = language === 'pt' ? 'Bolo Personalizado' : 'Custom Cake';
    const doughOptions = cakeComponents.filter(component => component.category === 'dough');
    const fillingOptions = cakeComponents.filter(component => component.category === 'filling');
    const frostingOptions = cakeComponents.filter(component => component.category === 'frosting');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        if (name.includes(".")) {
            setOrderForm((prev) => {
                const address_component = name.split(".")[1];
                return {...prev, ['shipping']: {...prev['shipping'], [address_component]: value }};
            });
            return;
        }
        setOrderForm(prev => ({ ...prev, [name]: value }));
    };

    function handleAddItem() {
        const product = products.find(product => product._id === newProductId)!;
        const price = getProductPrice(product)
        setOrderForm(prev => ({ ...prev, items: [...prev.items, { product: product, quantity: newItemQuantity, price: price }] }));
        setNewProductId(""); // Clear input
        setNewItemQuantity(0); // Clear amount
    };

    function handleAddCustomCake() {
        const price = getCustomCakePrice(newCustomCake);
        const label = `${newCustomCake.dough.name.en}, ${newCustomCake.filling.name.en}, ${newCustomCake.frosting.name.en}`
        setOrderForm(prev => ({ ...prev, items: [...prev.items, { customCake: { ...newCustomCake, label }, quantity: newCustomCakeQuantity, price: price }] }));
        setNewCustomCake({} as CustomCake); // Clear input
        setNewCustomCakeQuantity(0); // Clear amount
    }

    function handleDeleteItem(idOrLabel: string) {
        setOrderForm(prev => ({ ...prev, items: prev.items.filter(item => item.product?._id !== idOrLabel && item.customCake?.label !== idOrLabel) }));
    };

    function handleAddIngredient() {
        console.log(newIngredientId);
        const ingredient = ingredients.find(ingredient => ingredient._id === newIngredientId)!
        console.log(ingredient);
        setOrderForm((prev) => ({
            ...prev, additionalIngredients: [...prev.additionalIngredients, { ingredient, amount: newIngredientAmount }]
        }));
        setNewIngredientId(""); // Clear input
        setNewIngredientAmount(0); // Clear amount
    };
        
    function handleDeleteIngredient(ingredientId: string) {
        setOrderForm((prev) => ({
            ...prev,
            additionalIngredients: prev.additionalIngredients.filter(item => item.ingredient._id !== ingredientId)
        }));
    };

    async function handleSave() {
        try { 
            const updatedOrder = await adminService.updateOrder(orderForm);
            const updatedOrders = orders.map(order => order._id === updatedOrder._id ? updatedOrder : order);
            setOrders(updatedOrders); // Update the orders state with the new order
        } catch (error) {
            console.error("Error saving order:", error);
        }
        onClose(); // Close the modal after saving
    };

    return (
        <div className="pt-24 pb-12 px-6 lg:px-16 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
                {/* Customer Info */}
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                        <label className="font-medium text-gray-700">Customer:</label>
                        <input
                            type="text"
                            name="name"
                            value={orderForm.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="w-full rounded-md border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                        />
                    </div>
                    <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                        <label className="font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={orderForm.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                        />
                    </div>
                    <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                        <label className="font-medium text-gray-700">Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={orderForm.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="w-full rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                        />
                    </div>
                    <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                        <label className="font-medium text-gray-700">Delivery Date:</label>
                        <input
                            type="date"
                            name="deliveryDate"
                            value={orderForm.deliveryDate?.split("T")[0]}
                            onChange={handleChange}
                            className="w-full rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                        />
                    </div>
                </div>

                {/* Pickup Toggle */}
                <div className="flex items-center gap-2 mt-4">
                    <input
                        type="checkbox"
                        checked={orderForm.pickup}
                        onChange={(e) =>
                            setOrderForm({ ...orderForm, pickup: e.target.checked })
                        }
                        className="w-5 h-5 text-indigo-600 rounded"
                    />
                    <label className="text-gray-700">Pickup</label>
                </div>

                {/* Shipping */}
                {!orderForm.pickup &&
                <>
                    <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                        <label className="font-medium text-gray-700">City:</label>
                        <input
                            type="text"
                            name="shipping.city"
                            value={orderForm.shipping.city}
                            onChange={handleChange}
                            placeholder="City"
                            className="rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                        />
                    </div>
                    <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                        <label className="font-medium text-gray-700">Address:</label>
                        <input
                            type="text"
                            name="shipping.address"
                            value={orderForm.shipping.address}
                            onChange={handleChange}
                            placeholder="Address"
                            className="rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                        />
                    </div>
                    <div className="grid grid-cols-2 grid-cols-[1fr_3fr] gap-4">
                        <label className="font-medium text-gray-700">ZIP:</label>
                        <input
                            type="text"
                            name="shipping.zip"
                            value={orderForm.shipping.zip}
                            onChange={handleChange}
                            placeholder="ZIP Code"
                            className="rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                        />
                    </div>
                </>}
            </div>

            {/* Ordered Items */}
            <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Ordered Items</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 py-2 text-left">Product</th>
                                <th className="px-4 py-2 text-left">Note</th>
                                <th className="px-4 py-2 text-center">Quantity</th>
                                <th className="px-4 py-2 text-center">Price (each)</th>
                                <th className="px-4 py-2 text-center">Total</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orderForm.items.map((item) => (
                                <tr key={item.product?._id || item.customCake?.label} className="hover:bg-gray-50 relative">
                                    <td className="px-4 py-2 text-gray-800">
                                        {item.product?.name[language] || customCakeTitle}
                                        {item.customCake && (
                                            <div className='mt-1 text-xs text-gray-600 space-y-1 pl-2'>
                                                <p className='grid grid-cols-[1fr_3fr]'>
                                                    <span className='font-medium'>{language === 'pt' ? 'Massa' : 'Dough'}:</span> {item.customCake.dough.name[language]}
                                                </p>
                                                <p className='grid grid-cols-[1fr_3fr]'>
                                                    <span className='font-medium'>{language === 'pt' ? 'Recheio' : 'Filling'}:</span> {item.customCake.filling.name[language]}
                                                </p>
                                                <p className='grid grid-cols-[1fr_3fr]'>
                                                    <span className='font-medium'>{language === 'pt' ? 'Cobertura' : 'Frosting'}:</span> {item.customCake.frosting.name[language]}
                                                </p>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-gray-500">{item.note}</td>
                                    <td className="px-4 py-2 text-center">{item.quantity}</td>
                                    <td className="px-4 py-2 text-center">
                                        {item.price.toFixed(2)} €
                                        {item.customCake && (
                                            <div className='mt-1 text-xs text-gray-600 space-y-1'>
                                                <p>{getProductPrice(item.customCake.dough).toFixed(2)} €</p>
                                                <p>{getProductPrice(item.customCake.filling).toFixed(2)} €</p>
                                                <p>{getProductPrice(item.customCake.frosting).toFixed(2)} €</p>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-center font-medium text-gray-800">{(item.price * item.quantity).toFixed(2)} €</td>
                                    <td className="px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleDeleteItem(item.product?._id || item.customCake!.label)}
                                            className="text-red-500 hover:text-red-700 cursor-pointer"
                                            title="Remove Item"
                                        >
                                            <TrashIcon size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Add Product */}
                <div className="flex gap-2 mt-4">
                    <select
                        value={newProductId}
                        onChange={(e) => setNewProductId(e.target.value)}
                        className="flex-1 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    >
                        <option value="">Select a product</option>
                        {products.map((p) => (
                            <option key={p._id} value={p._id}>{p.name.pt}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={newItemQuantity}
                        onChange={(e) => setNewItemQuantity(Number(e.target.value))}
                        placeholder="Qty"
                        className="w-24 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                    <button
                        onClick={handleAddItem}
                        disabled={newProductId === "" || newItemQuantity <= 0}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-indigo-700 cursor-pointer disabled:cursor-not-allowed"
                    >
                        Add
                    </button>
                </div>

                {/* Add Custom Cake */}
                <div className="flex gap-2 mt-4">
                    <select
                        value={newCustomCake.dough?._id}
                        onChange={(e) => setNewCustomCake(prev => ({ ...prev, dough: doughOptions.find(d => d._id === e.target.value)! }))}
                        className="flex-1 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    >
                        <option value="">Select a dough</option>
                        {doughOptions.map((d) => (
                            <option key={d._id} value={d._id}>{d.name.pt}</option>
                        ))}
                    </select>
                    <select
                        value={newCustomCake.filling?._id}
                        onChange={(e) => setNewCustomCake(prev => ({ ...prev, filling: fillingOptions.find(f => f._id === e.target.value)! }))}
                        className="flex-1 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    >
                        <option value="">Select a filling</option>
                        {fillingOptions.map((f) => (
                            <option key={f._id} value={f._id}>{f.name.pt}</option>
                        ))}
                    </select>
                    <select
                        value={newCustomCake.frosting?._id}
                        onChange={(e) => setNewCustomCake(prev => ({ ...prev, frosting: frostingOptions.find(f => f._id === e.target.value)! }))}
                        className="flex-1 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    >
                        <option value="">Select a frosting</option>
                        {frostingOptions.map((f) => (
                            <option key={f._id} value={f._id}>{f.name.pt}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={newCustomCakeQuantity}
                        onChange={(e) => setNewCustomCakeQuantity(Number(e.target.value))}
                        placeholder="Qty"
                        className="w-24 rounded-lg border-1 border-gray-500 focus:ring-indigo-500 focus:border-indigo-500 p-1"
                    />
                    <button
                        onClick={handleAddCustomCake}
                        disabled={!newCustomCake.dough || !newCustomCake.filling || !newCustomCake.frosting || newCustomCakeQuantity <= 0}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300 hover:bg-indigo-700 cursor-pointer disabled:cursor-not-allowed"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Additional Ingredients */}
            <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Ingredients</h2>
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
                            {orderForm.additionalIngredients.map((item) => (
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

            {/* Actions */}
            <button
                onClick={handleSave}
                className="fixed bottom-8 right-24 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
                title="Save Order"
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