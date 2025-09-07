import { useState } from 'react';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import type { CustomCake } from '../types';
import { calculatePrice, getCustomCakePrice, imagePlaceholder } from '../utils';
import { PlusIcon, MinusIcon } from '@phosphor-icons/react';

function CustomCakePage() {
    const { cakeComponents, setIsCartOpen, language, cart, setCart } = useStore();
    const doughOptions = cakeComponents.filter(component => component.category === 'dough');
    const fillingOptions = cakeComponents.filter(component => component.category === 'filling');
    const frostingOptions = cakeComponents.filter(component => component.category === 'frosting');
    const [customCake, setCustomCake] = useState<CustomCake>({
        dough: doughOptions[0],
        filling: fillingOptions[0],
        frosting: frostingOptions[0]
    });
    const [quantity, setQuantity] = useState(1)
    const [note, setNote] = useState('')
    const navigate = useNavigate()

    function addCustomCake() {
        const existingCustomCake = cart.find(item => {
            if (!item.customCake) return
            const { dough, filling, frosting } = item.customCake
            return dough._id === customCake.dough._id && filling._id === customCake.filling._id && frosting._id === customCake.frosting._id
        })?.customCake
        if (existingCustomCake) {
            // If a custom cake with the same components is already in the cart, increase its quantity
            const updatedCart = cart.map(item => 
                item.customCake === existingCustomCake ? {...item, quantity: item.quantity + quantity, note} : item
            );
            setCart(updatedCart);
        } else {
            // If a custom cake with the same components is not in cart, add it
            const price = getCustomCakePrice(customCake)
            const updatedCart = [...cart, {customCake, quantity, price, note}]
            setCart(updatedCart)
        }
        setIsCartOpen(true) // Open cart after adding product
    }
    
    return (
        <div className="pt-24 px-4 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image and Description */}
                <div>
                    <div className="text-center mb-4">
                        <img
                            src={imagePlaceholder}
                            alt={'Custom Cake'}
                            className="w-full max-h-[400px] object-cover"
                        />
                    </div>
                </div>

                {/* Order Info */}
                <div>
                    <h2 className="text-3xl font-semibold mb-4">{language === 'en' ? 'Custom Cake' : 'Bolo Personalizado'}</h2>

                    <div className="flex flex-col">
                        <p className="text-2xl font-semibold mb-4">
                            {getCustomCakePrice(customCake).toFixed(2).replace('.', ',')} €
                        </p>

                        {/* Components */}
                        <div className="mb-6">
                            <label className="block mb-1 font-semibold">{language === 'en' ? 'Dough' : 'Massa'}</label>
                            <select
                                value={customCake.dough._id}
                                onChange={e => setCustomCake(cake => ({...cake, dough: doughOptions.find(c => c._id === e.target.value)!}))}
                                className="w-full p-2 rounded bg-white border"
                            >
                                {doughOptions.map(component => (
                                    <option key={component._id} value={component._id}>
                                        {component.name[language]} ({calculatePrice(component).price.toFixed(2).replace('.', ',')} €)
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block mb-1 font-semibold">{language === 'en' ? 'Filling' : 'Recheio'}</label>
                            <select
                                value={customCake.filling._id}
                                onChange={e => setCustomCake(cake => ({...cake, filling: fillingOptions.find(c => c._id === e.target.value)!}))}
                                className="w-full p-2 rounded bg-white border"
                            >
                                {fillingOptions.map(component => (
                                    <option key={component._id} value={component._id}>
                                        {component.name[language]} ({calculatePrice(component).price.toFixed(2).replace('.', ',')} €)
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block mb-1 font-semibold">{language === 'en' ? 'Frosting' : 'Cobertura'}</label>
                            <select
                                value={customCake.frosting._id}
                                onChange={e => setCustomCake(cake => ({...cake, frosting: frostingOptions.find(c => c._id === e.target.value)!}))}
                                className="w-full p-2 rounded bg-white border"
                            >
                                {frostingOptions.map(component => (
                                    <option key={component._id} value={component._id}>
                                        {component.name[language]} ({calculatePrice(component).price.toFixed(2).replace('.', ',')} €)
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Quantity */}
                        <div className="mb-6 relative">
                            <label className="block mb-1 font-semibold">{language === 'en' ? 'Quantity' : 'Quantidade'}</label>
                            <div className="relative w-30">
                                <input
                                    type="number"
                                    min={1}
                                    max={99}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="text-center w-full p-2 rounded bg-white border appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                                />
                                <button
                                    onClick={() => setQuantity(q => Math.min(q + 1, 99))}
                                    className="p-1 rounded-full hover:bg-gray-100 transition absolute right-1 top-[50%] translate-y-[-50%] cursor-pointer"
                                >
                                    <PlusIcon size={20} />
                                </button>
                                <button
                                    onClick={() => setQuantity(q => Math.max(q - 1, 1))}
                                    className="p-1 rounded-full hover:bg-gray-100 transition absolute left-1 top-[50%] translate-y-[-50%] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={quantity === 1}
                                >
                                    <MinusIcon size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="mb-6 relative">
                            <label className="block mb-1 font-semibold">{language === 'en' ? 'Notes' : 'Notas'}</label>
                            <textarea
                                maxLength={300}
                                placeholder={language === 'en' ? 'Leave your suggestion, and we will do our best to accommodate it.' : 'Deixe a sua sugestão e faremos o possível para a concretizar.'}
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full p-2 rounded bg-white border appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                            />
                            <span className="absolute right-3 bottom-3 text-xs text-gray-500">
                                {note.length}/300
                            </span>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={addCustomCake}
                            className="w-full block mx-auto text-center bg-transparent text-[#593b3e] font-bold py-2 px-4 rounded-full border border-[#593b3e] hover:bg-[#593b3e] hover:text-white transition hover:cursor-pointer"
                        >
                            {language === 'en' ? 'Add to Cart' : 'Adicionar ao carrinho'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Buttons */}
            <div className="my-8 w-full md:w-[35%] mx-auto flex flex-col sm:flex-row justify-between gap-4">
                <button
                    onClick={() => navigate('/shop')}
                    className="block mx-auto text-center bg-transparent text-[#593b3e] font-bold py-2 px-4 rounded-full border border-[#593b3e] hover:bg-[#593b3e] hover:text-white transition hover:cursor-pointer"
                    >
                {language === 'en' ? 'Continue Shopping' : 'Continuar a comprar'}
                </button>
                <button
                    onClick={() => navigate('/checkout')}
                    className="block mx-auto text-center bg-transparent text-[#593b3e] font-bold py-2 px-4 rounded-full border border-[#593b3e] hover:bg-[#593b3e] hover:text-white transition hover:cursor-pointer"
                    >
                {language === 'en' ? 'Proceed to Checkout' : 'Aceder ao checkout'}
                </button>
            </div>
        </div>
    );
}

export default CustomCakePage;