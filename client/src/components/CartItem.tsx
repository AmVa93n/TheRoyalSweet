import type { CartItem as CartItemType } from "../types";
import { PlusIcon, MinusIcon, TrashIcon } from '@phosphor-icons/react';
import { useStore } from "../store";
import { imagePlaceholder } from "../utils";

type Props = {
    item: CartItemType;
}

function CartItem({ item }: Props) {
    const { language, cart, setCart } = useStore()
    const { product, customCake, quantity, price } = item;

    function removeItem() {
        const updatedCart = cart.filter(item => item.product?._id !== product?._id || item.customCake?.label !== customCake?.label)
        setCart(updatedCart)
    }

    function changeQuantity(newQuantity: number) {
        if (newQuantity < 1 || newQuantity > 99) return
        const updatedCart = cart.map(item => item.product?._id === product?._id || item.customCake?.label === customCake?.label ? {...item, quantity: newQuantity} : item)
        setCart(updatedCart)
    }

    return (
        <div className="relative flex items-start gap-3">
            {/* Image */}
            <img
                src={product?.images[0] || imagePlaceholder}
                alt={product?.name[language] || 'Custom Cake'}
                className="w-20 h-20 object-cover"
            />

            {/* Details */}
            <div className="flex-1 flex flex-col">
                <span className="font-semibold">{product?.name[language] || (language === 'en' ? 'Custom Cake' : 'Bolo Personalizado')}</span>
                <span className='text-sm'>
                    {price.toFixed(2).replace('.', ',')} €
                </span>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 justify-between mt-2">
                    <div className="relative w-20">
                        <input
                            type="number"
                            min={1}
                            max={99}
                            value={quantity}
                            onChange={(e) => changeQuantity(Number(e.target.value))}
                            className="text-center w-full p-1 rounded bg-white border appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <button
                            onClick={() => changeQuantity(quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-100 transition absolute right-1 top-[50%] translate-y-[-50%] cursor-pointer"
                        >
                            <PlusIcon size={18} />
                        </button>
                        <button
                            onClick={() => changeQuantity(Math.max(quantity - 1, 1))}
                            className="p-1 rounded-full hover:bg-gray-100 transition absolute left-1 top-[50%] translate-y-[-50%] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={quantity === 1}
                        >
                            <MinusIcon size={18} />
                        </button>
                    </div>
                    <span>
                        {(price * quantity).toFixed(2).replace('.', ',')} €
                    </span>
                </div>
            </div>

            {/* Remove Button */}
            <button
                onClick={() => removeItem()}
                className="absolute top-0 right-0 p-1 text-gray-500 hover:text-red-600 transition cursor-pointer"
            >
                <TrashIcon size={20} />
            </button>
        </div>
    );
}

export default CartItem;