const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const Order = require("../models/Order.model");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find().populate('recipe.ingredient');
    
    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }

    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
});

router.get("/product/:productId", async (req, res, next) => {
  const productId = req.params.productId
  try {
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
});

router.post('/checkout', async (req, res) => {
  const { cart, orderData, deliveryFee } = req.body;
  const { name, email, address, city, zip } = orderData || null
  const total = cart.reduce((sum, item) => sum + item.product.price[item.size] * item.quantity, 0) + deliveryFee

  await Order.create({
    name, 
    email, 
    items: cart.map(item => ({...item, product: item.product._id})),
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

module.exports = router;
