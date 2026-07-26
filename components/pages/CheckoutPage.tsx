"use client";

import { useState } from 'react';
import dayjs from 'dayjs';
import OrderSummary from '../OrderSummary';
import OrderForm from '../OrderForm';
import { Order } from '../../types';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { CheckCircleIcon } from '@phosphor-icons/react';

function CheckoutPage() {
  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
  const [orderData, setOrderData] = useState<Partial<Order>>({
    name: '',
    email: '',
    phone: '',
    deliveryDate: dayjs(dayAfterTomorrow).format('YYYY-MM-DD'),
    pickup: true,
    shipping: {
      address: '',
      city: '',
      zip: '',
    },
  });
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const { language } = useStore();
  const router = useRouter();

  return (
    <div className="pt-24 px-4 lg:px-24 w-full mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Card */}
        <OrderForm orderData={orderData} setOrderData={setOrderData} setDisplayConfirmation={setDisplayConfirmation} />

        {/* Order Summary */}
        <OrderSummary orderData={orderData} />
      </div>

      {displayConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-2">
              <CheckCircleIcon size={32} className="mx-auto text-green-500" />
              <h2 className="text-2xl font-semibold">{language === 'en' ? 'We have received your request' : 'Recebemos o seu pedido'}</h2>
            </div>

            {language === 'en' ? 
              <div>
                <p>A confirmation email was sent to <b>{orderData.email}</b></p>
                <p>If you made a mistake while entering your email address and don't receive the email, please contact us to correct it.</p>
              </div>
                :
              <div>
                <p>Um email de confirmação foi enviado para <b>{orderData.email}</b></p>
                <p>Se cometeu algum erro ao inserir o seu endereço de email e não receber o email, por favor contacte-nos para corrigir.</p>
              </div>
            }
            
            <button
              onClick={() => {
                setDisplayConfirmation(false)
                router.push('/')
              }}
              className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 mt-8 transition duration-300 cursor-pointer"
            >
              {language === 'en' ? 'Back to Homepage' : 'Voltar para a página inicial'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;