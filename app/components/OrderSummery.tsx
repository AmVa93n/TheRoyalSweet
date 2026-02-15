import { useStore } from '../store';
import Image from 'next/image';
import CustomCakeImage from '../assets/customcake.webp';

function OrderSummary({ orderData }: { orderData: { pickup: boolean } }) {
    const { language, cart, setIsCartOpen } = useStore()
    const deliveryFee = orderData.pickup ? 0 : 5
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div className="bg-white shadow p-4 rounded h-fit">
            <div className='flex items-center justify-between'>
                <h2 className="text-lg font-semibold">
                    {language === 'en' ? 'Order Summary' : 'Resumo do Pedido'} ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                </h2>
                <button 
                    className='py-1 px-2 rounded-sm bg-gray-200 hover:bg-gray-300 transition cursor-pointer text-sm'
                    onClick={() => setIsCartOpen(true)}
                >
                    {language === 'en' ? 'Edit cart' : 'Editar carrinho'}
                </button>

            </div>
            <hr className="my-4 border-gray-300" />
            {cart.map((item) => (
                <div key={item.product?._id || item.customCake?.label} className="flex items-center mb-3">
                    <Image
                        src={item.product?.images[0] || CustomCakeImage}
                        alt={item.product?._id || 'Custom Cake'}
                        className="w-10 h-10 object-cover mr-3"
                    />
                    <span className="flex-grow">{item.product?.name[language] || (language === 'en' ? 'Custom Cake' : 'Bolo Personalizado')} x {item.quantity}</span>
                    <span>{(item.price * item.quantity).toFixed(2).replace('.', ',')} €</span>
                </div>
            ))}
            <hr className="my-4 border-gray-300" />
            <div className="flex items-center mb-2">
                <span className="flex-grow">{language === 'en' ? 'Items' : 'Produtos'}</span>
                <span>{totalAmount.toFixed(2).replace('.', ',')} €</span>
            </div>
            <div className="flex items-center mb-2">
                <span className="flex-grow">{language === 'en' ? 'Delivery' : 'Entrega'}</span>
                <span>{deliveryFee.toFixed(2).replace('.', ',')} €</span>
            </div>
            <hr className="my-4 border-gray-300" />
            <div className="flex">
                <h3 className="text-lg font-bold flex-grow">Total</h3>
                <div className='flex flex-col items-end'>
                    <span className="text-lg font-bold">{(totalAmount + deliveryFee).toFixed(2).replace('.', ',')} €</span>
                    <span className='text-xs text-gray-500'>{language === 'en' ? 'Including 23% VAT' : 'Inclui 23% IVA'}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;