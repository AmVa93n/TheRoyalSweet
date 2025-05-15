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

router.post("/product", async (req, res, next) => {
    try {
      const createdProduct = await Product.create({ 
        name: {en: "", pt: ""},
        intro: {en: "", pt: ""},
        description: {en: "", pt: ""},
        serve: {en: "", pt: ""},
        store: {en: "", pt: ""},
        images: [""],
        recipe: [],
        category: "",
        workHours: 0,
        electricityHours: 0,
      })
  
      if (!createdProduct) {
        return res.status(404).json({ message: "Product not created" });
      }
  
      res.status(201).json({ product: createdProduct });
    } catch (err) {
      next(err);  // Pass the error to the error-handling middleware
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

router.post("/ingredient", async (req, res, next) => {
    try {
      const createdIngredient = await Ingredient.create({
        supermarket: "",
        brand: "",
        name: "",
        recipeUnits: "",
        pricePerUnit: 0,
        price: 0,
        unitsPerPackage: 0,
        packageUnits: "",
      });
  
      if (!createdIngredient) {
        return res.status(404).json({ message: "Ingredient not created" });
      }
  
      res.status(201).json({ ingredient: createdIngredient });
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

router.post("/orders", async (req, res, next) => {
    try {
      const newOrder = {
        name: "",
        email: "",
        pickup: false,
        shipping: {
            city: "",
            address: "",
            zip: ""
        },
        items: [],
      }
  
      const createdOrder = await Order.create(newOrder);
  
      if (!createdOrder) {
        return res.status(404).json({ message: "Order not created" });
      }
  
      res.status(201).json({ order: createdOrder });
    } catch (err) {
      next(err);  // Pass the error to the error-handling middleware
    }
});

router.put("/orders", async (req, res, next) => {
    try {
      const data = req.body;
  
      const updatedOrder = await Order.findByIdAndUpdate(data._id, data, { new: true })
  
      if (!data) {
        return res.status(404).json({ message: "Order not created" });
      }
  
      res.status(201).json({ order: data });
    } catch (err) {
      next(err);  // Pass the error to the error-handling middleware
    }
});

module.exports = router;