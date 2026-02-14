"use client"

import { useStore } from '../store';
import { useRouter } from 'next/navigation';
import { XIcon } from '@phosphor-icons/react';
import CartItem from './CartItem';

function Cart() {
    const { language, cart, isCartOpen, setIsCartOpen } = useStore()
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const router = useRouter()
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

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
              className="text-white hover:text-gray-300 transition cursor-pointer"
            >
              <XIcon size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-4 p-4">
            {cart.map((item) => (
            <>
              <CartItem key={item.product?._id} item={item} />
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
              onClick={() => {
                router.push("/checkout")
                setIsCartOpen(false)
              }}
              className="w-full block mx-auto text-center bg-[#593b3e] text-white font-bold py-2 px-4 rounded-full hover:bg-[#593b3e75] transition hover:cursor-pointer"
            >
              {language === 'en' ? 'Proceed to Checkout' : 'Ir para o checkout'}
            </button>
          </div>
        </div>
      </div>
      </>
    )
}

export default Cart