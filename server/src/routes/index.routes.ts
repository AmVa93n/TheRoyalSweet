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
    const products = await Product.find({ internal: false }).populate('recipe.ingredient');

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
  const { name, email, shipping, pickup, items } = req.body;
  const { address, city, zip } = shipping;
  const deliveryFee = pickup ? 0 : 5;
  const total = items.reduce((sum: number, item: {price: number, quantity: number}) => sum + item.price * item.quantity, 0) + deliveryFee;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total * 100, // amount is in cents
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
  res.json({client_secret: paymentIntent.client_secret});
});

router.post('/orders', async (req, res) => {
  const data = req.body;
  const newOrder = await Order.create(data);
  res.status(201).json(newOrder);
});

export default router;