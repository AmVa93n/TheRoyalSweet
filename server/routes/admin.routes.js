const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const Order = require("../models/Order.model");
const Ingredient = require("../models/Ingredient.model");

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
  
router.put("/ingredient", async (req, res, next) => {
    try {
      const newData = req.body;
      const { _id } = newData;
  
      const updatedIngredient = await Ingredient.findByIdAndUpdate(_id, newData, { new: true })
  
      if (!updatedIngredient) {
        return res.status(404).json({ message: "Ingredient not found" });
      }
  
      res.status(200).json({ ingredient: updatedIngredient });
    } catch (err) {
      next(err);  // Pass the error to the error-handling middleware
    }
});
  
router.get("/orders", async (req, res, next) => {
    try {
      const orders = await Order.find().populate({
        path: 'items.product', // Populate the 'product' in 'items'
        populate: {
          path: 'recipe.ingredient', // Populate the 'ingredient' in 'recipe'
        },
      })
      
      if (!orders) {
        return res.status(404).json({ message: "Orders not found" });
      }
  
      res.status(200).json({ orders });
    } catch (err) {
      next(err);
    }
});

module.exports = router;