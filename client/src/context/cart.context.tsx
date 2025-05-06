import { createContext, useState } from 'react';

const CartContext = createContext();

function CartProvider(props) {
    const [cart, setCart] = useState([])
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    function addProduct(product, size, quantity) {
        if (cart.some(item => item.product._id === product._id)) return // can't add two items with same product
        setCart(prev => [...prev, {product, size, quantity}])
    }

    function removeProduct(id) {
        setCart(prev => prev.filter(item => item.product._id !== id))
    }

    function changeQuantity(id, newQuantity) {
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
            {props.children}
        </CartContext.Provider>
    );
};

export { CartProvider, CartContext };