"use client";

import { useState } from 'react';
import dayjs from 'dayjs';
import OrderSummary from '../components/OrderSummary';
import OrderForm from '../components/OrderForm';
import { Order } from '../types';

function CheckoutPage() {
  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
  const [orderData, setOrderData] = useState<Partial<Order>>({
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
  });

  return (
    <div className="pt-24 px-4 lg:px-24 w-full mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Card */}
        <OrderForm orderData={orderData} setOrderData={setOrderData} />

        {/* Order Summary */}
        <OrderSummary orderData={orderData} />
      </div>
    </div>
  );
};

export default CheckoutPage;