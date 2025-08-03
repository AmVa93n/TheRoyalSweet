import { useState } from 'react';
import { useStore } from '../store';
import appService from '../services/app.service'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';
import PaymentForm from '../components/PaymentForm';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import type { Order } from '../types';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutPage() {
    const { language, cart, setCart, setIsCartOpen } = useStore()
    const [orderData, setOrderData] = useState<Omit<Order, '_id' | 'createdAt' | 'additionalIngredients'>>({
        name: '',
        email: '',
        deliveryDate: dayjs(new Date()).format('YYYY-MM-DD'),
        pickup: false,
        shipping: {
            address: '',
            city: '',
            zip: '',
        },
        items: cart
    });
    const deliveryFee = orderData.pickup ? 0 : 5
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const [clientSecret, setClientSecret] = useState('');
    
    function handleDataChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        if (['address', 'city', 'zip'].includes(name)) {
            setOrderData((prev) => ({
                ...prev,
                shipping: {
                    ...prev.shipping,
                    [name]: value
                }
            }));
            return;
        }
        setOrderData((prev) => ({ ...prev, [name]: value }));
    };

    async function createPayment() {
        const { client_secret } = await appService.createPayment(orderData);
        setClientSecret(client_secret);
    };

    async function onPaymentComplete() {
        await appService.createOrder(orderData);
        setCart([]);
    }

    const stripeOptions = {
        appearance: {
          theme: 'stripe', 
        },
        clientSecret: clientSecret
    } as StripeElementsOptions;

    return (
        <div className="pt-24 px-4 lg:px-24 w-full mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Form Card */}
                <div className="bg-white shadow p-4 rounded">
                    <input
                        type="text"
                        name="name"
                        value={orderData.name}
                        onChange={handleDataChange}
                        placeholder="Name"
                        className="w-full p-2 mb-4 border rounded bg-gray-50"
                        disabled={!!clientSecret}
                    />
                    <input
                        type="email"
                        name="email"
                        value={orderData.email}
                        onChange={handleDataChange}
                        placeholder="Email Address"
                        className="w-full p-2 mb-4 border rounded bg-gray-50"
                        disabled={!!clientSecret}
                    />

                    <label className="block mb-1 font-semibold">{language === 'en' ? 'Date of delivery' : 'Data de entrega'}</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                        value={dayjs(orderData.deliveryDate)}
                        onChange={(newValue) => newValue && setOrderData((prev) => ({ ...prev, deliveryDate: newValue?.format('YYYY-MM-DD') }))}
                        format="DD/MM/YYYY"
                        slotProps={{
                            textField: {
                            className: 'w-full bg-white rounded border mb-4',
                            },
                        }}
                        />
                    </LocalizationProvider>

                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            checked={orderData.pickup}
                            onChange={() => setOrderData((prev) => ({ ...prev, pickup: !prev.pickup }))}
                            className="mr-2"
                            disabled={!!clientSecret}
                        />
                        <label>Self Pickup</label>
                    </div>

                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={orderData.shipping.address}
                        onChange={handleDataChange}
                        disabled={orderData.pickup || !!clientSecret}
                        className="w-full p-2 mb-4 border rounded bg-gray-50"
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={orderData.shipping.city}
                        onChange={handleDataChange}
                        disabled={orderData.pickup || !!clientSecret}
                        className="w-full p-2 mb-4 border rounded bg-gray-50"
                    />
                    <input
                        type="text"
                        name="zip"
                        placeholder="Zip Code"
                        value={orderData.shipping.zip}
                        onChange={handleDataChange}
                        disabled={orderData.pickup || !!clientSecret}
                        className="w-full p-2 mb-4 border rounded bg-gray-50"
                    />

                {clientSecret ? (
                    <Elements stripe={stripePromise} options={stripeOptions}>
                        <PaymentForm onPaymentComplete={onPaymentComplete} />
                    </Elements>
                ) : (
                    <button
                        onClick={createPayment}
                        className="w-full py-2 px-4 mt-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                        >
                        Proceed to Payment
                    </button>
                )}
                </div>

                {/* Order Summary */}
                <div className="bg-white shadow p-4 rounded">
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
                        <div key={item.product._id} className="flex items-center mb-3">
                            <img
                                src={item.product.images[0]}
                                alt={item.product._id}
                                className="w-10 h-10 object-cover mr-3"
                            />
                            <span className="flex-grow">{item.product.name[language]} x {item.quantity}</span>
                            <span>{(item.price * item.quantity).toFixed(2).replace('.', ',')} €</span>
                        </div>
                    ))}
                    <hr className="my-4 border-gray-300" />
                    <div className="flex items-center mb-2">
                        <span className="flex-grow">{language === 'en' ? 'Items' : 'Itens'}</span>
                        <span>{totalAmount.toFixed(2).replace('.', ',')} €</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="flex-grow">{language === 'en' ? 'Delivery' : 'Entrega'}</span>
                        <span>{deliveryFee.toFixed(2).replace('.', ',')} €</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <span className="flex-grow">{language === 'en' ? 'VAT' : 'IVA'}</span>
                        <span>0,00 €</span>
                    </div>
                    <hr className="my-4 border-gray-300" />
                    <div className="flex items-center">
                        <h3 className="text-lg font-bold flex-grow">Total</h3>
                        <span className="text-lg font-bold">{(totalAmount + deliveryFee).toFixed(2).replace('.', ',')} €</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;