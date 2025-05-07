import { createContext, useState } from 'react';
import type { CartItem, Product, Size } from '../types';
import { calculatePrice } from '../utils';

const CartContext = createContext({} as CartContextType);

type CartContextType = {
    cart: CartItem[],
    addProduct: (product: Product, size: Size, quantity: number) => void,
    removeProduct: (id: string) => void,
    changeQuantity: (id: string, newQuantity: number) => void,
    isDrawerOpen: boolean,
    setIsDrawerOpen: (isOpen: boolean) => void
};

function CartProvider({ children }: React.PropsWithChildren) {
    const [cart, setCart] = useState([] as CartItem[]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    function addProduct(product: Product, size: Size, quantity: number) {
        if (cart.some(item => item.product._id === product._id)) return // can't add two items with same product
        const { price } = calculatePrice(product)
        setCart(prev => [...prev, {product, size, quantity, price}])
    }

    function removeProduct(id: string) {
        setCart(prev => prev.filter(item => item.product._id !== id))
    }

    function changeQuantity(id: string, newQuantity: number) {
        if (newQuantity < 1 || newQuantity > 99) return
        setCart(prev => prev.map(item => item.product._id === id ? {...item, quantity: newQuantity} : item))
    }

    return (
        <CartContext.Provider value={{
            cart,
            addProduct,
            removeProduct,
            changeQuantity,
            isDrawerOpen, setIsDrawerOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartProvider, CartContext };