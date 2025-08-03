import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useStore } from '../store';

type PaymentFormProps = {
  onPaymentComplete: () => void;
  onCancel: () => void;
};

function PaymentForm({ onPaymentComplete, onCancel }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { language } = useStore();

  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const handleSubmit = async (event: React.FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'http://localhost:5173/',
      },
      redirect: 'if_required',
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      onPaymentComplete();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className='flex items-center justify-between gap-2'>
        <button 
          className='w-full py-2 px-4 mt-2 rounded bg-gray-900 text-white font-semibold hover:bg-gray-700 transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          type='submit' 
          disabled={!stripe}
        >
          {language === 'en' ? 'Place Order' : 'Fazer Pedido'}
        </button>
        <button 
          className='w-full py-2 px-4 mt-2 rounded border font-semibold hover:bg-gray-700 hover:text-white transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={onCancel}
        >
          {language === 'en' ? 'Change Details' : 'Alterar Detalhes'}
        </button>
      </div>
      
      {/* Show error message to your customers */}
      {errorMessage && 
        <div className="mt-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded text-center">
          {errorMessage}
        </div>
      }
    </form>
  )
};

export default PaymentForm;