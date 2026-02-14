import { Order } from "@/models/Order.model";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-01-28.clover"
});

export async function POST(req: Request) {
  const { name, email, shipping, pickup, items } = await req.json() as Order;
  const { address, city, zip } = shipping || {};
  const deliveryFee = pickup ? 0 : 5;
  const total = items.reduce((sum: number, item) => sum + item.price * item.quantity, 0) + deliveryFee;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.floor(total * 100), // amount is in cents
      currency: 'eur',
      payment_method_types: ['card'],
      receipt_email: email,
      shipping: {
        name: name,
        address: {
          line1: address,
          city: city,
          postal_code: zip,
        },
      },
    });
    return Response.json({client_secret: paymentIntent.client_secret});
  } catch (error) {
    return Response.json({ message: `Internal Server Error: ${error}` }, { status: 500 });
  }
};