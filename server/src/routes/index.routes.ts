import express from "express";
const router = express.Router();
import Product from "../models/Product.model";
import CakeComponent from "../models/CakeComponent.model";
import { orderModel, Order } from "../models/Order.model";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-09-30.acacia"
});

router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find({ internal: false || undefined }).populate('recipe.ingredient');

    if (!products) {
      res.status(404).json({ message: "Products not found" });
      return;
    }

    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
});

router.get("/cake-components", async (req, res, next) => {
  try {
    const cakeComponents = await CakeComponent.find({ internal: false || undefined }).populate('recipe.ingredient');

    if (!cakeComponents) {
      res.status(404).json({ message: "Cake components not found" });
      return;
    }

    res.status(200).json({ cakeComponents });
  } catch (err) {
    next(err);
  }
});

router.post('/checkout', async (req, res) => {
  const { name, email, shipping, pickup, items } = req.body as Order;
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
    res.status(200).json({client_secret: paymentIntent.client_secret});
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

router.post('/orders', async (req, res) => {
  const data = req.body;
  const newOrder = await orderModel.create(data);
  res.status(201).json(newOrder);
});

export default router;