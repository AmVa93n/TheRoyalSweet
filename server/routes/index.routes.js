const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const Order = require("../models/Order.model");
const Ingredient = require("../models/Ingredient.model");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find();
    
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

router.get("/ingredients", async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find();
    
    if (!ingredients) {
      return res.status(404).json({ message: "Ingredients not found" });
    }

    res.status(200).json({ ingredients });
  } catch (err) {
    next(err);
  }
});

router.put("/product", async (req, res, next) => {
  try {
    const newData = req.body;
    const { _id } = newData;

    const updatedProduct = await Product.findByIdAndUpdate(_id, newData, { new: true })

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product: updatedProduct });
  } catch (err) {
    next(err);  // Pass the error to the error-handling middleware
  }
});

module.exports = router;
