import express from "express";
const router = express.Router();
import Product from "../models/Product.model";
import Order from "../models/Order.model";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-09-30.acacia"
});

router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find().populate('recipe.ingredient');
    
    if (!products) {
      res.status(404).json({ message: "Products not found" });
      return;
    }

    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
});

router.post('/checkout', async (req, res) => {
  const { cart, orderData, deliveryFee } = req.body;
  const { name, email, address, city, zip } = orderData || null
  const total = cart.reduce((sum: number, item: {price: number, quantity: number}) => sum + item.price * item.quantity, 0) + deliveryFee

  await Order.create({
    name, 
    email, 
    items: cart.map((item: {product: { _id: string }}) => ({...item, product: item.product._id})),
    pickup: deliveryFee === 0,
    shipping: {address, city, zip},
    total
  })

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total * 100, // amount is in cents
    currency: 'eur',
    payment_method_types: ['card'],
    shipping: {
      name: name,
      address: {
        line1: address,
        city: city,
        postal_code: zip,
      },
    },
  });
  res.json({client_secret: paymentIntent.client_secret});
});

export default router;