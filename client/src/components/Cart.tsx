import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { calculatePrice } from '../utils';
import { PlusIcon, MinusIcon, TrashIcon, XIcon } from '@phosphor-icons/react';

function Cart() {
    const { language, cart, setCart, isCartOpen, setIsCartOpen } = useStore()
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const navigate = useNavigate()
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    function removeProduct(id: string) {
        const updatedCart = cart.filter(item => item.product._id !== id)
        setCart(updatedCart)
    }
    
    function changeQuantity(id: string, newQuantity: number) {
        if (newQuantity < 1 || newQuantity > 99) return
        const updatedCart = cart.map(item => item.product._id === id ? {...item, quantity: newQuantity} : item)
        setCart(updatedCart)
    }

    return (
      <>
      {/* Overlay – appears behind the drawer */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="flex gap-2 bg-[#414141] p-5 text-white justify-between items-center">
            <span>
              <span className="text-xl">{language === 'en' ? 'Added items' : 'Itens adicionados'}</span>
              <span className='text-sm'> ({totalItems} {language === 'en' ? 'items' : 'itens'})</span>
            </span>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-white hover:text-gray-300 transition"
            >
              <XIcon size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-4 p-4">
            {cart.map((item) => (
            <>
              <div
                key={item.product._id}
                className="relative flex items-start gap-3"
              >
                {/* Image */}
                <img
                  src={item.product.images[0]}
                  alt={item.product.name[language]}
                  className="w-20 h-20 object-cover"
                />

                {/* Details */}
                <div className="flex-1 flex flex-col">
                  <span className="font-semibold">{item.product.name[language]}</span>
                  <span className='text-sm'>
                    {calculatePrice(item.product).price.toFixed(2).replace('.', ',')} €
                  </span>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 justify-between mt-2">
                    <div className="relative w-20">
                      <input
                          type="number"
                          min={1}
                          max={99}
                          value={item.quantity}
                          onChange={(e) => changeQuantity(item.product._id, Number(e.target.value))}
                          className="text-center w-full p-1 rounded bg-white border appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                      />
                      <button
                          onClick={() => changeQuantity(item.product._id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100 transition absolute right-1 top-[50%] translate-y-[-50%] cursor-pointer"
                      >
                          <PlusIcon size={18} />
                      </button>
                      <button
                          onClick={() => changeQuantity(item.product._id, Math.max(item.quantity - 1, 1))}
                          className="p-1 rounded-full hover:bg-gray-100 transition absolute left-1 top-[50%] translate-y-[-50%] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.quantity === 1}
                      >
                          <MinusIcon size={18} />
                      </button>
                    </div>
                    <span>
                      {(calculatePrice(item.product).price * item.quantity).toFixed(2).replace('.', ',')} €
                    </span>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeProduct(item.product._id)}
                  className="absolute top-0 right-0 p-1 text-gray-500 hover:text-red-600 transition cursor-pointer"
                >
                  <TrashIcon size={20} />
                </button>
              </div>

              <hr className='border-gray-300' />
            </>
            ))}
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-4 p-4">
            <hr className='border-gray-300' />

            <div className="flex justify-between text-[#593b3e]">
              <p className="text-lg font-semibold">
                {language === 'en' ? 'Estimated total' : 'Total estimado'}
              </p>
              <p className="text-lg font-semibold">
                {totalPrice.toFixed(2).replace('.', ',')} €
              </p>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full block mx-auto text-center bg-[#593b3e] text-white font-bold py-2 px-4 rounded-full hover:bg-[#593b3e75] transition hover:cursor-pointer"
            >
              {language === 'en' ? 'Proceed to Checkout' : 'Aceder ao checkout'}
            </button>
          </div>
        </div>
      </div>
      </>
    )
}

export default Cart