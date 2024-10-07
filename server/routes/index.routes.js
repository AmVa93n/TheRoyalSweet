const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");

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

module.exports = router;
