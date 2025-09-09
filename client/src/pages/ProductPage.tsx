import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import { getProductPrice } from '../utils';
import { PlusIcon, MinusIcon } from '@phosphor-icons/react';

function ProductPage() {
    const { productId } = useParams();
    const { products, setIsCartOpen, language, cart, setCart } = useStore();
    const product = products.find((product: Product) => product._id === productId)!;
    const [quantity, setQuantity] = useState(1)
    const [note, setNote] = useState('')
    const navigate = useNavigate()

    function addProduct() {
        if (cart.some(item => item.product?._id === product._id)) {
            // If product already exists in cart, just update the quantity
            const updatedCart = cart.map(item => 
                item.product?._id === product._id ? {...item, quantity: item.quantity + quantity, note} : item
            );
            setCart(updatedCart);
        } else {
            // If product is not in cart, add it
            const price = getProductPrice(product)
            const updatedCart = [...cart, {product, quantity, price, note}]
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
                            src={product.images?.[0]}
                            alt={product._id}
                            className="w-full max-h-[400px] object-cover"
                        />
                    </div>

                    <p className="mb-4 font-bold">{product.intro?.[language]}</p>
                    <p className="mb-4">
                        <b>{language === 'en' ? 'Description' : 'Descrição'}:</b> {product.description?.[language]}
                    </p>
                    <p className="mb-4">
                        <b>{language === 'en' ? 'Serve' : 'Servir'}:</b> {product.serve?.[language]}
                    </p>
                    <p className="mb-4">
                        <b>{language === 'en' ? 'Store' : 'Conservar'}:</b> {product.store?.[language]}
                    </p>
                </div>

                {/* Order Info */}
                <div>
                    <h2 className="text-3xl font-semibold mb-4">{product.name?.[language]}</h2>

                    <div className="flex flex-col">
                        <p className="text-2xl font-semibold mb-4">
                            {getProductPrice(product).toFixed(2).replace('.', ',')} €
                        </p>

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
                            onClick={addProduct}
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

export default ProductPage;