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
import OrderSummary from '../components/OrderSummery';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutPage() {
    const { language, cart, setCart } = useStore()
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    const [orderData, setOrderData] = useState<Omit<Order, '_id' | 'createdAt' | 'additionalIngredients'>>({
        name: '',
        email: '',
        phone: '',
        deliveryDate: dayjs(dayAfterTomorrow).format('YYYY-MM-DD'),
        pickup: false,
        shipping: {
            address: '',
            city: '',
            zip: '',
        },
        items: cart
    });
    const [clientSecret, setClientSecret] = useState('');
    const isFormValid = orderData.name && orderData.email && orderData.phone && (orderData.pickup || (orderData.shipping.address && orderData.shipping.city && orderData.shipping.zip));
    
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
                    <h2 className="text-lg font-semibold mb-4">
                        {language === 'en' ? 'Customer Information' : 'Informações do cliente'}
                    </h2>

                    <label className="block mb-1 text-sm">{language === 'en' ? 'Name' : 'Nome'}</label>
                    <input
                        type="text"
                        name="name"
                        value={orderData.name}
                        onChange={handleDataChange}
                        className="w-full p-2 mb-4 border border-gray-400 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!!clientSecret}
                    />
                    <label className="block mb-1 text-sm">{language === 'en' ? 'Email' : 'Email'}</label>
                    <input
                        type="email"
                        name="email"
                        value={orderData.email}
                        onChange={handleDataChange}
                        className="w-full p-2 mb-4 border border-gray-400 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!!clientSecret}
                    />
                    <label className="block mb-1 text-sm">{language === 'en' ? 'Phone' : 'Telefone'}</label>
                    <input
                        type="tel"
                        name="phone"
                        value={orderData.phone}
                        onChange={handleDataChange}
                        className="w-full p-2 mb-4 border border-gray-400 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!!clientSecret}
                    />

                    <h2 className="text-lg font-semibold mb-4">
                        {language === 'en' ? 'Delivery Details' : 'Detalhes da entrega'}
                    </h2>

                    <label className="block mb-1 text-sm">{language === 'en' ? 'Date of delivery' : 'Data de entrega'}</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={dayjs(orderData.deliveryDate)}
                            onChange={(newValue) => newValue && setOrderData((prev) => ({ ...prev, deliveryDate: newValue?.format('YYYY-MM-DD') }))}
                            format="DD/MM/YYYY"
                            slotProps={{
                                textField: {
                                className: 'w-full p-2 mb-4 border border-gray-400 rounded',
                                },
                            }}
                            disabled={!!clientSecret}
                            disablePast
                            shouldDisableDate={date => {
                                const dateString = date.format('YYYY-MM-DD')
                                const today = new Date().toISOString().split('T')[0]
                                const tomorrow = new Date();
                                tomorrow.setDate(tomorrow.getDate() + 1)
                                // Disable today and tomorrow
                                return dateString === today || dateString === tomorrow.toISOString().split('T')[0]
                            }}
                        />
                    </LocalizationProvider>

                    <div className="flex items-center my-4">
                        <input
                            type="checkbox"
                            checked={orderData.pickup}
                            onChange={() => setOrderData((prev) => ({ ...prev, pickup: !prev.pickup }))}
                            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:cursor-not-allowed"
                            disabled={!!clientSecret}
                        />
                        <label>{language === 'en' ? 'Pickup' : 'Recolha no local'}</label>
                    </div>

                    {!orderData.pickup && <>
                    <label className="block mb-1 text-sm">{language === 'en' ? 'Address' : 'Morada'}</label>
                    <input
                        type="text"
                        name="address"
                        value={orderData.shipping.address}
                        onChange={handleDataChange}
                        disabled={orderData.pickup || !!clientSecret}
                        className="w-full p-2 mb-4 border border-gray-400 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <label className="block mb-1 text-sm">{language === 'en' ? 'City' : 'Cidade'}</label>
                    <input
                        type="text"
                        name="city"
                        value={orderData.shipping.city}
                        onChange={handleDataChange}
                        disabled={orderData.pickup || !!clientSecret}
                        className="w-full p-2 mb-4 border border-gray-400 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <label className="block mb-1 text-sm">{language === 'en' ? 'Postal Code (ZIP)' : 'Código postal (CEP)'}</label>
                    <input
                        type="text"
                        name="zip"
                        value={orderData.shipping.zip}
                        onChange={handleDataChange}
                        disabled={orderData.pickup || !!clientSecret}
                        className="w-full p-2 mb-4 border border-gray-400 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    </>}

                {clientSecret ? (
                    <Elements stripe={stripePromise} options={stripeOptions}>
                        <PaymentForm onPaymentComplete={onPaymentComplete} onCancel={() => setClientSecret('')} />
                    </Elements>
                ) : (
                    <button
                        onClick={createPayment}
                        className="w-full py-2 px-4 mt-2 rounded bg-gray-900 text-white font-semibold hover:bg-gray-700 transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!isFormValid}
                    >
                        {language === 'en' ? 'Continue' : 'Continuar'}
                    </button>
                )}
                </div>

                {/* Order Summary */}
                <OrderSummary orderData={orderData} />
            </div>
        </div>
    );
};

export default CheckoutPage;